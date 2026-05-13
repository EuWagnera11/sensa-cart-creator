import { useMemo } from "react";
import featuredPools from "@/data/featured_pools.json";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";

interface FeaturedPools {
  version: number;
  fresh_off_the_shelf: { count: number; handles: string[]; description: string };
  the_goods: { count: number; handles: string[]; description: string };
}

const pools = featuredPools as unknown as FeaturedPools;

export type FeaturedPool = "fresh" | "goods";

/**
 * Fisher-Yates shuffle. Returns a new array, doesn't mutate input.
 */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Pulls `count` random handles from the requested curated pool and fetches
 * the corresponding products from Shopify. Rotates on each component mount —
 * so each F5 / route change shows a fresh combination.
 *
 * @param pool "fresh" (premium new arrivals) or "goods" (best sellers)
 * @param count how many to render (default 8)
 */
export function useFeaturedProducts(pool: FeaturedPool, count = 8) {
  const sourceHandles = pool === "fresh"
    ? pools.fresh_off_the_shelf.handles
    : pools.the_goods.handles;

  // Shuffle once per mount — useMemo with [] dep ensures rotation per F5,
  // but stable within a single render lifecycle
  const selectedHandles = useMemo(
    () => shuffle(sourceHandles).slice(0, count),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pool, count]
  );

  const { products, loading } = useShopifyProductsByHandles(selectedHandles);

  return { products, loading, handles: selectedHandles };
}

export const POOL_INFO = {
  fresh: pools.fresh_off_the_shelf,
  goods: pools.the_goods,
};
