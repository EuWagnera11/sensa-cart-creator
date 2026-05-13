import { X } from "lucide-react";
import type { FilterState } from "@/hooks/useFiltersAndSort";

const CATEGORY_LABELS: Record<string, string> = {
  buzz: "Buzz",
  duo: "Duo",
  newbie: "Newbie",
  slippery: "Slippery",
  tied: "Tied",
};

interface Props {
  state: FilterState;
  toggleVendor: (v: string) => void;
  toggleCategory: (c: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  clearAll: () => void;
  forcedCategory?: string;
}

const ActiveFiltersChips = ({
  state,
  toggleVendor,
  toggleCategory,
  setPriceRange,
  clearAll,
  forcedCategory,
}: Props) => {
  const chips: Array<{ label: string; onRemove: () => void }> = [];

  for (const v of state.vendors) {
    chips.push({ label: v, onRemove: () => toggleVendor(v) });
  }

  if (!forcedCategory) {
    for (const c of state.categories) {
      chips.push({
        label: CATEGORY_LABELS[c] || c,
        onRemove: () => toggleCategory(c),
      });
    }
  }

  if (state.priceMin !== null || state.priceMax !== null) {
    const min = state.priceMin ?? 0;
    const max = state.priceMax;
    const label = max ? `€${min} - €${max}` : `€${min}+`;
    chips.push({ label, onRemove: () => setPriceRange(null, null) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip, i) => (
        <button
          key={i}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1 border-[2px] border-dark bg-accent rounded-sm font-display italic font-black text-xs text-foreground hover:bg-primary hover:text-cream transition-colors"
        >
          {chip.label}
          <X size={12} />
        </button>
      ))}
      {chips.length > 1 && (
        <button
          type="button"
          onClick={clearAll}
          className="font-serif italic text-xs text-muted-foreground hover:text-primary transition-colors underline decoration-dotted ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default ActiveFiltersChips;
