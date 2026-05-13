import { useEffect, useRef, useState, useCallback } from "react";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { filterToValidHandles } from "@/lib/productGroups";

/**
 * Cursor-paginated fetch of all Shopify products. Used by catch-all
 * sections (e.g. "Oops" / sale) that should surface the entire catalog.
 */
export function useAllShopifyProducts(pageSize = 24) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cursorRef = useRef<string | null>(null);

  const fetchPage = useCallback(
    async (after: string | null) => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, {
        first: pageSize,
        after,
        query: null,
      });
      const edges = filterToValidHandles(
        (data?.data?.products?.edges ?? []) as ShopifyProduct[]
      );
      const pageInfo = data?.data?.products?.pageInfo ?? { hasNextPage: false, endCursor: null };
      cursorRef.current = pageInfo.endCursor;
      setHasMore(!!pageInfo.hasNextPage);
      return edges;
    },
    [pageSize]
  );

  // Initial load
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    cursorRef.current = null;
    fetchPage(null)
      .then((edges) => {
        if (!cancelled) setProducts(edges);
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
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const edges = await fetchPage(cursorRef.current);
      setProducts((prev) => [...prev, ...edges]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoadingMore(false);
    }
  }, [fetchPage, hasMore, loadingMore]);

  return { products, loading, loadingMore, hasMore, error, loadMore };
}
