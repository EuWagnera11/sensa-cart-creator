import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import type { SortKey } from "@/hooks/useFiltersAndSort";

const OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "recommended", label: "Recommended" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "name-asc", label: "Name: A → Z" },
  { key: "name-desc", label: "Name: Z → A" },
];

interface Props {
  sort: SortKey;
  setSort: (s: SortKey) => void;
}

const SortDropdown = ({ sort, setSort }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = OPTIONS.find((o) => o.key === sort) || OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-2 px-4 py-2.5 border-[2px] border-dark rounded-sm bg-cream hover:bg-parch transition-colors font-display italic font-black text-xs uppercase tracking-wider text-foreground"
        style={{ boxShadow: "3px 3px 0 hsl(var(--dark))" }}
      >
        <ArrowUpDown size={14} />
        <span className="hidden sm:inline">Sort:</span>
        <span>{current.label}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[220px] bg-cream border-[3px] border-dark rounded-sm z-50 overflow-hidden"
          style={{ boxShadow: "6px 6px 0 hsl(var(--dark))" }}
        >
          {OPTIONS.map((opt) => {
            const active = opt.key === sort;
            return (
              <button
                key={opt.key}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setSort(opt.key);
                  setOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-left font-serif italic text-sm border-b border-dark/10 last:border-b-0 transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-parch"
                }`}
              >
                {opt.label}
                {active && <Check size={14} className="text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
