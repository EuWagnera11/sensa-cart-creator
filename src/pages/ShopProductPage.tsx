import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingCart, Truck, Package, RotateCcw, Clock } from "lucide-react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useProductDetail } from "@/lib/productGroups";
import { useShopifyCart } from "@/stores/shopifyCart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductGallery from "@/components/product/ProductGallery";
import ProductReviews from "@/components/product/ProductReviews";
import ProductTabs from "@/components/product/ProductTabs";
import CrossSell from "@/components/product/CrossSell";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import {
  StockIndicator,
  DiscountBadge,
  StickyMobileCTA,
  ShareButton,
} from "@/components/product/ProductBadges";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useSmartBack } from "@/hooks/useSmartBack";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductBreadcrumbs } from "@/hooks/useProductBreadcrumbs";
import WishlistHeart from "@/components/WishlistHeart";

const ShopProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const addItem = useShopifyCart((s) => s.addItem);
  const setCartOpen = useShopifyCart((s) => s.setIsOpen);
  const isLoading = useShopifyCart((s) => s.isLoading);

  const { track } = useRecentlyViewed();
  const goBack = useSmartBack("/shop");
  const breadcrumbs = useProductBreadcrumbs(handle, product?.title || "");

  const ctaRef = useRef<HTMLDivElement>(null);

  const {
    group,
    isGrouped,
    selected: groupSelected,
    setOption: setGroupOption,
    activeVariant: groupActiveVariant,
    isAvailable: isGroupOptionAvailable,
    axes,
  } = useProductDetail(handle);

  // Fetch product
  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((data) => {
        const p = data?.data?.product;
        setProduct(p);
        const firstAvailable =
          p?.variants?.edges?.find((v: any) => v.node.availableForSale)?.node ||
          p?.variants?.edges?.[0]?.node;
        const initial: Record<string, string> = {};
        firstAvailable?.selectedOptions?.forEach((o: { name: string; value: string }) => {
          initial[o.name] = o.value;
        });
        setSelectedOptions(initial);
      })
      .catch((err) => {
        console.error("Failed to load product", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [handle]);

  // Track recently viewed
  useEffect(() => {
    if (handle && product) track(handle);
  }, [handle, product]);

  // Navigate when grouped variant changes
  useEffect(() => {
    if (!isGrouped || !groupActiveVariant || !handle) return;
    if (groupActiveVariant.handle !== handle) {
      navigate(`/shop/product/${groupActiveVariant.handle}`);
    }
  }, [isGrouped, groupActiveVariant, handle, navigate]);

  // Sticky CTA visibility (mobile only)
  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCTA(!entry.isIntersecting),
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [product]);

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
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">
              Product not found
            </h1>
            <Link to="/shop" className="cta-primary inline-block no-underline px-8 py-3 mt-4">
              Back to shop →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const variant =
    product.variants.edges.find((v) =>
      v.node.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
    )?.node || product.variants.edges[0]?.node;

  const images = product.images.edges.map((e) => e.node);
  const price = variant?.price || product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice;
  const currency = price.currencyCode === "EUR" ? "€" : `${price.currencyCode} `;
  const formattedPrice = `${currency}${parseFloat(price.amount).toFixed(2)}`;
  const formattedTotal = `${currency}${(parseFloat(price.amount) * qty).toFixed(2)}`;
  const formattedCompareAt = compareAt
    ? `${currency}${parseFloat(compareAt.amount).toFixed(2)}`
    : null;

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
    toast.success(`${product.title} added to bag 🛍️`);
  };

  const productUrl = handle ? `/shop/product/${handle}` : "/shop";

  return (
    <>
      <SEOHead title={product.title} description={product.description.slice(0, 160)} />
      <AnnounceBanner />
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-4 sm:px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <div className="bg-parch paper-bg px-4 sm:px-6 lg:px-12 py-8 lg:py-12 pb-24 lg:pb-12">
        <div className="max-w-[1440px] mx-auto">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors mb-4 lg:mb-6 bg-transparent border-0 p-0 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Gallery */}
            <ProductGallery images={images} productTitle={product.title} />

            {/* Info */}
            <div className="flex flex-col">
              {/* Discount + Stock + Vendor row */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                {product.vendor && (
                  <span className="font-display italic font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {product.vendor}
                  </span>
                )}
                <DiscountBadge
                  price={parseFloat(price.amount)}
                  compareAtPrice={compareAt ? parseFloat(compareAt.amount) : null}
                />
                <StockIndicator
                  quantityAvailable={variant?.quantityAvailable}
                  availableForSale={!!variant?.availableForSale}
                />
              </div>

              {/* Title */}
              <h1
                className="font-display font-black italic text-foreground leading-[0.95] mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {product.title}
              </h1>

              {/* Share + Wishlist */}
              <div className="flex items-center justify-end gap-2 mb-5">
                {handle && (
                  <WishlistHeart
                    handle={handle}
                    productTitle={product.title}
                    size="lg"
                    variant="filled"
                  />
                )}
                <ShareButton productTitle={product.title} productUrl={productUrl} />
              </div>

              {/* Short description */}
              <p className="font-serif italic text-foreground/80 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Grouped axes */}
              {isGrouped &&
                group &&
                axes.map((axis) => {
                  const values = Array.from(
                    new Set(group.variants.map((v) => v.attributes[axis]).filter(Boolean) as string[])
                  );
                  if (values.length <= 1) return null;
                  return (
                    <div key={axis} className="mb-4">
                      <p className="font-display italic text-xs font-bold mb-2 text-muted-foreground uppercase tracking-wider">
                        {axis}
                      </p>
                      <Select value={groupSelected[axis] || ""} onValueChange={(v) => setGroupOption(axis, v)}>
                        <SelectTrigger className="w-full bg-cream border-[2px] border-dark rounded-sm font-display italic text-sm font-bold text-foreground shadow-[2px_2px_0_hsl(var(--dark))] h-11">
                          <SelectValue placeholder={`Choose ${axis.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-cream border-[2px] border-dark rounded-sm">
                          {values.map((value) => {
                            const ok = isGroupOptionAvailable(axis, value);
                            return (
                              <SelectItem key={axis + value} value={value} disabled={!ok} className="font-display italic text-sm font-bold">
                                {value}
                                {!ok ? " — n/a" : ""}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}

              {/* Native variant selectors */}
              {product.options.map((opt) => {
                if (opt.values.length <= 1) return null;
                return (
                  <div key={opt.name} className="mb-4">
                    <p className="font-display italic text-xs font-bold mb-2 text-muted-foreground uppercase tracking-wider">
                      {opt.name}
                    </p>
                    <Select
                      value={selectedOptions[opt.name] || ""}
                      onValueChange={(value) =>
                        setSelectedOptions((prev) => ({ ...prev, [opt.name]: value }))
                      }
                    >
                      <SelectTrigger className="w-full bg-cream border-[2px] border-dark rounded-sm font-display italic text-sm font-bold text-foreground shadow-[2px_2px_0_hsl(var(--dark))] h-11">
                        <SelectValue placeholder={`Choose ${opt.name.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent className="bg-cream border-[2px] border-dark rounded-sm">
                        {opt.values.map((value) => {
                          const candidate = { ...selectedOptions, [opt.name]: value };
                          const v = product.variants.edges.find((vv) =>
                            vv.node.selectedOptions.every((o) => candidate[o.name] === o.value)
                          )?.node;
                          const ok = !!v?.availableForSale;
                          return (
                            <SelectItem
                              key={opt.name + value}
                              value={value}
                              disabled={!ok}
                              className="font-display italic text-sm font-bold"
                            >
                              {value}
                              {!ok ? " — sold out" : ""}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}

              {/* Price + CTA */}
              <div
                ref={ctaRef}
                className="bg-cream border-[3px] border-dark rounded-sm p-5 mb-6"
                style={{ boxShadow: "5px 5px 0 hsl(var(--dark))" }}
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                  <span className="font-display font-black text-[2.5rem] text-foreground leading-none tabular-nums">
                    {formattedPrice}
                  </span>
                  {formattedCompareAt && (
                    <span className="font-serif italic text-base text-muted-foreground line-through tabular-nums">
                      {formattedCompareAt}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center border-[3px] border-dark rounded-sm overflow-hidden shadow-[3px_3px_0_hsl(var(--dark))] self-start">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-3 bg-parch text-foreground font-bold hover:bg-accent transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="px-5 py-3 bg-white text-foreground font-display font-bold text-lg min-w-[50px] text-center tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="px-4 py-3 bg-parch text-foreground font-bold hover:bg-accent transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!variant?.availableForSale || isLoading}
                    className="flex-1 border-[3px] border-dark px-6 py-3.5 bg-primary text-cream font-display italic text-[1.05rem] font-bold shadow-[5px_5px_0_hsl(var(--dark))] rounded-sm hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_hsl(var(--dark))] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
                    {variant?.availableForSale ? `Add to bag — ${formattedTotal}` : "Sold out"}
                  </button>
                </div>
              </div>

              {/* Trust row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { icon: <Truck size={15} />, text: "Free ship €50+" },
                  { icon: <Package size={15} />, text: "Discreet box" },
                  { icon: <RotateCcw size={15} />, text: "30d returns" },
                  { icon: <Clock size={15} />, text: "2-4 day ship" },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 py-2.5 text-center">
                    <span className="text-primary">{badge.icon}</span>
                    <span className="font-display italic text-[0.6rem] font-bold text-foreground/70 leading-tight">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs (Description / Specs / Shipping / FAQ) */}
          <ProductTabs description={product.description} vendor={product.vendor} />

          {/* Reviews */}
          {handle && <ProductReviews handle={handle} />}

          {/* Cross-sell */}
          {handle && <CrossSell currentHandle={handle} />}

          {/* Recently viewed */}
          {handle && <RecentlyViewed currentHandle={handle} />}
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA
        visible={showStickyCTA}
        productTitle={product.title}
        price={formattedPrice}
        available={!!variant?.availableForSale}
        qty={qty}
        onIncQty={() => setQty((q) => q + 1)}
        onDecQty={() => setQty((q) => Math.max(1, q - 1))}
        onAdd={handleAdd}
        isAddingToCart={isLoading}
      />

      <Footer />
    </>
  );
};

export default ShopProductPage;
