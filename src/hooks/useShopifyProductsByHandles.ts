import { useEffect, useState } from "react";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";

const CHUNK_SIZE = 30;

function buildHandleQuery(handles: string[]): string {
  return handles.map((h) => `handle:${h}`).join(" OR ");
}

/**
 * Fetch Shopify products by an explicit list of handles. Splits into chunks
 * (~30 per query) to stay under Storefront query-length limits, then
 * preserves the original handle order in the returned array.
 */
export function useShopifyProductsByHandles(handles: string[]) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stable key so we don't re-fetch on every render (handles is a slice).
  const key = handles.join("|");

  useEffect(() => {
    if (handles.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    const chunks: string[][] = [];
    for (let i = 0; i < handles.length; i += CHUNK_SIZE) {
      chunks.push(handles.slice(i, i + CHUNK_SIZE));
    }

    Promise.all(
      chunks.map((c) =>
        storefrontApiRequest(PRODUCTS_QUERY, {
          first: c.length,
          query: buildHandleQuery(c),
        })
      )
    )
      .then((results) => {
        if (cancelled) return;
        const byHandle = new Map<string, ShopifyProduct>();
        for (const r of results) {
          const edges = (r?.data?.products?.edges ?? []) as ShopifyProduct[];
          for (const e of edges) byHandle.set(e.node.handle, e);
        }
        // Preserve original input order.
        const ordered = handles
          .map((h) => byHandle.get(h))
          .filter((p): p is ShopifyProduct => !!p);
        setProducts(ordered);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { products, loading, error };
}
