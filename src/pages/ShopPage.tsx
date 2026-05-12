import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useShopifyCart } from "@/stores/shopifyCart";

const PAGE_SIZE = 24;

const ShopPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const addItem = useShopifyCart((s) => s.addItem);
  const setCartOpen = useShopifyCart((s) => s.setIsOpen);

  const load = async (after: string | null) => {
    const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: PAGE_SIZE, after });
    if (!data) return;
    const edges: ShopifyProduct[] = data?.data?.products?.edges || [];
    const pageInfo = data?.data?.products?.pageInfo || { hasNextPage: false, endCursor: null };
    setProducts((prev) => (after ? [...prev, ...edges] : edges));
    setCursor(pageInfo.endCursor);
    setHasNext(pageInfo.hasNextPage);
  };

  useEffect(() => {
    setLoading(true);
    load(null).finally(() => setLoading(false));
  }, []);

  const loadMore = async () => {
    if (!hasNext || loadingMore) return;
    setLoadingMore(true);
    await load(cursor);
    setLoadingMore(false);
  };

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
          <p className="font-serif italic text-cream/60 max-w-xl">Real products. Real checkout. Discreet box always.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-parch paper-bg px-6 lg:px-12 py-10 pb-16">
        <div className="max-w-[1440px] mx-auto">
          {loading ? (
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
                            <img src={img.url} alt={img.altText || p.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

              {hasNext && (
                <div className="flex justify-center mt-12">
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="cta-primary inline-flex items-center gap-2 disabled:opacity-60"
                  >
                    {loadingMore && <Loader2 className="h-4 w-4 animate-spin" />} Load more
                  </button>
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
