import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useWishlist } from "@/hooks/useWishlist";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";
import { useShopifyCart } from "@/stores/shopifyCart";
import { useSmartBack } from "@/hooks/useSmartBack";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { items, count, remove, loading: wlLoading } = useWishlist();
  const { products, loading } = useShopifyProductsByHandles(items);
  const addItem = useShopifyCart((s) => s.addItem);
  const setCartOpen = useShopifyCart((s) => s.setIsOpen);
  const goBack = useSmartBack("/account");

  const handleMoveAllToCart = async () => {
    if (products.length === 0) return;
    toast.success(`Adding ${products.length} items to your bag…`);
    for (const p of products) {
      const variant = p.node.variants?.edges?.[0]?.node;
      if (!variant) continue;
      await addItem({
        product: p,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
    }
    setCartOpen(true);
  };

  return (
    <>
      <SEOHead title="My Wishlist" description="Your saved products at OoohMy." />
      <AnnounceBanner />
      <Navbar />

      <div className="bg-parch paper-bg min-h-[80vh] px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors mb-4 bg-transparent border-0 p-0 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* Header */}
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <div>
              <p className="font-display italic font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1 inline-flex items-center gap-1.5">
                <Heart size={11} fill="currentColor" /> Saved for later
              </p>
              <h1
                className="font-display font-black italic text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                My Wishlist
              </h1>
              {count > 0 && (
                <p className="font-serif italic text-sm text-muted-foreground mt-2">
                  <strong className="not-italic font-display font-black text-foreground tabular-nums">
                    {count}
                  </strong>{" "}
                  item{count === 1 ? "" : "s"} saved
                </p>
              )}
            </div>

            {count > 0 && (
              <button
                type="button"
                onClick={handleMoveAllToCart}
                className="cta-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <ShoppingCart size={16} /> Move all to bag
              </button>
            )}
          </div>

          {/* Body */}
          {wlLoading || (loading && count > 0) ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : count === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {products.map((p) => (
                <WishlistCard
                  key={p.node.id}
                  product={p}
                  onRemove={() => remove(p.node.handle)}
                />
              ))}

              {/* If some handles failed to fetch from Shopify */}
              {products.length < items.length &&
                items
                  .filter((h) => !products.find((p) => p.node.handle === h))
                  .map((h) => (
                    <UnavailableCard key={h} handle={h} onRemove={() => remove(h)} />
                  ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

const WishlistCard = ({ product, onRemove }: { product: any; onRemove: () => void }) => {
  const node = product.node;
  const img = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const currency = price.currencyCode === "EUR" ? "€" : `${price.currencyCode} `;
  const formatted = `${currency}${parseFloat(price.amount).toFixed(2)}`;

  return (
    <div className="bg-cream border-[2px] border-dark rounded-sm overflow-hidden relative group transition-all hover:translate-y-[-2px] hover:shadow-[4px_4px_0_hsl(var(--dark))]">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${node.title}`}
        className="absolute top-2 right-2 z-10 w-8 h-8 inline-flex items-center justify-center bg-cream/95 border-[2px] border-dark rounded-sm hover:bg-primary hover:text-cream transition-colors"
      >
        <X size={14} />
      </button>

      <Link to={`/shop/product/${node.handle}`} className="block no-underline text-inherit">
        <div className="aspect-square bg-parch overflow-hidden">
          {img ? (
            <img
              src={img.url}
              alt={img.altText || node.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
          )}
        </div>
        <div className="px-3 py-3">
          {node.vendor && (
            <p className="font-display italic font-black text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1 truncate">
              {node.vendor}
            </p>
          )}
          <p className="font-serif text-sm text-foreground line-clamp-2 leading-snug min-h-[2.5em] mb-2">
            {node.title}
          </p>
          <p className="font-display font-black text-base text-foreground tabular-nums">
            {formatted}
          </p>
        </div>
      </Link>
    </div>
  );
};

const UnavailableCard = ({ handle, onRemove }: { handle: string; onRemove: () => void }) => (
  <div className="bg-cream border-[2px] border-dark/30 rounded-sm overflow-hidden relative p-4 flex flex-col items-center justify-center text-center min-h-[260px]">
    <span className="text-4xl mb-3 opacity-50">😢</span>
    <p className="font-serif italic text-sm text-muted-foreground mb-1">
      This item is no longer available
    </p>
    <p className="font-display italic text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-3 truncate w-full">
      {handle}
    </p>
    <button
      type="button"
      onClick={onRemove}
      className="cta-secondary text-xs px-3 py-1.5"
    >
      Remove
    </button>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-20">
    <Heart size={56} className="text-muted-foreground/30 mx-auto mb-6" strokeWidth={1.5} />
    <h2 className="font-display italic font-black text-foreground text-2xl mb-2">
      Your wishlist is empty
    </h2>
    <p className="font-serif italic text-muted-foreground mb-6 max-w-md mx-auto">
      Tap the heart on any product to save it here. Your saved items follow you across devices when you sign in.
    </p>
    <Link to="/shop" className="cta-primary inline-block no-underline px-6 py-3">
      Browse the shop →
    </Link>
  </div>
);

export default WishlistPage;
