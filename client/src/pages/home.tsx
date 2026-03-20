import { useState, useMemo } from "react";
import { drugs, categories, insurers, LAST_VERIFIED, type Drug } from "@/lib/formData";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import {
  FileDown,
  ExternalLink,
  Search,
  Wind,
  Activity,
  ChevronDown,
  ChevronRight,
  Info,
  Sun,
  Moon,
  X,
} from "lucide-react";

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle"
      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

function InsurerBadge({ insurerShort }: { insurerShort: string }) {
  const ins = insurers.find(i => i.shortName === insurerShort);
  if (!ins) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${ins.bgClass} ${ins.textClass}`}>
      {ins.shortName}
    </span>
  );
}

function DrugSection({ drug, insurerFilter }: { drug: Drug; insurerFilter: string }) {
  const [expanded, setExpanded] = useState(true);

  const filteredForms = useMemo(() => {
    if (insurerFilter === "all") return drug.forms;
    return drug.forms.filter(f => f.insurer === insurerFilter);
  }, [drug.forms, insurerFilter]);

  const directCount = filteredForms.filter(f => f.accessType === "direct" && f.pdfUrl).length;
  const totalCount = filteredForms.length;

  return (
    <div className="mb-2" data-testid={`drug-card-${drug.id}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/60 transition-all text-left group"
        data-testid={`drug-toggle-${drug.id}`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-[15px] text-foreground">{drug.brandName}</span>
            <span className="text-sm text-muted-foreground">({drug.genericName})</span>
          </div>
          <p className="text-xs text-muted-foreground/70 mt-0.5">{drug.mechanism}</p>
        </div>
        <span className="text-xs font-medium text-muted-foreground tabular-nums bg-accent/80 px-2 py-0.5 rounded-full">
          {directCount}/{totalCount}
        </span>
      </button>

      {expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pl-8 pr-4 pb-3 pt-1">
          {filteredForms.map((form, idx) => (
            <a
              key={`${form.insurer}-${idx}`}
              href={form.accessType === "direct" && form.pdfUrl ? form.pdfUrl : (form.portalUrl || form.pdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-border/50 bg-card hover:bg-accent/40 hover:border-border transition-all p-3.5 group/card"
              data-testid={`form-card-${drug.id}-${form.insurer}`}
            >
              <div className="flex items-start justify-between mb-2.5">
                <InsurerBadge insurerShort={form.insurerShort} />
                {form.notes && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help" onClick={e => e.preventDefault()}>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/50" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[240px]">
                      <p className="text-xs">{form.notes}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{form.formTitle}</p>
              {form.accessType === "direct" && form.pdfUrl ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover/card:text-primary/80 transition-colors">
                  <FileDown className="w-3.5 h-3.5" />
                  Download PDF
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover/card:text-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Access via Portal
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [insurerFilter, setInsurerFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resetAll = () => {
    setCategoryFilter("all");
    setInsurerFilter("all");
    setSearchQuery("");
  };

  const filteredDrugs = useMemo(() => {
    let result = drugs;
    if (categoryFilter !== "all") {
      result = result.filter(d => d.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        d =>
          d.brandName.toLowerCase().includes(q) ||
          d.genericName.toLowerCase().includes(q) ||
          d.mechanism.toLowerCase().includes(q)
      );
    }
    return result;
  }, [categoryFilter, searchQuery]);

  const totalForms = drugs.reduce((sum, d) => sum + d.forms.length, 0);
  const directForms = drugs.reduce(
    (sum, d) => sum + d.forms.filter(f => f.accessType === "direct" && f.pdfUrl).length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={resetAll}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
              data-testid="home-button"
              aria-label="Home - reset all filters"
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="PA Forms Logo">
                <rect x="2" y="4" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 12h16M8 17h12M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="24" cy="20" r="5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M22.5 20l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="text-sm font-semibold leading-tight tracking-tight">Ontario PA Forms</div>
                <div className="text-[10px] text-white/50 leading-tight">Prior Authorization Library</div>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/40 font-medium">
                <span>{drugs.length} drugs</span>
                <span className="text-white/20">|</span>
                <span>{directForms}/{totalForms} forms</span>
                <span className="text-white/20">|</span>
                <span>{insurers.length} insurers</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        {/* Filter bar */}
        <div className="rounded-xl border border-border bg-card p-3 mb-5">
          {/* Search + category row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="search"
                placeholder="Search by drug or generic name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors placeholder:text-muted-foreground/40"
                data-testid="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    categoryFilter === cat.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                  data-testid={`cat-filter-${cat.id}`}
                >
                  {cat.label}
                  <span className="ml-1 opacity-60">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Insurer row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-muted-foreground/60 font-medium uppercase tracking-wider mr-1">Insurer</span>
            <button
              onClick={() => setInsurerFilter("all")}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                insurerFilter === "all"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              data-testid="insurer-filter-all"
            >
              All
            </button>
            {insurers.map(ins => (
              <button
                key={ins.id}
                onClick={() => setInsurerFilter(ins.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  insurerFilter === ins.id
                    ? `${ins.bgClass} ${ins.textClass} shadow-sm`
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                data-testid={`insurer-filter-${ins.id}`}
              >
                {ins.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Drug sections */}
        {(categoryFilter === "all" || categoryFilter === "asthma-biologic") && filteredDrugs.some(d => d.category === "asthma-biologic") ? (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2 px-2">
              <Wind className="w-4 h-4 text-primary/70" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                Asthma Biologics
              </h2>
              <span className="text-[10px] font-semibold text-muted-foreground/40 bg-accent rounded-full px-2 py-0.5">
                {filteredDrugs.filter(d => d.category === "asthma-biologic").length}
              </span>
            </div>
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              {filteredDrugs
                .filter(d => d.category === "asthma-biologic")
                .map((drug, i, arr) => (
                  <div key={drug.id}>
                    <DrugSection drug={drug} insurerFilter={insurerFilter} />
                    {i < arr.length - 1 && <div className="border-t border-border/40 mx-4" />}
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {(categoryFilter === "all" || categoryFilter === "ipf") && filteredDrugs.some(d => d.category === "ipf") ? (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-2 px-2">
              <Activity className="w-4 h-4 text-primary/70" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                IPF / Pulmonary Fibrosis
              </h2>
              <span className="text-[10px] font-semibold text-muted-foreground/40 bg-accent rounded-full px-2 py-0.5">
                {filteredDrugs.filter(d => d.category === "ipf").length}
              </span>
            </div>
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              {filteredDrugs
                .filter(d => d.category === "ipf")
                .map((drug, i, arr) => (
                  <div key={drug.id}>
                    <DrugSection drug={drug} insurerFilter={insurerFilter} />
                    {i < arr.length - 1 && <div className="border-t border-border/40 mx-4" />}
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        {filteredDrugs.length === 0 && (
          <div className="text-center py-20 rounded-xl border border-dashed border-border">
            <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No drugs match your search.</p>
            <button
              onClick={resetAll}
              className="text-xs text-primary hover:text-primary/80 mt-2 font-medium"
              data-testid="clear-filters"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 pt-5 border-t border-border/60">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                Links verified {new Date(LAST_VERIFIED + "T00:00:00").toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground/40">Checked weekly</span>
          </div>
          <div className="text-[11px] text-muted-foreground/50 space-y-1 mb-4">
            <p>Ontario-specific prior authorization forms for reimbursement specialists.</p>
            <p>Forms sourced directly from insurer portals. Links may change when insurers update annually.</p>
          </div>
          <PerplexityAttribution />
        </footer>
      </main>
    </div>
  );
}
