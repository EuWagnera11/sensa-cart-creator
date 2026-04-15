import { useParams, Link } from "react-router-dom";
import { getProductBySlug, getCategoryBySlug, getProductsByCategory } from "@/data/products";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingCart, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { categorySlug, productSlug } = useParams<{ categorySlug: string; productSlug: string }>();
  const product = getProductBySlug(productSlug || "");
  const category = getCategoryBySlug(categorySlug || "");
  const [qty, setQty] = useState(1);
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
            <Link to="/" className="cta-primary inline-block no-underline px-8 py-3">
              Back to Home →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = getProductsByCategory(categorySlug || "").filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, qty);
    setIsOpen(true);
    toast.success(`${product.name} added to bag! 🛍️`, {
      description: `Qty: ${qty} — €${(product.price * qty).toFixed(2)}`,
    });
  };

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">Home</Link>
          <span>›</span>
          <Link to={`/category/${categorySlug}`} className="hover:text-primary transition-colors no-underline text-muted-foreground">{category.name}</Link>
          <span>›</span>
          <span className="text-foreground font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="bg-parch paper-bg px-6 lg:px-12 py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto">
          <Link to={`/category/${categorySlug}`} className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8">
            <ArrowLeft size={16} /> Back to {category.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[3px] border-dark bg-cream">
            {/* Image */}
            <div className={`${category.color} border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-dark relative overflow-hidden flex items-center justify-center min-h-[400px]`}>
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,.08) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }} />
              {product.sticker && (
                <div className="absolute top-4 right-4 bg-accent text-foreground font-display italic font-bold text-sm px-4 py-1.5 border-2 border-dark rounded-full shadow-[3px_3px_0_hsl(var(--dark))] z-10" style={{ transform: "rotate(3deg)" }}>
                  {product.sticker}
                </div>
              )}
              <span className="text-[10rem] relative z-[2]" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,.2))", animation: "float 4s ease-in-out infinite" }}>
                {product.emoji}
              </span>
            </div>

            {/* Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="font-display italic text-sm text-muted-foreground mb-1">{product.collection} · {product.category}</div>
              <h1 className="font-display font-black italic text-foreground leading-none mb-3" style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <span className="font-serif italic text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <p className="font-serif italic text-lg text-muted-foreground leading-relaxed mb-2">{product.description}</p>
              <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6">{product.longDescription}</p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="font-display font-black text-4xl text-primary">€{product.price}</span>
                {product.originalPrice && (
                  <span className="font-serif italic text-xl text-muted-foreground line-through">€{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-accent text-foreground font-display italic text-xs font-bold px-3 py-1 border-2 border-dark rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Qty + Add */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-[3px] border-dark rounded-sm overflow-hidden shadow-[3px_3px_0_hsl(var(--dark))]">
                  <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 bg-cream text-foreground font-bold hover:bg-parch transition-colors text-lg">−</button>
                  <span className="px-5 py-3 bg-cream text-foreground font-display font-bold text-lg min-w-[50px] text-center">{qty}</span>
                  <button type="button" onClick={() => setQty(qty + 1)} className="px-4 py-3 bg-cream text-foreground font-bold hover:bg-parch transition-colors text-lg">+</button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="red-texture-fill flex-1 border-[3px] border-dark px-8 py-3 font-display italic text-lg font-bold shadow-[5px_5px_0_hsl(var(--dark))] rounded-sm hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_hsl(var(--dark))] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} /> Add to Bag — €{(product.price * qty).toFixed(2)}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-auto">
                {[
                  { icon: <Truck size={18} />, text: "Free Shipping" },
                  { icon: <Shield size={18} />, text: "Discreet Box" },
                  { icon: <RotateCcw size={18} />, text: "30d Returns" },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 bg-parch border-2 border-dark rounded-sm p-3 shadow-[2px_2px_0_hsl(var(--dark))]">
                    <span className="text-primary">{badge.icon}</span>
                    <span className="font-display italic text-[0.65rem] font-bold text-foreground">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 border-[3px] border-dark bg-cream shadow-[5px_5px_0_hsl(var(--dark))]">
            <div className="border-b-[3px] border-dark px-8 py-4 bg-dark">
              <h2 className="font-display font-black italic text-xl text-cream">What's Inside.</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-parch border-2 border-dark rounded-sm p-4 shadow-[2px_2px_0_hsl(var(--dark))]">
                    <span className="w-8 h-8 bg-accent border-2 border-dark rounded-full flex items-center justify-center font-display font-black text-sm text-foreground flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-serif italic text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-2.5">You Might Also Like</p>
              <h2 className="font-display font-black italic text-foreground leading-none mb-8" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
                More from {category.name}.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-[3px] border-dark">
                {relatedProducts.map((rp, i) => (
                  <div
                    key={rp.id}
                    className={`p-8 bg-cream relative overflow-hidden transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0_hsl(var(--dark))] hover:z-[2] group
                      ${i < relatedProducts.length - 1 ? "border-r-0 lg:border-r-[3px] border-b-[3px] lg:border-b-0 border-dark" : ""}
                    `}
                  >
                    <Link to={`/category/${categorySlug}/product/${rp.slug}`} className="block no-underline">
                      <div className="bg-parch border-[3px] border-dark rounded-sm h-32 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <span className="text-5xl">{rp.emoji}</span>
                      </div>
                      <h3 className="font-display font-black italic text-lg text-foreground group-hover:text-primary transition-colors">{rp.name}</h3>
                      <p className="font-serif italic text-sm text-muted-foreground mb-2">{rp.description}</p>
                      <span className="font-display font-black text-xl text-primary">€{rp.price}</span>
                    </Link>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button type="button" className="cta-primary w-full text-sm px-4 py-3" onClick={() => {
                        addItem(rp, 1);
                        setIsOpen(true);
                        toast.success(`${rp.name} added to bag ✨`);
                      }}>
                        Comprar
                      </button>
                      <Link to={`/category/${categorySlug}/product/${rp.slug}`} className="cta-secondary w-full text-sm px-4 py-3 no-underline text-center">
                        Saiba mais
                      </Link>
                    </div>
                  </div>
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
