// Ontario PA Forms Library - Comprehensive form data
// All verified PDF links as of March 2026

// Updated automatically by GitHub Actions weekly link checker
export const LAST_VERIFIED = "2026-05-11";

export interface FormEntry {
  insurer: string;
  insurerShort: string;
  pdfUrl: string;
  accessType: "direct" | "portal";
  portalUrl?: string;
  formTitle: string;
  notes?: string;
}

export interface Drug {
  id: string;
  brandName: string;
  genericName: string;
  category: "asthma-biologic" | "ipf";
  mechanism: string;
  forms: FormEntry[];
}

export interface Insurer {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgClass: string;
  textClass: string;
}

export const insurers: Insurer[] = [
  { id: "sunlife", name: "Sun Life", shortName: "Sun Life", color: "#f5a623", bgClass: "bg-amber-50 dark:bg-amber-950/30", textClass: "text-amber-700 dark:text-amber-400" },
  { id: "bluecross", name: "Medavie Blue Cross", shortName: "Blue Cross", color: "#2563eb", bgClass: "bg-blue-50 dark:bg-blue-950/30", textClass: "text-blue-700 dark:text-blue-400" },
  { id: "greenshield", name: "Green Shield Canada", shortName: "Green Shield", color: "#16a34a", bgClass: "bg-emerald-50 dark:bg-emerald-950/30", textClass: "text-emerald-700 dark:text-emerald-400" },
  { id: "canadalife", name: "Canada Life", shortName: "Canada Life", color: "#059669", bgClass: "bg-teal-50 dark:bg-teal-950/30", textClass: "text-teal-700 dark:text-teal-400" },
  { id: "manulife", name: "Manulife", shortName: "Manulife", color: "#16a34a", bgClass: "bg-green-50 dark:bg-green-950/30", textClass: "text-green-700 dark:text-green-400" },
  { id: "desjardins", name: "Desjardins Insurance", shortName: "Desjardins", color: "#059669", bgClass: "bg-cyan-50 dark:bg-cyan-950/30", textClass: "text-cyan-700 dark:text-cyan-400" },
];

export const drugs: Drug[] = [
  // ASTHMA BIOLOGICS
  {
    id: "dupixent",
    brandName: "Dupixent",
    genericName: "dupilumab",
    category: "asthma-biologic",
    mechanism: "IL-4/IL-13 receptor antagonist",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/DUPIXENT%20(dupilumab)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Dupixent (dupilumab) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Dupixent-English.pdf",
        accessType: "direct",
        formTitle: "Dupixent Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Respiratory%20Biologics%20-%20Asthma%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for all asthma biologics",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/dupixent-m6453.pdf",
        accessType: "direct",
        formTitle: "Dupixent PA Form (M6453)",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Dupixent%20%28Dupilumab%29%20EN-5-GL5197E%20-%20MLI%20%2805_2025-DUPIX%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Dupixent (Dupilumab) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/12588E.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for asthma biologics",
      },
    ],
  },
  {
    id: "nucala",
    brandName: "Nucala",
    genericName: "mepolizumab",
    category: "asthma-biologic",
    mechanism: "Anti-IL-5 monoclonal antibody",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/NUCALA%20(mepolizumab)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Nucala (mepolizumab) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Nucala-English.pdf",
        accessType: "direct",
        formTitle: "Nucala Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Respiratory%20Biologics%20-%20Asthma%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for all asthma biologics",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/nucala-m6453.pdf",
        accessType: "direct",
        formTitle: "Nucala PA Form (M6453)",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Nucala%20%28Mepolizumab%29%20EN-3-GL5197E%20-%20MLI%20%2805_2025-NUCAL%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Nucala (Mepolizumab) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/12588E.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for asthma biologics",
      },
    ],
  },
  {
    id: "fasenra",
    brandName: "Fasenra",
    genericName: "benralizumab",
    category: "asthma-biologic",
    mechanism: "Anti-IL-5Rα monoclonal antibody",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/FASENRA%20(benralizumab)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Fasenra (benralizumab) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Fasenra-202208E.pdf",
        accessType: "direct",
        formTitle: "Fasenra Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Respiratory%20Biologics%20-%20Asthma%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for all asthma biologics",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/sea-m6453.pdf",
        accessType: "direct",
        formTitle: "Severe Eosinophilic Asthma PA Form (M6453)",
        notes: "Combined form for eosinophilic asthma biologics",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Fasenra%20%28Benralizumab%29%20EN-3-GL5197E%20-%20MLI%20%2805_2025-FASEN%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Fasenra (Benralizumab) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/12588E.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for asthma biologics",
      },
    ],
  },
  {
    id: "tezspire",
    brandName: "Tezspire",
    genericName: "tezepelumab",
    category: "asthma-biologic",
    mechanism: "Anti-TSLP monoclonal antibody",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/TEZSPIRE%20(tezepelumab)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Tezspire (tezepelumab) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/Tezspire-EN.pdf",
        accessType: "direct",
        formTitle: "Tezspire Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Respiratory%20Biologics%20-%20Asthma%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for all asthma biologics",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/tezspire-m6453.pdf",
        accessType: "direct",
        formTitle: "Tezspire PA Form (M6453)",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Tezspire%20%28Tezepelumab%29%20EN-3-GL5197E%20-%20MLI%20%2805_2025-TEZSP%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Tezspire (Tezepelumab) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/12588E.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for asthma biologics",
      },
    ],
  },
  {
    id: "xolair",
    brandName: "Xolair / Omlyclo",
    genericName: "omalizumab",
    category: "asthma-biologic",
    mechanism: "Anti-IgE monoclonal antibody",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/XOLAIR,%20OMLYCLO%20(omalizumab)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Xolair, Omlyclo (omalizumab) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Omalizumab-English.pdf",
        accessType: "direct",
        formTitle: "Omalizumab Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Omalizumab%20%28Xolair%29%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Omalizumab (Xolair) SA Form",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/omalizum-m6453.pdf",
        accessType: "direct",
        formTitle: "Omalizumab PA Form (M6453)",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Xolair%20%28Omalizumab%29%20EN-3-GL5197E%20-%20MLI%20%2805_2025-XOLAI%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Xolair (Omalizumab) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/21084E.pdf",
        accessType: "direct",
        formTitle: "Xolair (Omalizumab) PA Form",
      },
    ],
  },
  {
    id: "cinqair",
    brandName: "Cinqair",
    genericName: "reslizumab",
    category: "asthma-biologic",
    mechanism: "Anti-IL-5 monoclonal antibody",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/CINQAIR%20(reslizumab)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Cinqair (reslizumab) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Cinqair-202208E.pdf",
        accessType: "direct",
        formTitle: "Cinqair Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Respiratory%20Biologics%20-%20Asthma%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for all asthma biologics",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/sea-m6453.pdf",
        accessType: "direct",
        formTitle: "Severe Eosinophilic Asthma PA Form (M6453)",
        notes: "Combined form for eosinophilic asthma biologics",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Cinqair%20%28Reslizumab%29%20EN-3-GL5197E%20-%20MLI%20%2805_2025-CINQA%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Cinqair (Reslizumab) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/12588E.pdf",
        accessType: "direct",
        formTitle: "Respiratory Biologics - Asthma",
        notes: "Combined form for asthma biologics",
      },
    ],
  },
  // IPF / PULMONARY FIBROSIS
  {
    id: "esbriet",
    brandName: "Esbriet",
    genericName: "pirfenidone",
    category: "ipf",
    mechanism: "Antifibrotic agent",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/ESBRIET%20(pirfenidone)-CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Esbriet (pirfenidone) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Esbriet-202208E.pdf",
        accessType: "direct",
        formTitle: "Esbriet Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Pirfenidone%20%28Esbriet%29%20EN-6-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Pirfenidone (Esbriet) SA Form",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "",
        accessType: "portal",
        portalUrl: "https://www.canadalife.com/support/forms/for-you-and-your-family/if-you-have-coverage-through-your-employer/request-an-assessment-for-drug-nursing-continuous-glucose-monitoring/prior-authorization-forms.html",
        formTitle: "General PA Form",
        notes: "No drug-specific form available. Use generic PA form or contact Canada Life.",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Esbriet%20%28Pirfenidone%29%20EN-3-GL5197E%20-%20MLI%20%2810_2025-ESBRI%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Esbriet (Pirfenidone) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "",
        accessType: "portal",
        portalUrl: "https://www.desjardins.com/en/insurance/health-dental/drug-prior-authorization.html",
        formTitle: "General PA Form",
        notes: "No drug-specific Esbriet form. Use generic PA request form or call 1-844-410-6485.",
      },
    ],
  },
  {
    id: "ofev",
    brandName: "Ofev",
    genericName: "nintedanib",
    category: "ipf",
    mechanism: "Triple tyrosine kinase inhibitor",
    forms: [
      {
        insurer: "sunlife",
        insurerShort: "Sun Life",
        pdfUrl: "https://sunlifepa.express-scripts.ca/sites/default/files/paf/en/OFEV%20(nintedanib)%20-%20CTF-EN.pdf",
        accessType: "direct",
        formTitle: "Ofev (nintedanib) PA Form",
      },
      {
        insurer: "bluecross",
        insurerShort: "Blue Cross",
        pdfUrl: "https://docs.medaviebc.ca/prior-auth-forms/single-drugs/Ofev-202208E.pdf",
        accessType: "direct",
        formTitle: "Ofev Prior Authorization",
      },
      {
        insurer: "greenshield",
        insurerShort: "Green Shield",
        pdfUrl: "https://gscproviderconnect.blob.core.windows.net/forms/Nintedanib%20%28Ofev%29%20-%20Idiopathic%20Pulmonary%20Fibrosis%20%28IPF%29%20EN%20-7-2025-06c-GS.pdf",
        accessType: "direct",
        formTitle: "Nintedanib (Ofev) - IPF SA Form",
      },
      {
        insurer: "canadalife",
        insurerShort: "Canada Life",
        pdfUrl: "https://www.canadalife.com/content/dam/canadalife/documents/forms/you-and-your-family/1-0-employer/1-3-request-an-assessment/1-3-2-prior-auth-drugs/en/ipf-m6453.pdf",
        accessType: "direct",
        formTitle: "IPF PA Form (M6453)",
      },
      {
        insurer: "manulife",
        insurerShort: "Manulife",
        pdfUrl: "https://testproviderconnect.blob.core.windows.net/forms/Ofev%20%28Nintedanib%29%20EN-3-GL5197E%20-%20MLI%20%2805_2025-OFEV%29-MLI.pdf",
        accessType: "direct",
        formTitle: "Ofev (Nintedanib) PA Form",
      },
      {
        insurer: "desjardins",
        insurerShort: "Desjardins",
        pdfUrl: "https://www.desjardins.com/content/dam/pdf/en/personal/insurance/health-dental/drug-prior-authorization/12509E.pdf",
        accessType: "direct",
        formTitle: "Ofev (Nintedanib) - IPF PA Form",
      },
    ],
  },
];

export const categories = [
  { id: "all", label: "All Drugs", count: drugs.length },
  { id: "asthma-biologic", label: "Asthma Biologics", count: drugs.filter(d => d.category === "asthma-biologic").length },
  { id: "ipf", label: "IPF / Pulmonary Fibrosis", count: drugs.filter(d => d.category === "ipf").length },
];
