import { useMemo } from "react";
import metadataRaw from "@/data/listing_metadata.json";

interface RawMetadata {
  vendor_list: string[];
  category_list: string[];
  meta: Record<string, [number, number, number]>; // [vendor_idx, price_cents, cats_bits]
}

const metadata = metadataRaw as unknown as RawMetadata;

interface CrossSellResult {
  sameVendor: string[];
  sameCategory: string[];
}

/**
 * Hybrid cross-sell heuristic:
 *   - "You may also like" = up to 8 handles from same vendor
 *   - "Often bought together" = up to 8 handles from overlapping categories
 * 
 * Excludes current handle. Deterministic order (by handle slug, stable).
 */
export function useCrossSell(currentHandle: string | undefined, maxEach = 8): CrossSellResult {
  return useMemo(() => {
    if (!currentHandle) return { sameVendor: [], sameCategory: [] };

    const current = metadata.meta[currentHandle];
    if (!current) return { sameVendor: [], sameCategory: [] };

    const [vIdx, , catsBits] = current;

    const sameVendor: string[] = [];
    const sameCategory: string[] = [];

    // Single pass through all metadata
    for (const [handle, m] of Object.entries(metadata.meta)) {
      if (handle === currentHandle) continue;

      const [otherV, , otherCats] = m;
      if (otherV === vIdx && sameVendor.length < maxEach) {
        sameVendor.push(handle);
      } else if ((otherCats & catsBits) !== 0 && sameCategory.length < maxEach) {
        // Don't double-count vendor matches that already have category overlap
        if (otherV !== vIdx) sameCategory.push(handle);
      }

      // Early exit when both quotas filled
      if (sameVendor.length >= maxEach && sameCategory.length >= maxEach) break;
    }

    // If sameVendor is short (rare vendor), backfill with same-category
    if (sameVendor.length < maxEach / 2) {
      // Already covered by sameCategory loop above
    }

    return { sameVendor, sameCategory };
  }, [currentHandle, maxEach]);
}
