import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
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
    <aside className="w-full lg:w-[280px] shrink-0">
      {/* Sticky on desktop */}
      <div className="lg:sticky lg:top-[80px] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b-[3px] border-dark pb-3">
          <h2 className="font-display font-black italic text-foreground text-lg">
            Filters
            {activeCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-1.5 bg-primary text-cream rounded-full text-xs font-display italic font-black">
                {activeCount}
              </span>
            )}
          </h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="font-serif italic text-xs text-muted-foreground hover:text-primary transition-colors underline decoration-dotted"
            >
              Clear all
            </button>
          )}
        </div>

        <p className="font-serif italic text-xs text-muted-foreground">
          {resultCount.toLocaleString()} product{resultCount === 1 ? "" : "s"} match
        </p>

        {/* Category (hidden if forced) */}
        {!forcedCategory && (
          <FilterSection title="Category" defaultOpen>
            <div className="space-y-1.5">
              {ALL_CATEGORIES.map((cat) => {
                const meta = CATEGORY_LABELS[cat];
                if (!meta) return null;
                const checked = state.categories.includes(cat);
                return (
                  <CheckboxRow
                    key={cat}
                    checked={checked}
                    onChange={() => toggleCategory(cat)}
                    label={meta.name}
                    sublabel={meta.subtitle}
                  />
                );
              })}
            </div>
          </FilterSection>
        )}

        {/* Price */}
        <FilterSection title="Price" defaultOpen>
          <div className="space-y-1.5">
            {PRICE_BUCKETS.map((b) => {
              const active = state.priceMin === b.min && state.priceMax === b.max;
              return (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => setPriceRange(active ? null : b.min, active ? null : b.max)}
                  className={`block w-full text-left px-3 py-2 border-[2px] rounded-sm font-serif italic text-sm transition-all ${
                    active
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-dark/15 hover:border-dark/40 text-foreground"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Vendor */}
        <VendorSection state={state} toggleVendor={toggleVendor} />
      </div>
    </aside>
  );
};

// ===== Sub-components =====

const FilterSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b-[2px] border-dark/15 pb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-3 font-display italic font-black text-foreground text-sm uppercase tracking-wider"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
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
  <label className="flex items-center gap-2.5 cursor-pointer group py-1">
    <span
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`shrink-0 w-5 h-5 border-[2px] border-dark rounded-sm transition-colors flex items-center justify-center ${
        checked ? "bg-primary" : "bg-cream"
      }`}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="hsl(var(--cream))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span className="flex-1 font-serif italic text-sm text-foreground group-hover:text-primary transition-colors">
      {label}
      {sublabel && <span className="text-muted-foreground font-normal not-italic"> · {sublabel}</span>}
    </span>
    {count !== undefined && (
      <span className="font-serif text-xs text-muted-foreground">{count}</span>
    )}
  </label>
);

const VendorSection = ({
  state,
  toggleVendor,
}: {
  state: FilterState;
  toggleVendor: (v: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const TOP_N = 20;
  const displayCount = showAll ? VENDOR_COUNTS.length : TOP_N;
  let displayed = VENDOR_COUNTS.slice(0, displayCount);

  if (search.trim()) {
    const s = search.toLowerCase();
    displayed = VENDOR_COUNTS.filter(([v]) => v.toLowerCase().includes(s)).slice(0, 50);
  }

  return (
    <FilterSection title="Brand" defaultOpen>
      <div className="relative mb-3">
        <Search
          size={14}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands…"
          className="w-full pl-8 pr-3 py-2 border-[2px] border-dark/15 rounded-sm font-serif italic text-xs bg-cream focus:border-dark focus:outline-none"
        />
      </div>

      <div className="space-y-0.5 max-h-[320px] overflow-y-auto pr-1">
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
          <p className="font-serif italic text-xs text-muted-foreground py-2">
            No brands match "{search}"
          </p>
        )}
      </div>

      {!search && VENDOR_COUNTS.length > TOP_N && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 font-serif italic text-xs text-primary hover:underline"
        >
          {showAll
            ? `Show only top ${TOP_N}`
            : `Show all ${VENDOR_COUNTS.length} brands →`}
        </button>
      )}
    </FilterSection>
  );
};

export default FilterSidebar;
