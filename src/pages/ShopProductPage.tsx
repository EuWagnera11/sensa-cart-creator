import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingCart, Truck, Package, RotateCcw, Clock } from "lucide-react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useShopifyCart } from "@/stores/shopifyCart";

const ShopProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useShopifyCart((s) => s.addItem);
  const setCartOpen = useShopifyCart((s) => s.setIsOpen);
  const isLoading = useShopifyCart((s) => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((data) => {
        const p = data?.data?.product;
        setProduct(p);
        setSelectedVariantId(p?.variants?.edges?.[0]?.node?.id || null);
      })
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch">
          <div className="text-center">
            <span className="text-6xl block mb-4">🤷</span>
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">Product not found</h1>
            <Link to="/shop" className="cta-primary inline-block no-underline px-8 py-3 mt-4">Back to shop →</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const variant = product.variants.edges.find((v) => v.node.id === selectedVariantId)?.node || product.variants.edges[0]?.node;
  const images = product.images.edges;
  const mainImg = images[activeImage]?.node;
  const price = variant?.price || product.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
    setCartOpen(true);
    toast.success(`${product.title} added to bag! 🛍️`);
  };

  return (
    <>
      <SEOHead title={product.title} description={product.description.slice(0, 160)} />
      <AnnounceBanner />
      <Navbar />

      <div className="bg-cream paper-bg border-b-[3px] border-dark px-4 sm:px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">Home</Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-primary transition-colors no-underline text-muted-foreground">Shop</Link>
          <span>›</span>
          <span className="text-foreground font-semibold truncate">{product.title}</span>
        </div>
      </div>

      <div className="bg-parch paper-bg px-4 sm:px-6 lg:px-12 py-8 lg:py-14">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/shop" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-4 lg:mb-6">
            <ArrowLeft size={16} /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden border-[3px] border-dark rounded-sm bg-surface" style={{ boxShadow: "var(--shadow-brutal)" }}>
                {mainImg ? (
                  <img src={mainImg.url} alt={mainImg.altText || product.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[8rem]">🛍️</div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square overflow-hidden border-[3px] rounded-sm transition-all ${i === activeImage ? "border-primary shadow-[2px_2px_0_hsl(var(--primary))]" : "border-dark/20 hover:border-dark/50"} bg-surface`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <h1 className="font-display font-black italic text-foreground leading-[0.95] mb-4" style={{ fontSize: "clamp(2.4rem,4vw,3.5rem)" }}>
                {product.title}
              </h1>

              <div className="prose prose-sm max-w-none mb-6">
                <p className="font-serif italic text-base text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>

              {/* Variant selectors */}
              {product.options.map((opt) => {
                if (opt.values.length <= 1) return null;
                return (
                  <div key={opt.name} className="mb-4">
                    <p className="font-display italic text-xs font-bold mb-2 text-muted-foreground uppercase tracking-wider">{opt.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.edges.map((v) => {
                        const optValue = v.node.selectedOptions.find((o) => o.name === opt.name)?.value;
                        if (!optValue) return null;
                        const isSelected = v.node.id === selectedVariantId;
                        return (
                          <button
                            key={v.node.id + opt.name}
                            type="button"
                            onClick={() => setSelectedVariantId(v.node.id)}
                            disabled={!v.node.availableForSale}
                            className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all disabled:opacity-40 ${
                              isSelected ? "bg-dark text-cream" : "bg-cream text-foreground shadow-[2px_2px_0_hsl(var(--dark))] hover:bg-accent"
                            }`}
                          >
                            {optValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Price + Add */}
              <div className="bg-cream border-[3px] border-dark rounded-sm p-5 mb-6" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-display font-black text-[2.5rem] text-primary leading-none">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center border-[3px] border-dark rounded-sm overflow-hidden shadow-[3px_3px_0_hsl(var(--dark))] self-start">
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 bg-parch text-foreground font-bold hover:bg-accent transition-colors text-lg">−</button>
                    <span className="px-5 py-3 bg-white text-foreground font-display font-bold text-lg min-w-[50px] text-center">{qty}</span>
                    <button type="button" onClick={() => setQty(qty + 1)} className="px-4 py-3 bg-parch text-foreground font-bold hover:bg-accent transition-colors text-lg">+</button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!variant?.availableForSale || isLoading}
                    className="red-texture-fill flex-1 border-[3px] border-dark px-6 py-3.5 font-display italic text-[1.05rem] font-bold shadow-[5px_5px_0_hsl(var(--dark))] rounded-sm hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_hsl(var(--dark))] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
                    {variant?.availableForSale ? `Add to Bag — ${price.currencyCode} ${(parseFloat(price.amount) * qty).toFixed(2)}` : "Sold out"}
                  </button>
                </div>
              </div>

              {/* Trust row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { icon: <Truck size={15} />, text: "Free Ship €50+" },
                  { icon: <Package size={15} />, text: "Discreet Box" },
                  { icon: <RotateCcw size={15} />, text: "30d Returns" },
                  { icon: <Clock size={15} />, text: "2-4 Day Ship" },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 py-2.5 text-center">
                    <span className="text-primary">{badge.icon}</span>
                    <span className="font-display italic text-[0.6rem] font-bold text-foreground/70 leading-tight">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShopProductPage;
