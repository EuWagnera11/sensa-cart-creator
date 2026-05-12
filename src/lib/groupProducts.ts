import type { ShopifyProduct } from "@/lib/shopify";

// Normalizes a product title so near-duplicate items (same product with
// different size / flavor / scent / color sold as separate Shopify products)
// collapse to the same key.
//
// Examples that collapse together:
//   "Lubrificante Morango 100ml"  -> "lubrificante"
//   "Lubrificante Morango 50ml"   -> "lubrificante"
//   "Lubrificante - Baunilha"     -> "lubrificante"
//   "Lubrificante (Cereja) 200ml" -> "lubrificante"
export function normalizeTitle(raw: string): string {
  let t = (raw || "").toLowerCase();

  // strip accents
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // remove anything inside parens/brackets
  t = t.replace(/\([^)]*\)/g, " ").replace(/\[[^\]]*\]/g, " ");

  // cut everything after a dash / pipe / colon (usually variant info)
  t = t.split(/[-–—|:]/)[0];

  // remove size/volume/weight/count tokens
  t = t.replace(
    /\b\d+([.,]\d+)?\s*(ml|cl|l|g|kg|oz|cm|mm|m|"|''|inch|pcs?|un|unidades?|pack|x)\b/g,
    " "
  );

  // remove standalone numbers
  t = t.replace(/\b\d+([.,]\d+)?\b/g, " ");

  // collapse whitespace + punctuation
  t = t.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  // keep only first 3 meaningful words to make the key tighter
  const words = t.split(" ").filter(Boolean).slice(0, 3);
  return words.join(" ");
}

export interface GroupedProduct {
  product: ShopifyProduct;
  variantCount: number; // total variants across grouped Shopify products
  groupSize: number; // how many separate Shopify products were merged
}

export function groupSimilarProducts(products: ShopifyProduct[]): GroupedProduct[] {
  const map = new Map<string, GroupedProduct>();

  for (const p of products) {
    const key = normalizeTitle(p.node.title) || p.node.id;
    const existing = map.get(key);
    const ownVariants = p.node.variants?.edges?.length ?? 1;

    if (!existing) {
      map.set(key, { product: p, variantCount: ownVariants, groupSize: 1 });
    } else {
      existing.variantCount += ownVariants;
      existing.groupSize += 1;
      // Prefer the representative with more images / variants for nicer cards.
      const existingImgs = existing.product.node.images?.edges?.length ?? 0;
      const candidateImgs = p.node.images?.edges?.length ?? 0;
      if (candidateImgs > existingImgs) existing.product = p;
    }
  }

  return Array.from(map.values());
}
