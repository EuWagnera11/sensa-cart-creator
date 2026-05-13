import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import metadataRaw from "@/data/listing_metadata.json";

/**
 * Compact metadata format (saves ~70% size vs verbose JSON):
 * - vendor_list: ["VENDOR_A", "VENDOR_B", ...]  (sorted)
 * - category_list: ["buzz", "duo", "newbie", "slippery", "tied"]
 * - meta[handle] = [vendor_index, price_cents, category_bitmask]
 */
interface RawMetadata {
  version: number;
  count: number;
  vendor_list: string[];
  category_list: string[];
  meta: Record<string, [number, number, number]>;
}

const metadata = metadataRaw as unknown as RawMetadata;

export const ALL_VENDORS = metadata.vendor_list;
export const ALL_CATEGORIES = metadata.category_list;

// Vendor → product count (sorted desc for "top 20" UI)
export const VENDOR_COUNTS: Array<[string, number]> = (() => {
  const counts = new Map<string, number>();
  for (const [, m] of Object.entries(metadata.meta)) {
    const v = ALL_VENDORS[m[0]];
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
})();

export type SortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export interface FilterState {
  vendors: string[];
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  sort: SortKey;
}

const DEFAULT: FilterState = {
  vendors: [],
  categories: [],
  priceMin: null,
  priceMax: null,
  sort: "recommended",
};

// Price ranges for buckets UI
export const PRICE_BUCKETS: Array<{ label: string; min: number; max: number | null }> = [
  { label: "Under €15", min: 0, max: 15 },
  { label: "€15 - €30", min: 15, max: 30 },
  { label: "€30 - €50", min: 30, max: 50 },
  { label: "€50 - €80", min: 50, max: 80 },
  { label: "€80 - €120", min: 80, max: 120 },
  { label: "€120+", min: 120, max: null },
];

interface UseFiltersAndSortOptions {
  /** Lockstep filter: if set, this category is always applied (e.g. /category/buzz) */
  forcedCategory?: string;
  /** Pool of handles to filter from (e.g. all listing handles, or category handles) */
  sourceHandles: string[];
}

/**
 * Reads filter state from URL search params, computes filtered+sorted handles.
 * URL params: ?vendor=LELO,WeVibe&cat=buzz&min=30&max=80&sort=price-asc
 */
export function useFiltersAndSort({ forcedCategory, sourceHandles }: UseFiltersAndSortOptions) {
  const [params, setParams] = useSearchParams();

  // Parse state from URL
  const state: FilterState = useMemo(() => {
    const vendors = params.get("vendor")?.split(",").filter(Boolean) || [];
    const categories = params.get("cat")?.split(",").filter(Boolean) || [];
    const minStr = params.get("min");
    const maxStr = params.get("max");
    const sort = (params.get("sort") || "recommended") as SortKey;
    return {
      vendors,
      categories: forcedCategory ? [forcedCategory] : categories,
      priceMin: minStr ? parseFloat(minStr) : null,
      priceMax: maxStr ? parseFloat(maxStr) : null,
      sort,
    };
  }, [params, forcedCategory]);

  // Setters update URL
  const setState = useCallback(
    (updates: Partial<FilterState>) => {
      const next = { ...state, ...updates };
      const newParams = new URLSearchParams(params);
      if (next.vendors.length > 0) newParams.set("vendor", next.vendors.join(","));
      else newParams.delete("vendor");
      if (next.categories.length > 0 && !forcedCategory) newParams.set("cat", next.categories.join(","));
      else newParams.delete("cat");
      if (next.priceMin !== null) newParams.set("min", String(next.priceMin));
      else newParams.delete("min");
      if (next.priceMax !== null) newParams.set("max", String(next.priceMax));
      else newParams.delete("max");
      if (next.sort !== "recommended") newParams.set("sort", next.sort);
      else newParams.delete("sort");
      setParams(newParams, { replace: true });
    },
    [state, params, setParams, forcedCategory]
  );

  // === Convenience setters ===
  const toggleVendor = (v: string) =>
    setState({ vendors: state.vendors.includes(v) ? state.vendors.filter((x) => x !== v) : [...state.vendors, v] });

  const toggleCategory = (c: string) => {
    if (forcedCategory) return; // can't change in /category/:slug
    setState({ categories: state.categories.includes(c) ? state.categories.filter((x) => x !== c) : [...state.categories, c] });
  };

  const setPriceRange = (min: number | null, max: number | null) =>
    setState({ priceMin: min, priceMax: max });

  const setSort = (s: SortKey) => setState({ sort: s });

  const clearAll = () =>
    setState({ vendors: [], categories: forcedCategory ? [forcedCategory] : [], priceMin: null, priceMax: null });

  // === Compute filtered + sorted handles ===
  const filteredHandles = useMemo(() => {
    const catSet = new Set(state.categories);
    const venSet = new Set(state.vendors);
    const minC = state.priceMin !== null ? state.priceMin * 100 : null;
    const maxC = state.priceMax !== null ? state.priceMax * 100 : null;

    // Bitmask for selected categories
    let catMask = 0;
    if (catSet.size > 0) {
      for (const c of catSet) {
        const idx = ALL_CATEGORIES.indexOf(c);
        if (idx >= 0) catMask |= 1 << idx;
      }
    }

    const filtered: Array<{ handle: string; price: number; vendor: string }> = [];
    for (const h of sourceHandles) {
      const m = metadata.meta[h];
      if (!m) continue;
      const [vIdx, priceC, catsBits] = m;
      const vendor = ALL_VENDORS[vIdx];

      if (venSet.size > 0 && !venSet.has(vendor)) continue;
      if (catMask !== 0 && (catsBits & catMask) === 0) continue;
      if (minC !== null && priceC < minC) continue;
      if (maxC !== null && priceC > maxC) continue;

      filtered.push({ handle: h, price: priceC, vendor });
    }

    // Sort
    switch (state.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.handle.localeCompare(b.handle));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.handle.localeCompare(a.handle));
        break;
      // recommended: keep original order
    }

    return filtered.map((x) => x.handle);
  }, [sourceHandles, state]);

  // Active filter count for badge
  const activeCount = useMemo(() => {
    let n = 0;
    n += state.vendors.length;
    n += forcedCategory ? 0 : state.categories.length;
    if (state.priceMin !== null || state.priceMax !== null) n += 1;
    return n;
  }, [state, forcedCategory]);

  return {
    state,
    filteredHandles,
    activeCount,
    toggleVendor,
    toggleCategory,
    setPriceRange,
    setSort,
    clearAll,
  };
}
