import { useParams, Link } from "react-router-dom";
import { getProductBySlug, getCategoryBySlug, getProductsByCategory } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, ShoppingCart, Truck, Shield, RotateCcw, Star, Heart, Package, Clock, Check, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { categorySlug, productSlug } = useParams<{ categorySlug: string; productSlug: string }>();
  const product = getProductBySlug(productSlug || "");
  const category = getCategoryBySlug(categorySlug || "");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");
  const [liked, setLiked] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);
  const { addItem, setIsOpen } = useCart();

  if (!product || !category) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch">
          <div className="text-center">
            <span className="text-6xl block mb-4">🤷</span>
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">Product Not Found</h1>
            <p className="font-serif italic text-muted-foreground mb-6">This secret doesn't exist... yet.</p>
            <Link to="/" className="cta-primary inline-block no-underline px-8 py-3">Back to Home →</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = getProductsByCategory(categorySlug || "").filter(p => p.id !== product.id).slice(0, 4);
  const productImg = getProductImage(product.name);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem(product, qty);
    setIsOpen(true);
    toast.success(`${product.name} added to bag! 🛍️`, {
      description: `Qty: ${qty} — €${(product.price * qty).toFixed(2)}`,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const tabs = [
    { id: "description" as const, label: "Description" },
    { id: "details" as const, label: "Details & Specs" },
    { id: "reviews" as const, label: `Reviews (${product.reviews})` },
  ];

  return (
    <>
      <SEOHead
        title={product.name}
        description={product.description.replace(/"/g, "")}
        type="product"
        product={{
          name: product.name,
          price: product.price,
          description: product.longDescription,
          availability: product.inStock ? "InStock" : "OutOfStock",
          rating: product.rating,
          reviewCount: product.reviews,
          category: product.category,
        }}
      />
      <AnnounceBanner />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-4 sm:px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground overflow-x-auto">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground shrink-0">Home</Link>
          <span>›</span>
          <Link to={`/category/${categorySlug}`} className="hover:text-primary transition-colors no-underline text-muted-foreground shrink-0">{category.name}</Link>
          <span>›</span>
          <span className="text-foreground font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="bg-parch paper-bg px-4 sm:px-6 lg:px-12 py-8 lg:py-14">
        <div className="max-w-[1440px] mx-auto">
          <Link to={`/category/${categorySlug}`} className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-4 lg:mb-6">
            <ArrowLeft size={16} /> Back to {category.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* LEFT — Image */}
            <div className="space-y-3">
              {/* Main image with zoom on hover */}
              <div
                ref={imgRef}
                className="relative aspect-square overflow-hidden border-[3px] border-dark rounded-sm bg-surface cursor-crosshair"
                style={{ boxShadow: "var(--shadow-brutal)" }}
                onMouseEnter={() => setImageZoom(true)}
                onMouseLeave={() => setImageZoom(false)}
                onMouseMove={handleMouseMove}
              >
                {productImg ? (
                  <img
                    src={productImg}
                    alt={product.name}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                    style={imageZoom ? {
                      transform: "scale(2)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    } : {}}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10rem]" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,.2))" }}>{product.emoji}</span>
                  </div>
                )}

                {product.sticker && (
                  <div className="absolute top-4 right-4 bg-accent text-foreground font-display italic font-bold text-sm px-4 py-1.5 border-2 border-dark rounded-full shadow-[3px_3px_0_hsl(var(--dark))] z-10" style={{ transform: "rotate(3deg)" }}>
                    {product.sticker}
                  </div>
                )}

                {/* Wishlist */}
                <button
                  type="button"
                  className={`absolute top-4 left-4 w-10 h-10 border-2 border-dark rounded-full flex items-center justify-center shadow-[2px_2px_0_hsl(var(--dark))] z-10 transition-all ${liked ? "bg-primary" : "bg-cream/90 hover:bg-accent"}`}
                  onClick={() => { setLiked(!liked); toast(liked ? "Removed from wishlist" : "Saved to wishlist 💛"); }}
                >
                  <Heart size={18} className={liked ? "fill-cream text-cream" : "text-foreground"} />
                </button>

                {/* Zoom hint */}
                {!imageZoom && productImg && (
                  <div className="absolute bottom-3 right-3 bg-dark/60 text-cream text-[0.6rem] font-display italic px-2.5 py-1 rounded-sm z-10 backdrop-blur-sm">
                    🔍 Hover to zoom
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`aspect-square overflow-hidden border-[3px] rounded-sm cursor-pointer transition-all ${i === 0 ? "border-primary shadow-[2px_2px_0_hsl(var(--primary))]" : "border-dark/20 hover:border-dark/50"} bg-surface`}
                  >
                    {productImg ? (
                      <img src={productImg} alt={`${product.name} view ${i + 1}`} loading="eager" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-parch">
                        <span className="text-2xl">{product.emoji}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Product Info */}
            <div className="flex flex-col">
              {/* Collection badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-dark text-cream font-display italic text-[0.6rem] font-bold px-3 py-1 rounded-sm tracking-wider uppercase">{product.collection}</span>
                <span className="text-[0.68rem] text-muted-foreground font-serif italic">{product.category}</span>
              </div>

              <h1 className="font-display font-black italic text-foreground leading-[0.95] mb-4" style={{ fontSize: "clamp(2.4rem,4vw,3.5rem)" }}>
                {product.name}
              </h1>

              {/* Rating — larger, more prominent */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b-2 border-dark/10">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <span className="font-display font-bold text-base text-foreground">{product.rating}</span>
                <span className="font-serif italic text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                {product.reviews > 100 && (
                  <span className="bg-accent/30 text-foreground/70 font-display italic text-[0.6rem] font-bold px-2 py-0.5 rounded-full border border-dark/10">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Short description */}
              <p className="font-serif italic text-lg text-muted-foreground leading-relaxed mb-2">{product.description}</p>
              <p className="text-sm text-foreground/70 leading-relaxed mb-6">{product.longDescription}</p>

              {/* Key features quick list */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
                {product.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-primary shrink-0" strokeWidth={3} />
                    <span className="text-[0.8rem] text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price block — sticky feel */}
              <div className="bg-cream border-[3px] border-dark rounded-sm p-5 mb-6" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-display font-black text-[2.5rem] text-primary leading-none">€{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="font-serif italic text-xl text-muted-foreground line-through">€{product.originalPrice}</span>
                      <span className="bg-accent text-foreground font-display italic text-xs font-bold px-3 py-1 border-2 border-dark rounded-full animate-pulse">
                        -{discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Qty + Add to Cart */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center border-[3px] border-dark rounded-sm overflow-hidden shadow-[3px_3px_0_hsl(var(--dark))] self-start">
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 bg-parch text-foreground font-bold hover:bg-accent transition-colors text-lg">−</button>
                    <span className="px-5 py-3 bg-white text-foreground font-display font-bold text-lg min-w-[50px] text-center">{qty}</span>
                    <button type="button" onClick={() => setQty(qty + 1)} className="px-4 py-3 bg-parch text-foreground font-bold hover:bg-accent transition-colors text-lg">+</button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="red-texture-fill flex-1 border-[3px] border-dark px-6 py-3.5 font-display italic text-[1.05rem] font-bold shadow-[5px_5px_0_hsl(var(--dark))] rounded-sm hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_hsl(var(--dark))] transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} /> Add to Bag — €{(product.price * qty).toFixed(2)}
                  </button>
                </div>

                {/* Urgency cue */}
                {product.originalPrice && (
                  <p className="text-[0.72rem] text-primary font-display italic font-bold mt-3 flex items-center gap-1">
                    🔥 Sale ends soon — limited stock
                  </p>
                )}
              </div>

              {/* Trust row — horizontal compact */}
              <div className="grid grid-cols-4 gap-2 mb-5">
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

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                <span className="font-display italic text-foreground text-[0.82rem]">
                  {product.inStock ? "In Stock — Ships today if ordered before 3 PM" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 sm:mt-16 border-[3px] border-dark bg-cream rounded-sm" style={{ boxShadow: "var(--shadow-brutal)" }}>
            <div className="flex border-b-[3px] border-dark overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 font-display italic font-bold text-[0.78rem] sm:text-[0.88rem] transition-colors whitespace-nowrap border-r-[3px] border-dark last:border-r-0 ${
                    activeTab === tab.id
                      ? "bg-dark text-cream"
                      : "bg-cream text-foreground hover:bg-parch"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 lg:p-10">
              {activeTab === "description" && (
                <div className="max-w-3xl">
                  <p className="font-serif italic text-lg text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  <p className="text-foreground/80 leading-[1.8] mb-6">{product.longDescription}</p>
                  <div className="bg-parch border-2 border-dark/15 rounded-sm p-5 font-serif italic text-sm text-foreground/70 leading-relaxed">
                    <strong className="font-display not-italic text-foreground block mb-1">💡 Good to know</strong>
                    All our products are made from body-safe materials, CE certified, and tested to the highest standards. Your pleasure, our priority.
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <h3 className="font-display font-black italic text-xl text-foreground mb-5">What's Inside</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-parch border-2 border-dark/15 rounded-sm p-4">
                        <span className="w-7 h-7 bg-accent border-2 border-dark rounded-full flex items-center justify-center font-display font-black text-xs text-foreground flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-serif italic text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: "Material", value: "Body-safe silicone" },
                      { label: "Waterproof", value: "IPX7" },
                      { label: "Charging", value: "USB magnetic" },
                      { label: "Warranty", value: "2 years" },
                    ].map((spec) => (
                      <div key={spec.label} className="bg-surface border-2 border-dark/10 rounded-sm p-3 text-center">
                        <div className="text-[0.62rem] tracking-[2px] uppercase text-muted-foreground font-bold mb-1">{spec.label}</div>
                        <div className="font-display italic font-bold text-sm text-foreground">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                    <div className="text-center shrink-0">
                      <div className="font-display font-black text-5xl text-primary">{product.rating}</div>
                      <div className="flex gap-0.5 justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"} />
                        ))}
                      </div>
                      <div className="font-serif italic text-xs text-muted-foreground mt-1">{product.reviews.toLocaleString()} reviews</div>
                    </div>
                    <div className="flex-1 w-full space-y-1.5">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const pct = stars === 5 ? 72 : stars === 4 ? 18 : stars === 3 ? 6 : stars === 2 ? 3 : 1;
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="font-display text-xs w-3 text-right">{stars}</span>
                            <Star size={10} className="fill-accent text-accent" />
                            <div className="flex-1 h-2.5 bg-dark/10 rounded-full overflow-hidden">
                              <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[0.65rem] text-muted-foreground w-8 text-right">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Sarah M.", rating: 5, text: "Best purchase I've ever made. The quality is amazing and the packaging was super discreet. Highly recommend! 🔥", date: "2 weeks ago", verified: true },
                      { name: "Ana R.", rating: 5, text: "Exceeded all my expectations. Arrived fast and the product is even better than described.", date: "1 month ago", verified: true },
                      { name: "Guest", rating: 4, text: "Great product, just wish there were more colour options. But the quality is top-notch.", date: "2 months ago", verified: false },
                    ].map((review, i) => (
                      <div key={i} className="bg-parch border-2 border-dark/10 rounded-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-primary/10 border-2 border-dark/10 rounded-full flex items-center justify-center font-display font-bold text-xs text-primary">
                              {review.name[0]}
                            </span>
                            <span className="font-display italic font-bold text-sm text-foreground">{review.name}</span>
                            {review.verified && (
                              <span className="flex items-center gap-0.5 text-[0.6rem] text-green-700 font-bold">
                                <Check size={10} strokeWidth={3} /> Verified
                              </span>
                            )}
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} size={11} className={j < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-[0.68rem] text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="font-serif italic text-sm text-foreground/80 leading-relaxed ml-10">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-2.5">You Might Also Like</p>
              <h2 className="font-display font-black italic text-foreground leading-none mb-8" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
                More from {category.name}.
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/category/${categorySlug}/product/${rp.slug}`}
                    className="group bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] no-underline"
                    style={{ boxShadow: "var(--shadow-brutal)" }}
                  >
                    <div className="relative aspect-square overflow-hidden bg-surface">
                      {getProductImage(rp.name) ? (
                        <img src={getProductImage(rp.name)} alt={rp.name} loading="eager" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-parch">
                          <span className="text-5xl">{rp.emoji}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-black italic text-base text-foreground group-hover:text-primary transition-colors mb-0.5 truncate">{rp.name}</h3>
                      <p className="font-serif italic text-xs text-muted-foreground mb-2 line-clamp-1">{rp.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-lg text-primary">€{rp.price}</span>
                        <span className="flex items-center gap-0.5 text-[0.65rem] text-muted-foreground">
                          <Star size={10} className="fill-accent text-accent" />
                          {rp.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
