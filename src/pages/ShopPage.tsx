import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { ALL_LISTING_HANDLES } from "@/lib/productGroups";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";
import { useShopifyCart } from "@/stores/shopifyCart";
import type { ShopifyProduct } from "@/lib/shopify";

const PAGE_SIZE = 24;

const ShopPage = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleHandles = useMemo(
    () => ALL_LISTING_HANDLES.slice(0, visibleCount),
    [visibleCount]
  );
  const { products, loading } = useShopifyProductsByHandles(visibleHandles);
  const hasMore = visibleCount < ALL_LISTING_HANDLES.length;
  const loadingMore = loading && products.length > 0;

  const addItem = useShopifyCart((s) => s.addItem);
  const setCartOpen = useShopifyCart((s) => s.setIsOpen);

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, ALL_LISTING_HANDLES.length));
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading]);

  const handleAdd = async (p: ShopifyProduct) => {
    const variant = p.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: p,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setCartOpen(true);
    toast.success(`${p.node.title} added to bag ✨`);
  };

  return (
    <>
      <SEOHead title="Shop · OoohMy" description="Browse the full OoohMy catalogue. Discreet shipping, zero judgement." />
      <AnnounceBanner />
      <Navbar />

      {/* Hero */}
      <section className="bg-dark border-b-[5px] border-primary relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, hsl(var(--accent) / 0.18) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 relative z-[1]">
          <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm mb-6 no-underline text-cream/70 hover:text-cream transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <p className="section-kicker text-accent mb-3">Live catalogue</p>
          <h1 className="font-display font-black italic text-cream leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Shop.
          </h1>
          <p className="font-serif italic text-cream/60 max-w-xl">
            {ALL_LISTING_HANDLES.length.toLocaleString()} products. Real checkout. Discreet box always.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-parch paper-bg px-6 lg:px-12 py-10 pb-16">
        <div className="max-w-[1440px] mx-auto">
          {loading && products.length === 0 ? (
            <div className="flex justify-center py-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🛍️</span>
              <h2 className="font-display font-black italic text-2xl text-foreground mb-2">No products found</h2>
              <p className="font-serif italic text-muted-foreground">Add products to your store to see them here.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => {
                  const img = p.node.images?.edges?.[0]?.node;
                  const price = p.node.priceRange.minVariantPrice;
                  const variant = p.node.variants.edges[0]?.node;
                  const available = variant?.availableForSale ?? false;
                  return (
                    <div
                      key={p.node.id}
                      className="bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] group flex flex-col"
                    >
                      <Link to={`/shop/product/${p.node.handle}`} className="block no-underline">
                        <div className="bg-parch border-b-[3px] border-dark h-56 flex items-center justify-center relative overflow-hidden">
                          {img ? (
                            <img src={img.url} alt={img.altText || p.node.title} loading="eager" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <span className="text-6xl">🛍️</span>
                          )}
                        </div>
                        <div className="p-4">
                          <h2 className="font-display font-black italic text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {p.node.title}
                          </h2>
                          <p className="font-serif italic text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                            {p.node.description}
                          </p>
                          <div className="font-display font-black text-xl text-primary">
                            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                          </div>
                        </div>
                      </Link>

                      <div className="px-4 pb-4 mt-auto grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          disabled={!available}
                          className="cta-primary w-full text-xs px-3 py-2.5 inline-flex items-center justify-center gap-1 disabled:opacity-50"
                          onClick={() => handleAdd(p)}
                        >
                          <ShoppingBag size={12} /> Add
                        </button>
                        <Link to={`/shop/product/${p.node.handle}`} className="cta-secondary w-full text-xs px-3 py-2.5 no-underline text-center">
                          Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {hasMore && (
                <div ref={sentinelRef} className="flex justify-center mt-12 py-8">
                  {loadingMore && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShopPage;
