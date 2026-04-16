import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug, getProductsByCategory, categories } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0_hsl(var(--dark))] hover:z-[2]"
                  style={{ boxShadow: "var(--shadow-brutal)" }}
                >
                  {/* Image area — hero-sized */}
                  <Link to={`/category/${categorySlug}/product/${product.slug}`} className="block no-underline relative">
                    <div className="relative aspect-square overflow-hidden bg-surface">
                      {getProductImage(product.name) ? (
                        <img
                          src={getProductImage(product.name)}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-parch">
                          <span className="text-7xl">{product.emoji}</span>
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Sticker badge */}
                      {product.sticker && (
                        <div
                          className="absolute top-3 right-3 bg-accent text-foreground font-display italic font-bold text-[0.65rem] px-3.5 py-1.5 border-2 border-dark rounded-full shadow-[2px_2px_0_hsl(var(--dark))] z-10"
                          style={{ transform: "rotate(3deg)" }}
                        >
                          {product.sticker}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Info area */}
                  <div className="p-5 pb-6">
                    <div className="font-display italic text-[0.68rem] text-muted-foreground mb-1 tracking-wide">{product.collection}</div>

                    <Link to={`/category/${categorySlug}/product/${product.slug}`} className="block no-underline">
                      <h3 className="font-display font-black italic text-[1.25rem] text-foreground leading-tight mb-1.5 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="font-serif italic text-[0.82rem] text-muted-foreground leading-relaxed mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-black text-[1.6rem] text-primary leading-none">€{product.price}</span>
                        {product.originalPrice && (
                          <span className="font-serif italic text-[0.78rem] text-muted-foreground line-through">€{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[0.75rem] text-muted-foreground">
                        <span className="text-accent text-sm">★</span>
                        <span className="font-display font-bold">{product.rating}</span>
                        <span className="font-serif italic">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button type="button" className="cta-primary w-full text-[0.82rem] px-4 py-2.5" onClick={() => handleBuy(product.id)}>
                        Comprar
                      </button>
                      <Link to={`/category/${categorySlug}/product/${product.slug}`} className="cta-secondary w-full text-[0.82rem] px-4 py-2.5 no-underline text-center">
                        Saiba mais
                      </Link>
                    </div>
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
