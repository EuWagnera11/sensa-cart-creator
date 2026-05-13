import { useMemo } from "react";
import { getPreviousRoute } from "./useNavigationTracker";
import metadataRaw from "@/data/listing_metadata.json";

interface RawMetadata {
  category_list: string[];
  meta: Record<string, [number, number, number]>;
}
const metadata = metadataRaw as unknown as RawMetadata;

const CATEGORY_LABELS: Record<string, string> = {
  buzz: "Buzz",
  duo: "Duo",
  newbie: "Newbie",
  slippery: "Slippery",
  tied: "Tied",
};

export interface Crumb {
  label: string;
  href?: string; // undefined = current page (no link)
}

/**
 * Get the category names a product belongs to (decoded from cats_bits in metadata).
 */
function getProductCategories(handle: string): string[] {
  const m = metadata.meta[handle];
  if (!m) return [];
  const [, , catsBits] = m;
  const out: string[] = [];
  metadata.category_list.forEach((cat, i) => {
    if ((catsBits & (1 << i)) !== 0) out.push(cat);
  });
  return out;
}

/**
 * Detect referrer category from previous route. Handles:
 *   - /category/slippery → "slippery"
 *   - /category/slippery?vendor=LELO → "slippery" (keep query for back-link)
 *   - /shop?cat=buzz → "buzz"
 *   - /search?q=lube → null (search has its own breadcrumb)
 *   - other → null
 */
function detectReferrerContext(prevRoute: string | null): {
  category?: string;
  href?: string;
  fromShop?: boolean;
  fromSearch?: boolean;
  searchHref?: string;
} {
  if (!prevRoute) return {};

  // /category/:slug
  const catMatch = prevRoute.match(/^\/category\/([^/?]+)/);
  if (catMatch) {
    const slug = catMatch[1];
    if (CATEGORY_LABELS[slug]) {
      return { category: slug, href: prevRoute };
    }
  }

  // /shop?cat=X
  if (prevRoute.startsWith("/shop")) {
    const url = new URL(prevRoute, "https://x.example");
    const cat = url.searchParams.get("cat");
    if (cat) {
      const firstCat = cat.split(",")[0];
      if (CATEGORY_LABELS[firstCat]) {
        return { category: firstCat, href: prevRoute };
      }
    }
    return { fromShop: true };
  }

  // /search?q=...
  if (prevRoute.startsWith("/search")) {
    return { fromSearch: true, searchHref: prevRoute };
  }

  return {};
}

/**
 * Returns dynamic breadcrumbs for a product page:
 *
 *   Came from /category/slippery → Home › Slippery › <product>
 *   Came from /search?q=...      → Home › Search › <product>
 *   Came from /shop?cat=buzz     → Home › Buzz › <product>
 *   Came from /shop (no filter)  → Home › Shop › <product>
 *   Direct link (no referrer)    → Home › <ProductCat> › <product>
 *                                  (or fallback Home › Shop › <product>)
 */
export function useProductBreadcrumbs(
  handle: string | undefined,
  productTitle: string
): Crumb[] {
  return useMemo(() => {
    const crumbs: Crumb[] = [{ label: "Home", href: "/" }];

    if (!handle) {
      crumbs.push({ label: productTitle });
      return crumbs;
    }

    const prev = getPreviousRoute();
    const ctx = detectReferrerContext(prev);

    if (ctx.category) {
      crumbs.push({
        label: CATEGORY_LABELS[ctx.category],
        href: ctx.href || `/category/${ctx.category}`,
      });
    } else if (ctx.fromSearch) {
      crumbs.push({ label: "Search", href: ctx.searchHref });
    } else if (ctx.fromShop) {
      crumbs.push({ label: "Shop", href: prev || "/shop" });
    } else {
      // Direct landing — derive primary category from metadata
      const productCats = getProductCategories(handle);
      if (productCats.length > 0 && CATEGORY_LABELS[productCats[0]]) {
        const primary = productCats[0];
        crumbs.push({
          label: CATEGORY_LABELS[primary],
          href: `/category/${primary}`,
        });
      } else {
        crumbs.push({ label: "Shop", href: "/shop" });
      }
    }

    crumbs.push({ label: productTitle });
    return crumbs;
  }, [handle, productTitle]);
}
