import { useEffect, useState } from "react";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";

export function useShopifyProducts(query: string | undefined, count = 8) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, {
          first: count,
          query: query ?? null,
        });
        if (cancelled) return;
        const edges = (data?.data?.products?.edges ?? []) as ShopifyProduct[];
        setProducts(edges);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query, count]);

  return { products, loading, error };
}
