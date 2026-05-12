import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify";
import { useShopifyCart } from "@/stores/shopifyCart";

interface Props {
  product: ShopifyProduct;
  variant?: "marquee" | "grid";
  sticker?: string;
}

const ShopifyProductCard = ({ product, variant = "grid", sticker }: Props) => {
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const price = firstVariant?.price ?? node.priceRange.minVariantPrice;
  const currencySymbol = price.currencyCode === "EUR" ? "€" : price.currencyCode + " ";
  const formattedPrice = `${currencySymbol}${parseFloat(price.amount).toFixed(2)}`;

  const addItem = useShopifyCart((s) => s.addItem);
  const setIsOpen = useShopifyCart((s) => s.setIsOpen);
  const isLoading = useShopifyCart((s) => s.isLoading);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || !firstVariant.availableForSale) {
      toast.error("Sold out — try another one");
      return;
    }
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions ?? [],
    });
    setIsOpen(true);
    toast.success(`${node.title} added to bag ✨`);
  };

  if (variant === "marquee") {
    return (
      <Link
        to={`/shop/product/${node.handle}`}
        className="group relative overflow-hidden flex-shrink-0 no-underline border-[3px] border-dark rounded-sm block transition-transform duration-300 hover:scale-[1.03]"
        style={{ boxShadow: "4px 4px 0 hsl(var(--dark))" }}
      >
        <div className="relative aspect-[3/4] bg-surface">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🛍️</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {sticker && (
            <div
              className="absolute top-2 right-2 bg-accent text-foreground font-display italic font-bold text-[0.48rem] sm:text-[0.55rem] px-2 py-0.5 border-2 border-dark rounded-full z-[2]"
              style={{ transform: "rotate(3deg)", boxShadow: "2px 2px 0 hsl(var(--dark))" }}
            >
              {sticker}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 z-[1] p-2.5 sm:p-3">
            <div
              className="font-display font-black italic text-white leading-tight mb-1 text-[0.7rem] sm:text-[0.82rem] line-clamp-2"
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}
            >
              {node.title}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="font-display font-black text-[0.9rem] sm:text-[1.05rem] text-accent">
                {formattedPrice}
              </div>
              <button
                type="button"
                disabled={isLoading}
                className="bg-cream text-foreground border-2 border-dark px-2 py-0.5 sm:px-2.5 sm:py-1 font-display italic text-[0.5rem] sm:text-[0.6rem] font-bold rounded-full transition-colors hover:bg-accent disabled:opacity-60"
                onClick={handleAdd}
              >
                Add 🛒
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // grid variant
  return (
    <div
      className="group relative bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] hover:z-[2]"
      style={{ boxShadow: "var(--shadow-brutal)" }}
    >
      <Link to={`/shop/product/${node.handle}`} className="block no-underline relative">
        <div className="relative h-52 overflow-hidden bg-surface">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-parch text-6xl">🛍️</div>
          )}
          {sticker && (
            <div
              className="absolute top-2.5 right-2.5 bg-accent text-foreground font-display italic font-bold text-[0.6rem] px-3 py-1 border-2 border-dark rounded-full shadow-[2px_2px_0_hsl(var(--dark))] z-10"
              style={{ transform: "rotate(3deg)" }}
            >
              {sticker}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="font-display italic text-[0.65rem] text-muted-foreground mb-0.5 tracking-wide uppercase">
          Live from Shopify
        </div>
        <Link to={`/shop/product/${node.handle}`} className="block no-underline">
          <h3 className="font-display font-black italic text-[1.05rem] text-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.6rem]">
            {node.title}
          </h3>
        </Link>

        <p className="font-serif italic text-[0.75rem] text-muted-foreground leading-relaxed mb-3 line-clamp-2 min-h-[2.2rem]">
          {node.description || "—"}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-black text-[1.35rem] text-primary leading-none">
            {formattedPrice}
          </span>
          {!firstVariant?.availableForSale && (
            <span className="font-display italic text-[0.65rem] text-muted-foreground uppercase tracking-wide">
              Sold out
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isLoading || !firstVariant?.availableForSale}
            className="cta-primary w-full text-[0.78rem] px-3 py-2 disabled:opacity-60"
            onClick={handleAdd}
          >
            Buy now
          </button>
          <Link
            to={`/shop/product/${node.handle}`}
            className="cta-secondary w-full text-[0.78rem] px-3 py-2 no-underline text-center"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopifyProductCard;
