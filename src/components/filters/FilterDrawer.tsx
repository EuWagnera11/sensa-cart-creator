import { useEffect } from "react";
import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import type { FilterState } from "@/hooks/useFiltersAndSort";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  state: FilterState;
  toggleVendor: (v: string) => void;
  toggleCategory: (c: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  clearAll: () => void;
  forcedCategory?: string;
  activeCount: number;
  resultCount: number;
}

const FilterDrawer = (props: Props) => {
  const { isOpen, onClose, resultCount } = props;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filters"
      className="fixed inset-0 z-[9998] lg:hidden"
    >
      <div className="absolute inset-0 bg-dark/75 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 w-full max-w-[360px] bg-parch paper-bg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="border-b-[4px] border-dark bg-cream px-5 py-4 flex items-center justify-between shrink-0">
          <h2 className="font-display italic font-black text-foreground text-xl">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close filters">
            <X size={22} className="text-foreground" />
          </button>
        </div>

        {/* Scrollable filters */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterSidebar {...props} />
        </div>

        {/* Sticky CTA */}
        <div className="border-t-[3px] border-dark bg-cream px-5 py-3 shrink-0">
          <button type="button" onClick={onClose} className="cta-primary w-full text-sm">
            Show {resultCount.toLocaleString()} product{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
