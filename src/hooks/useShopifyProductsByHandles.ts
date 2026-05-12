import { useEffect, useState } from "react";
import { storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";

const CHUNK_SIZE = 30;

const PRODUCT_FRAGMENT = `
  id
  title
  description
  handle
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

function buildAliasedQuery(handles: string[]): { query: string; variables: Record<string, string> } {
  const variables: Record<string, string> = {};
  const varDefs: string[] = [];
  const aliases: string[] = [];
  handles.forEach((h, i) => {
    const v = `h${i}`;
    variables[v] = h;
    varDefs.push(`$${v}: String!`);
    aliases.push(`p${i}: product(handle: $${v}) { ${PRODUCT_FRAGMENT} }`);
  });
  const query = `query GetProductsByHandles(${varDefs.join(", ")}) { ${aliases.join("\n")} }`;
  return { query, variables };
}

/**
 * Fetch Shopify products by an explicit list of handles. Uses aliased
 * `product(handle: ...)` lookups (chunked) for reliable exact matching,
 * preserving the input order in the output array.
 */
export function useShopifyProductsByHandles(handles: string[]) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      chunks.map((c) => {
        const { query, variables } = buildAliasedQuery(c);
        return storefrontApiRequest(query, variables).then((res) => ({ chunk: c, res }));
      })
    )
      .then((results) => {
        if (cancelled) return;
        const byHandle = new Map<string, ShopifyProduct>();
        for (const { chunk, res } of results) {
          const data = res?.data ?? {};
          chunk.forEach((h, i) => {
            const node = data[`p${i}`];
            if (node) byHandle.set(h, { node } as ShopifyProduct);
          });
        }
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
