import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug, getProductsByCategory, categories } from "@/data/products";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const categoryProducts = getProductsByCategory(categorySlug || "");
  const { addItem, setIsOpen } = useCart();

  const handleBuy = (productId: string) => {
    const product = categoryProducts.find((item) => item.id === productId);
    if (!product) return;

    addItem(product, 1);
    setIsOpen(true);
    toast.success(`${product.name} added to bag ✨`);
  };

  if (!category) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch paper-bg">
          <div className="text-center">
            <span className="text-6xl block mb-4">🤷</span>
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">Category Not Found</h1>
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

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      {/* Hero */}
      <div className={`${category.color} border-b-[5px] border-dark relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,.1) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }} />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-[2]">
          <Link to="/" className={`inline-flex items-center gap-2 font-display italic text-sm mb-6 no-underline transition-colors ${category.darkText ? "text-foreground/60 hover:text-foreground" : "text-white/60 hover:text-white"}`}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="text-6xl block mb-4">{category.emoji}</span>
          <h1 className={`font-display font-black italic leading-none mb-2 ${category.darkText ? "text-foreground" : "text-white"}`} style={{ fontSize: "clamp(3rem,5vw,5rem)", textShadow: category.darkText ? "none" : "3px 3px 0 rgba(0,0,0,.2)" }}>
            {category.name}.
          </h1>
          <p className={`font-display italic text-lg mb-1 ${category.darkText ? "text-foreground/60" : "text-white/70"}`}>{category.collection}</p>
          <p className={`text-xs tracking-[3px] uppercase font-bold ${category.darkText ? "text-foreground/40" : "text-white/40"}`}>{category.desc} · {categoryProducts.length} products</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">Home</Link>
          <span>›</span>
          <span className="text-foreground font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-parch paper-bg px-6 lg:px-12 py-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Category quick nav */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`px-4 py-2 border-[3px] border-dark rounded-sm font-display italic text-sm font-bold shadow-[3px_3px_0_hsl(var(--dark))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_hsl(var(--dark))] no-underline ${
                  cat.slug === categorySlug
                    ? "red-texture-fill"
                    : "bg-cream text-foreground hover:bg-accent"
                }`}
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🔜</span>
              <p className="font-display italic text-xl text-muted-foreground">Products coming soon...</p>
            </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-[3px] border-dark">
              {categoryProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`p-8 relative overflow-hidden transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0_hsl(var(--dark))] hover:z-[2] group no-underline bg-cream
                    ${(i + 1) % 3 !== 0 ? "border-r-0 lg:border-r-[3px] border-dark" : ""}
                    ${i < categoryProducts.length - (categoryProducts.length % 3 || 3) ? "border-b-[3px] border-dark" : ""}
                    sm:border-b-[3px] sm:border-dark lg:border-b-0
                    ${i < categoryProducts.length - 1 ? "border-b-[3px] border-dark" : ""}
                  `}
                >
                  {product.sticker && (
                    <div className="absolute -top-1 right-4 bg-accent text-foreground font-display italic font-bold text-[0.65rem] px-3 py-1 border-2 border-dark rounded-full shadow-[2px_2px_0_hsl(var(--dark))]" style={{ transform: "rotate(3deg)" }}>
                      {product.sticker}
                    </div>
                  )}

                  <Link to={`/category/${categorySlug}/product/${product.slug}`} className="block no-underline">
                    <div className="bg-parch border-[3px] border-dark rounded-sm h-40 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                      <span className="text-6xl">{product.emoji}</span>
                    </div>

                    <div className="font-display italic text-[0.7rem] text-muted-foreground mb-1">{product.collection}</div>
                    <h3 className="font-display font-black italic text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="font-serif italic text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-2xl text-primary">€{product.price}</span>
                      {product.originalPrice && (
                        <span className="font-serif italic text-sm text-muted-foreground line-through">€{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="text-accent">★</span> {product.rating} ({product.reviews})
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button type="button" className="cta-primary w-full text-sm px-4 py-3" onClick={() => handleBuy(product.id)}>
                      Comprar
                    </button>
                    <Link to={`/category/${categorySlug}/product/${product.slug}`} className="cta-secondary w-full text-sm px-4 py-3 no-underline text-center">
                      Saiba mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;
