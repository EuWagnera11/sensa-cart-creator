import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  THEME_COLOR,
} from "@/config/seo";

interface BreadcrumbItem {
  name: string;
  url: string; // absolute or relative
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  /** Override canonical (defaults to SITE_URL + current pathname) */
  canonical?: string;
  /** Absolute URL preferred. Falls back to DEFAULT_OG_IMAGE */
  ogImage?: string;
  type?: "website" | "product" | "article";
  /** Add Product JSON-LD schema (for PDPs) */
  product?: {
    name: string;
    price: number;
    currency?: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    description: string;
    image?: string;
    sku?: string;
    brand?: string;
    category?: string;
    /** Only include if reviews are REAL (no fabricated values) */
    rating?: number;
    reviewCount?: number;
  };
  /** Add BreadcrumbList JSON-LD schema */
  breadcrumbs?: BreadcrumbItem[];
  /** Set to false to mark the page noindex (private pages) */
  index?: boolean;
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  type = "website",
  product,
  breadcrumbs,
  index = true,
}: SEOHeadProps) => {
  const location = useLocation();
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const desc = description || DEFAULT_DESCRIPTION;
  const img = ogImage || DEFAULT_OG_IMAGE;
  const url = canonical || `${SITE_URL}${location.pathname}`;

  // ===== JSON-LD: Product =====
  let productJsonLd: Record<string, unknown> | null = null;
  if (product) {
    const offers: Record<string, unknown> = {
      "@type": "Offer",
      url,
      priceCurrency: product.currency || "EUR",
      price: product.price.toFixed(2),
      availability: `https://schema.org/${product.availability || "InStock"}`,
      itemCondition: "https://schema.org/NewCondition",
    };

    productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.image || img,
      offers,
    };

    if (product.brand) {
      productJsonLd.brand = { "@type": "Brand", name: product.brand };
    } else {
      productJsonLd.brand = { "@type": "Brand", name: SITE_NAME };
    }
    if (product.sku) productJsonLd.sku = product.sku;
    if (product.category) productJsonLd.category = product.category;

    // Only attach rating if there are REAL reviews
    if (
      typeof product.rating === "number" &&
      typeof product.reviewCount === "number" &&
      product.reviewCount > 0
    ) {
      productJsonLd.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: product.rating.toFixed(1),
        reviewCount: product.reviewCount,
      };
    }
  }

  // ===== JSON-LD: BreadcrumbList =====
  let breadcrumbsJsonLd: Record<string, unknown> | null = null;
  if (breadcrumbs && breadcrumbs.length > 0) {
    breadcrumbsJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`,
      })),
    };
  }

  // ===== JSON-LD: WebSite (for Home page) =====
  let websiteJsonLd: Record<string, unknown> | null = null;
  if (type === "website" && location.pathname === "/") {
    websiteJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Robots */}
      {!index && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}

      {/* Theme color (browser chrome) */}
      <meta name="theme-color" content={THEME_COLOR} />

      {/* JSON-LD */}
      {productJsonLd && (
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      )}
      {breadcrumbsJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsJsonLd)}
        </script>
      )}
      {websiteJsonLd && (
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
