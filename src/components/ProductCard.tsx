import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
  onAdd: (p: ShopifyProduct) => void;
}

/**
 * Editorial product card — restrained brutalism.
 * - Single CTA (Add to bag), click on image/title goes to PDP
 * - Image dominates with 4:5 aspect ratio
 * - Title in serif (not display-italic-black) for legibility
 * - Price discreet, no garish colors
 * - Brutalist shadow only on hover (less visual noise in grid)
 */
const ProductCard = ({ product, onAdd }: Props) => {
  const node = product.node;
  const img = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const variant = node.variants.edges[0]?.node;
  const available = variant?.availableForSale ?? false;
  const currencySymbol = price.currencyCode === "EUR" ? "€" : `${price.currencyCode} `;

  return (
    <div className="group relative bg-cream border-[2px] border-dark/15 rounded-sm overflow-hidden transition-all duration-200 hover:border-dark hover:translate-y-[-2px] hover:shadow-[5px_5px_0_hsl(var(--dark))]">
      <Link
        to={`/shop/product/${node.handle}`}
        className="block no-underline"
        aria-label={node.title}
      >
        {/* Image — 4:5 aspect, dominant */}
        <div className="relative bg-parch overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
          {img ? (
            <img
              src={img.url}
              alt={img.altText || node.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl text-muted-foreground">
              🛍️
            </div>
          )}
          {!available && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-dark text-cream text-[10px] font-display italic font-black uppercase tracking-wider rounded-sm">
              Sold out
            </div>
          )}
        </div>

        {/* Text block — clean serif, restrained */}
        <div className="px-4 pt-4 pb-2">
          <h3 className="font-serif text-sm text-foreground leading-snug line-clamp-2 min-h-[2.6em] group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          <p className="mt-2 font-display font-black text-base text-foreground tabular-nums">
            {currencySymbol}{parseFloat(price.amount).toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Single CTA */}
      <div className="px-4 pb-4">
        <button
          type="button"
          disabled={!available}
          onClick={() => onAdd(product)}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border-[2px] border-dark bg-cream hover:bg-dark hover:text-cream font-display italic font-black text-[11px] uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-cream disabled:hover:text-dark rounded-sm"
        >
          <ShoppingBag size={12} />
          {available ? "Add to bag" : "Sold out"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
