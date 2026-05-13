import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  ALL_CATEGORIES,
  PRICE_BUCKETS,
  VENDOR_COUNTS,
  type FilterState,
} from "@/hooks/useFiltersAndSort";

const CATEGORY_LABELS: Record<string, { name: string; subtitle: string }> = {
  buzz: { name: "Buzz", subtitle: "Vibrators" },
  duo: { name: "Duo", subtitle: "For couples" },
  newbie: { name: "Newbie", subtitle: "Starter kits" },
  slippery: { name: "Slippery", subtitle: "Gels & lubes" },
  tied: { name: "Tied", subtitle: "Bondage" },
};

interface Props {
  state: FilterState;
  toggleVendor: (v: string) => void;
  toggleCategory: (c: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  clearAll: () => void;
  forcedCategory?: string;
  activeCount: number;
  resultCount: number;
}

const FilterSidebar = ({
  state,
  toggleVendor,
  toggleCategory,
  setPriceRange,
  clearAll,
  forcedCategory,
  activeCount,
  resultCount,
}: Props) => {
  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="lg:sticky lg:top-[80px] space-y-7">
        {/* Header — clean, hierarquia clara */}
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h2 className="font-display font-black italic text-foreground text-2xl leading-none">
              Filters
            </h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="font-serif italic text-xs text-muted-foreground hover:text-primary transition-colors underline decoration-dotted shrink-0"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
          <p className="font-serif italic text-xs text-muted-foreground">
            <span className="font-display font-black text-foreground not-italic text-sm mr-1">
              {resultCount.toLocaleString()}
            </span>
            product{resultCount === 1 ? "" : "s"}
          </p>
        </div>

        {!forcedCategory && (
          <FilterSection title="Category">
            <div className="space-y-2">
              {ALL_CATEGORIES.map((cat) => {
                const meta = CATEGORY_LABELS[cat];
                if (!meta) return null;
                return (
                  <CheckboxRow
                    key={cat}
                    checked={state.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    label={meta.name}
                    sublabel={meta.subtitle}
                  />
                );
              })}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Price">
          <div className="space-y-0.5">
            {PRICE_BUCKETS.map((b) => {
              const active = state.priceMin === b.min && state.priceMax === b.max;
              return (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => setPriceRange(active ? null : b.min, active ? null : b.max)}
                  className={`block w-full text-left px-3 py-1.5 font-serif italic text-sm transition-all border-l-[3px] ${
                    active
                      ? "border-l-primary text-primary font-bold bg-primary/5"
                      : "border-l-transparent text-foreground/70 hover:text-foreground hover:border-l-dark/40"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <VendorSection state={state} toggleVendor={toggleVendor} />
      </div>
    </aside>
  );
};

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full mb-3 group">
        <span className="font-display italic font-black text-foreground text-[11px] uppercase tracking-[0.2em]">
          {title}
        </span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
};

const CheckboxRow = ({
  checked,
  onChange,
  label,
  sublabel,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  sublabel?: string;
  count?: number;
}) => (
  <button type="button" onClick={onChange} className="flex items-center gap-2.5 w-full text-left group py-0.5">
    <span
      aria-hidden="true"
      style={{
        width: "16px",
        height: "16px",
        flexShrink: 0,
        border: "2px solid hsl(var(--dark))",
        borderRadius: "2px",
        backgroundColor: checked ? "hsl(var(--primary))" : "transparent",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="hsl(var(--cream))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span className="flex-1 font-serif italic text-sm text-foreground/85 group-hover:text-primary transition-colors leading-tight">
      {label}
      {sublabel && <span className="text-muted-foreground font-normal not-italic ml-1">· {sublabel}</span>}
    </span>
    {count !== undefined && (
      <span className="font-serif text-[11px] text-muted-foreground tabular-nums shrink-0">{count}</span>
    )}
  </button>
);

const VendorSection = ({ state, toggleVendor }: { state: FilterState; toggleVendor: (v: string) => void }) => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const TOP_N = 15;
  let displayed = showAll ? VENDOR_COUNTS : VENDOR_COUNTS.slice(0, TOP_N);
  if (search.trim()) {
    const s = search.toLowerCase();
    displayed = VENDOR_COUNTS.filter(([v]) => v.toLowerCase().includes(s)).slice(0, 50);
  }
  return (
    <FilterSection title="Brand">
      <div className="relative mb-3">
        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands…"
          className="w-full pl-7 pr-3 py-1.5 border-b-[2px] border-dark/20 bg-transparent font-serif italic text-xs text-foreground placeholder:text-muted-foreground focus:border-dark focus:outline-none transition-colors"
        />
      </div>
      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
        {displayed.map(([vendor, count]) => (
          <CheckboxRow
            key={vendor}
            checked={state.vendors.includes(vendor)}
            onChange={() => toggleVendor(vendor)}
            label={vendor}
            count={count}
          />
        ))}
        {displayed.length === 0 && (
          <p className="font-serif italic text-xs text-muted-foreground py-2">No brands match "{search}"</p>
        )}
      </div>
      {!search && VENDOR_COUNTS.length > TOP_N && (
        <button type="button" onClick={() => setShowAll((v) => !v)} className="mt-3 font-serif italic text-xs text-primary hover:underline">
          {showAll ? `Show top ${TOP_N}` : `Show all ${VENDOR_COUNTS.length} →`}
        </button>
      )}
    </FilterSection>
  );
};

export default FilterSidebar;
