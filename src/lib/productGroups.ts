// Frontend product grouping using a pre-computed map (1.322 grupos /
// 13.479 handles do Shopify). The handle→group map is bundled (small,
// needed for the listing). The full group definitions are lazy-loaded
// only on the product detail page.

import { useEffect, useMemo, useState, useCallback } from "react";
import handleToGroupData from "@/data/handle_to_group.json";
import listingHandlesData from "@/data/listing_handles.json";
import hiddenHandlesData from "@/data/hidden_handles.json";

/**
 * Handles excluded from the front-end (lingerie/clothing categories the
 * shop owner does not want to surface). Includes every variant handle of
 * affected product groups, so PDPs are blocked too.
 */
export const HIDDEN_HANDLES: Set<string> = new Set(
  (hiddenHandlesData as { handles: string[] }).handles
);

export function isHiddenHandle(handle: string): boolean {
  return HIDDEN_HANDLES.has(handle);
}

/**
 * All canonical listing handles (singles + display handle of each group),
 * with hidden handles filtered out.
 */
export const ALL_LISTING_HANDLES: string[] = (
  listingHandlesData as { handles: string[] }
).handles.filter((h) => !HIDDEN_HANDLES.has(h));

// ============= TYPES =============

export interface VariantAttributes {
  Cor?: string;
  Tamanho?: string;
  Sabor?: string;
  Embalagem?: string;
  [key: string]: string | undefined;
}

export interface ProductVariant {
  handle: string;
  title: string;
  sku: string | null;
  price: number | null;
  image: string | null;
  attributes: VariantAttributes;
}

export interface ProductGroup {
  display_title: string;
  display_handle: string;
  display_image: string;
  vendor: string;
  variation_axes: string[];
  product_count: number;
  variants: ProductVariant[];
}

const handleToGroup: Record<string, string> = (handleToGroupData as any).handle_to_group;

// ============= LISTING (sync, bundled) =============

export function getGroupId(handle: string): string {
  return handleToGroup[handle] || handle;
}

export function isDisplayHandle(handle: string): boolean {
  // The display handle for each group is stored as a value pointing back
  // to its own group_id in the map (group_id === handle for the chosen
  // representative). For non-grouped products there is no entry, so they
  // always show.
  const gid = handleToGroup[handle];
  if (!gid) return true;
  return gid === handle;
}

/**
 * Deduplicate a Shopify products list: keep singles + only the display
 * handle of each group. Use on the listing page.
 */
/**
 * Filter out products whose handle is not in the curated catalog
 * (e.g. clothing items removed from visual listings but still in
 * Shopify backend). Use BEFORE dedupeProducts on any listing pulled
 * directly from Shopify Storefront API.
 */
export function filterToValidHandles<T extends { node: { handle: string } }>(
  products: T[]
): T[] {
  return products.filter((p) => handleToGroup[p.node.handle] !== undefined);
}

export function dedupeProducts<T extends { node: { handle: string } }>(products: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const p of products) {
    const h = p.node.handle;
    const gid = getGroupId(h);
    if (seen.has(gid)) continue;
    // Prefer the canonical display handle; if not in this batch yet,
    // accept any handle from the group (we may not have the display one
    // in the fetched page).
    seen.add(gid);
    out.push(p);
  }
  return out;
}

// ============= DETAIL (lazy, full group data) =============

interface FullData {
  groups: Record<string, ProductGroup>;
}

let fullCache: FullData | null = null;
let fullPromise: Promise<FullData> | null = null;

async function loadFull(): Promise<FullData> {
  if (fullCache) return fullCache;
  if (!fullPromise) {
    fullPromise = import("@/data/product_groups_full.json").then((m) => {
      fullCache = m as unknown as FullData;
      return fullCache;
    });
  }
  return fullPromise;
}

export function findVariant(
  group: ProductGroup,
  selected: VariantAttributes
): ProductVariant | null {
  return (
    group.variants.find((v) =>
      group.variation_axes.every((axis) => v.attributes[axis] === selected[axis])
    ) || null
  );
}

export function getAxisValues(group: ProductGroup, axis: string): string[] {
  const set = new Set<string>();
  group.variants.forEach((v) => {
    const val = v.attributes[axis];
    if (val) set.add(val);
  });
  return Array.from(set);
}

export function variantExists(group: ProductGroup, attrs: VariantAttributes): boolean {
  return findVariant(group, attrs) !== null;
}

/**
 * Hook: lazy-loads the full groups file and returns the group + selector
 * state for the current product handle. `group` is null until loaded
 * (or forever if this product isn't grouped).
 */
export function useProductDetail(handle: string | undefined) {
  const [group, setGroup] = useState<ProductGroup | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!handle) return;
    const gid = handleToGroup[handle];
    if (!gid) {
      setGroup(null);
      setLoaded(true);
      return;
    }
    let alive = true;
    loadFull().then((d) => {
      if (!alive) return;
      setGroup(d.groups[gid] || null);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [handle]);

  const initial = useMemo(() => {
    if (!group || !handle) return {} as VariantAttributes;
    const current = group.variants.find((v) => v.handle === handle);
    return current?.attributes || group.variants[0]?.attributes || {};
  }, [group, handle]);

  const [selected, setSelected] = useState<VariantAttributes>(initial);

  // Sync selected state when group/handle changes
  useEffect(() => {
    setSelected(initial);
  }, [initial]);

  const setOption = useCallback((axis: string, value: string) => {
    setSelected((prev) => ({ ...prev, [axis]: value }));
  }, []);

  const activeVariant = useMemo(() => {
    if (!group) return null;
    return findVariant(group, selected);
  }, [group, selected]);

  const isAvailable = useCallback(
    (axis: string, value: string) => {
      if (!group) return true;
      return variantExists(group, { ...selected, [axis]: value });
    },
    [group, selected]
  );

  return {
    group,
    isGrouped: group !== null,
    loaded,
    selected,
    setOption,
    activeVariant,
    isAvailable,
    axes: group?.variation_axes || [],
  };
}
