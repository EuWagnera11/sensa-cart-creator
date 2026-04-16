import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "product";
  product?: {
    name: string;
    price: number;
    currency?: string;
    availability?: "InStock" | "OutOfStock";
    description: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    category?: string;
  };
}

const SITE_NAME = "OoohMy";
const DEFAULT_DESC = "Pleasure, Unfiltered. Vibrators, lubes, bondage & more — discreet shipping, zero judgement.";
const DEFAULT_OG = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c107a657-ef57-483a-b161-bedd877d3434/id-preview-040d3d70--d0a0efc0-2f4e-4ecb-8188-ee4a031e582f.lovable.app-1775752538394.png";

const SEOHead = ({ title, description, canonical, ogImage, type = "website", product }: SEOHeadProps) => {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Pleasure, Unfiltered`;
  const desc = description || DEFAULT_DESC;
  const img = ogImage || DEFAULT_OG;

  const jsonLd: Record<string, unknown> = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image || img,
        brand: { "@type": "Brand", name: SITE_NAME },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: product.currency || "EUR",
          availability: `https://schema.org/${product.availability || "InStock"}`,
        },
        ...(product.rating && product.reviewCount
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
              },
            }
          : {}),
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: typeof window !== "undefined" ? window.location.origin : "",
        potentialAction: {
          "@type": "SearchAction",
          target: `${typeof window !== "undefined" ? window.location.origin : ""}/products?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type === "product" ? "product" : "website"} />
      <meta property="og:image" content={img} />
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEOHead;
