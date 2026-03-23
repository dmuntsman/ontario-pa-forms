/**
 * PDF Link Checker for Ontario PA Forms Library
 * Checks all PDF URLs in formData.ts and reports broken links.
 * 
 * Usage: node scripts/check-links.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Parse PDF URLs from formData.ts
function extractUrls() {
  const filePath = path.join(__dirname, '..', 'client', 'src', 'lib', 'formData.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const urls = [];
  const urlRegex = /pdfUrl:\s*"(https?:\/\/[^"]+)"/g;
  const portalRegex = /portalUrl:\s*"(https?:\/\/[^"]+)"/g;
  
  // Also extract drug/insurer context for better reporting
  const drugRegex = /brandName:\s*"([^"]+)"/g;
  const insurerRegex = /insurerShort:\s*"([^"]+)"/g;
  
  let match;
  
  // Extract all PDF URLs with their context
  const lines = content.split('\n');
  let currentDrug = '';
  let currentInsurer = '';
  
  for (const line of lines) {
    const drugMatch = line.match(/brandName:\s*"([^"]+)"/);
    if (drugMatch) currentDrug = drugMatch[1];
    
    const insurerMatch = line.match(/insurerShort:\s*"([^"]+)"/);
    if (insurerMatch) currentInsurer = insurerMatch[1];
    
    const urlMatch = line.match(/pdfUrl:\s*"(https?:\/\/[^"]+)"/);
    if (urlMatch) {
      urls.push({
        url: urlMatch[1],
        drug: currentDrug,
        insurer: currentInsurer,
        type: 'PDF'
      });
    }
    
    const portalMatch = line.match(/portalUrl:\s*"(https?:\/\/[^"]+)"/);
    if (portalMatch) {
      urls.push({
        url: portalMatch[1],
        drug: currentDrug,
        insurer: currentInsurer,
        type: 'Portal'
      });
    }
  }
  
  return urls;
}

// Browser-like User-Agent for sites that block automated requests
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

// Domains known to block automated requests (Cloudflare, WAF, etc.)
// These PDFs work fine in real browsers but return 403 from servers.
// They're excluded from broken-link detection to avoid false alerts.
const SKIP_DOMAINS = [
  'docs.medaviebc.ca',
];

// Check a single URL — tries HEAD first, retries with GET + browser UA on 403
function checkUrl(urlStr, retryWithGet = false) {
  return new Promise((resolve) => {
    const protocol = urlStr.startsWith('https') ? https : http;
    
    const options = {
      method: retryWithGet ? 'GET' : 'HEAD',
      timeout: 15000,
      headers: {
        'User-Agent': retryWithGet ? BROWSER_UA : 'Mozilla/5.0 (compatible; PAFormsLinkChecker/1.0)',
        'Accept': 'application/pdf,*/*',
      }
    };
    
    const req = protocol.request(urlStr, options, (res) => {
      // Consume response body to free socket
      res.resume();

      // Follow redirects (up to 3)
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, urlStr).href;
        checkUrl(redirectUrl, retryWithGet).then(resolve);
        return;
      }

      // If HEAD returned 403, retry with GET + browser UA
      if (res.statusCode === 403 && !retryWithGet) {
        checkUrl(urlStr, true).then(resolve);
        return;
      }
      
      resolve({
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400,
        contentType: res.headers['content-type'] || 'unknown'
      });
    });
    
    req.on('error', (err) => {
      resolve({ status: 0, ok: false, error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, ok: false, error: 'Timeout (15s)' });
    });
    
    req.end();
  });
}

// Deduplicate URLs (some insurers use the same form for multiple drugs)
function deduplicateUrls(urls) {
  const seen = new Map();
  const deduped = [];
  
  for (const entry of urls) {
    if (!seen.has(entry.url)) {
      seen.set(entry.url, []);
      deduped.push(entry);
    }
    seen.get(entry.url).push(`${entry.drug} (${entry.insurer})`);
  }
  
  // Attach all drugs using each URL
  for (const entry of deduped) {
    entry.usedBy = seen.get(entry.url);
  }
  
  return deduped;
}

async function main() {
  const allUrls = extractUrls();
  const uniqueUrls = deduplicateUrls(allUrls);
  
  console.log(`Ontario PA Forms Link Check`);
  console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`Total URLs to check: ${uniqueUrls.length} unique (${allUrls.length} total references)\n`);
  
  let okCount = 0;
  let brokenCount = 0;
  let skippedCount = 0;
  const broken = [];
  
  // Check URLs in batches of 5 to avoid overwhelming servers
  for (let i = 0; i < uniqueUrls.length; i += 5) {
    const batch = uniqueUrls.slice(i, i + 5);
    const results = await Promise.all(
      batch.map(async (entry) => {
        // Skip domains known to block automated requests
        const hostname = new URL(entry.url).hostname;
        if (SKIP_DOMAINS.includes(hostname)) {
          return { ...entry, result: { ok: true, skipped: true } };
        }
        const result = await checkUrl(entry.url);
        return { ...entry, result };
      })
    );
    
    for (const entry of results) {
      if (entry.result.skipped) {
        skippedCount++;
        console.log(`  ~ SKIP [${entry.type}] ${entry.drug} - ${entry.insurer} (bot-protected domain)`);
      } else if (entry.result.ok) {
        okCount++;
        console.log(`  ✓ OK  [${entry.type}] ${entry.drug} - ${entry.insurer}`);
      } else {
        brokenCount++;
        broken.push(entry);
        const reason = entry.result.error || `HTTP ${entry.result.status}`;
        console.log(`  ✗ BROKEN [${entry.type}] ${entry.drug} - ${entry.insurer} (${reason})`);
      }
    }
  }
  
  console.log(`\n--- Summary ---`);
  console.log(`OK: ${okCount}`);
  console.log(`Skipped (bot-protected): ${skippedCount}`);
  console.log(`BROKEN: ${brokenCount}`);
  
  if (broken.length > 0) {
    console.log(`\n--- Broken Links Detail ---`);
    for (const entry of broken) {
      const reason = entry.result.error || `HTTP ${entry.result.status}`;
      console.log(`\nDrug: ${entry.drug}`);
      console.log(`Insurer: ${entry.insurer}`);
      console.log(`Type: ${entry.type}`);
      console.log(`URL: ${entry.url}`);
      console.log(`Error: ${reason}`);
      if (entry.usedBy && entry.usedBy.length > 1) {
        console.log(`Also used by: ${entry.usedBy.join(', ')}`);
      }
    }
  }
  
  console.log(`\nCheck complete.`);
  // Always exit 0 — the CI workflow reads the report text to decide next steps
  process.exit(0);
}

main().catch(err => {
  console.error('Link check failed:', err);
  process.exit(1);
});
