import type { ShopifyProduct } from "@/lib/shopify";

// Normalizes a product title so near-duplicate items (same product with
// different size / flavor / scent / color sold as separate Shopify products)
// collapse to the same key.
export function normalizeTitle(raw: string): string {
  let t = (raw || "").toLowerCase();
  // strip accents
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // drop parens / brackets content (often holds the variant qualifier)
  t = t.replace(/\([^)]*\)/g, " ").replace(/\[[^\]]*\]/g, " ");
  // drop suffix after a separator like "Title - Strawberry 100ml"
  t = t.split(/[-–—|:]/)[0];
  // strip size/volume/quantity tokens
  t = t.replace(
    /\b\d+([.,]\d+)?\s*(ml|cl|l|g|kg|oz|cm|mm|m|"|''|inch|pcs?|un|unidades?|pack|x)\b/gi,
    " "
  );
  // strip standalone numbers (e.g. "12" in "HEX 12")
  t = t.replace(/\b\d+([.,]\d+)?\b/g, " ");
  // collapse non-alphanumerics
  t = t.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  // Keep the FULL normalized title as the signature so two products only
  // collapse together when they truly are the same product with a
  // size/flavor/color variation (and that variation lives in the parts we
  // already stripped above). Using only the first N words led to
  // unrelated products being grouped (e.g. "lelo caixa de preservativo"
  // vs "lelo caixa de massagem" both reducing to "lelo caixa de").
  return t;
}

// Derives a short label (e.g. "100ml", "Strawberry", "Red") for a sibling
// product by removing the shared base title.
function deriveVariantLabel(title: string, baseKey: string): string {
  const baseWords = new Set(baseKey.split(" ").filter(Boolean));
  const stripped = (title || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()[\]]/g, " ");
  const tokens = stripped.split(/\s+/).filter(Boolean);
  const remaining = tokens.filter((t) => !baseWords.has(t.toLowerCase()));
  const label = remaining.join(" ").replace(/^[-–—|:,\s]+/, "").trim();
  return label || title;
}

export interface VariantOption {
  product: ShopifyProduct;
  label: string;
}

export interface GroupedProduct {
  product: ShopifyProduct; // currently representative
  siblings: VariantOption[]; // all products in the group (incl. representative)
  groupSize: number;
}

export function groupSimilarProducts(products: ShopifyProduct[]): GroupedProduct[] {
  const map = new Map<
    string,
    { rep: ShopifyProduct; baseKey: string; items: ShopifyProduct[] }
  >();

  for (const p of products) {
    const key = normalizeTitle(p.node.title) || p.node.id;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { rep: p, baseKey: key, items: [p] });
    } else {
      existing.items.push(p);
      const existingImgs = existing.rep.node.images?.edges?.length ?? 0;
      const candidateImgs = p.node.images?.edges?.length ?? 0;
      if (candidateImgs > existingImgs) existing.rep = p;
    }
  }

  return Array.from(map.values()).map(({ rep, baseKey, items }) => ({
    product: rep,
    groupSize: items.length,
    siblings: items.map((it) => ({
      product: it,
      label: deriveVariantLabel(it.node.title, baseKey),
    })),
  }));
}
