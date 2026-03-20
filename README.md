# Ontario PA Forms Library

A searchable repository of Ontario-specific prior authorization (PA) forms for insurance companies, covering asthma biologics and IPF medications.

## Drugs Covered

**Asthma Biologics (6):**
- Dupixent (dupilumab)
- Nucala (mepolizumab)
- Fasenra (benralizumab)
- Tezspire (tezepelumab)
- Xolair / Omlyclo (omalizumab)
- Cinqair (reslizumab)

**IPF / Pulmonary Fibrosis (2):**
- Esbriet (pirfenidone)
- Ofev (nintedanib)

## Insurers

Sun Life, Medavie Blue Cross, Green Shield Canada, Canada Life, Manulife, Desjardins

## Features

- Filter by drug category (Asthma Biologics / IPF)
- Filter by insurer
- Search by drug or generic name
- Direct PDF download links (46/48 forms)
- Dark mode support
- Mobile-responsive

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npx vite build
```

Output goes to `dist/public/`.

## Deploy

Configured for Netlify — connect the repo and it auto-deploys.
