import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug, getProductsByCategory, categories } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { getCategoryBanners } from "@/data/categoryBanners";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CategoryHeroBanner from "@/components/CategoryHeroBanner";
import { ChevronDown, Package, Truck } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under €30", min: 0, max: 30 },
  { label: "€30–€60", min: 30, max: 60 },
  { label: "€60–€100", min: 60, max: 100 },
  { label: "€100+", min: 100, max: Infinity },
];

const PROMO_BANNER_AFTER = 4; // Insert promo banner after this many products

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const categoryProducts = getProductsByCategory(categorySlug || "");
  const { addItem, setIsOpen } = useCart();

  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState(0);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Price filter
    const range = PRICE_RANGES[priceRange];
    if (range && range.max !== Infinity || range.min > 0) {
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [categoryProducts, sortBy, priceRange]);

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
      <SEOHead
        title={`${category.name} — ${category.desc}`}
        description={`Explore ${category.desc.toLowerCase()} at OoohMy. ${category.collection}. Discreet shipping.`}
      />
      <AnnounceBanner />
      <Navbar />

      {/* Hero Banner */}
      {getCategoryBanners(categorySlug || "").length > 0 ? (
        <CategoryHeroBanner
          slides={getCategoryBanners(categorySlug || "")}
          categoryName={category.name}
          categoryEmoji={category.emoji}
          categoryCollection={category.collection}
          categoryDesc={category.desc}
          productCount={categoryProducts.length}
          darkText={category.darkText}
        />
      ) : (
        <div className={`${category.color} border-b-[5px] border-dark relative overflow-hidden`}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,.1) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }} />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-[2]">
            <span className="text-6xl block mb-4">{category.emoji}</span>
            <h1 className={`font-display font-black italic leading-none mb-2 ${category.darkText ? "text-foreground" : "text-white"}`} style={{ fontSize: "clamp(3rem,5vw,5rem)", textShadow: category.darkText ? "none" : "3px 3px 0 rgba(0,0,0,.2)" }}>
              {category.name}.
            </h1>
            <p className={`font-display italic text-lg mb-1 ${category.darkText ? "text-foreground/60" : "text-white/70"}`}>{category.collection}</p>
            <p className={`text-xs tracking-[3px] uppercase font-bold ${category.darkText ? "text-foreground/40" : "text-white/40"}`}>{category.desc} · {categoryProducts.length} products</p>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">Home</Link>
          <span>›</span>
          <span className="text-foreground font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Toolbar — Sort & Filter */}
      <div className="bg-cream border-b-[3px] border-dark px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-cream border-[2px] border-dark rounded-sm px-3 py-1.5 pr-8 font-display italic text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>

            {/* Price range chips */}
            <div className="flex items-center gap-1.5">
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => setPriceRange(idx)}
                  className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all ${
                    priceRange === idx
                      ? "bg-primary text-white shadow-[2px_2px_0_hsl(var(--dark))]"
                      : "bg-cream text-foreground hover:bg-surface"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <span className="font-display italic text-sm text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-parch paper-bg px-6 lg:px-12 py-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Category quick nav */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🔜</span>
              <p className="font-display italic text-xl text-muted-foreground">
                {categoryProducts.length === 0 ? "Products coming soon..." : "No products match your filters."}
              </p>
              {priceRange !== 0 && (
                <button type="button" onClick={() => setPriceRange(0)} className="cta-secondary mt-4 px-6 py-2 text-sm">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, index) => (
                <>
                  {/* Promo banner after Nth product */}
                  {index === PROMO_BANNER_AFTER && (
                    <div
                      key="promo-banner"
                      className="col-span-full bg-gradient-to-r from-primary/90 to-primary border-[3px] border-dark rounded-sm overflow-hidden shadow-[4px_4px_0_hsl(var(--dark))]"
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Truck className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-display font-black italic text-white text-lg leading-tight">Free Discreet Shipping</h3>
                            <p className="font-serif italic text-white/70 text-sm">On all orders over €50 · Plain packaging guaranteed</p>
                          </div>
                        </div>
                        <Link
                          to="/products"
                          className="cta-primary bg-white !text-primary border-dark no-underline px-6 py-2.5 text-sm font-bold shrink-0 hover:bg-cream"
                        >
                          Shop All →
                        </Link>
                      </div>
                    </div>
                  )}

                  <div
                    key={product.id}
                    className="group relative bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] hover:z-[2]"
                    style={{ boxShadow: "var(--shadow-brutal)" }}
                  >
                    {/* Image */}
                    <Link to={`/category/${categorySlug}/product/${product.slug}`} className="block no-underline relative">
                      <div className="relative h-52 overflow-hidden bg-surface">
                        {getProductImage(product.name) ? (
                          <img
                            src={getProductImage(product.name)}
                            alt={product.name}
                            loading="eager"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-parch">
                            <span className="text-6xl">{product.emoji}</span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {product.sticker && (
                          <div
                            className="absolute top-2.5 right-2.5 bg-accent text-foreground font-display italic font-bold text-[0.6rem] px-3 py-1 border-2 border-dark rounded-full shadow-[2px_2px_0_hsl(var(--dark))] z-10"
                            style={{ transform: "rotate(3deg)" }}
                          >
                            {product.sticker}
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-4">
                      <div className="font-display italic text-[0.65rem] text-muted-foreground mb-0.5 tracking-wide">{product.collection}</div>

                      <Link to={`/category/${categorySlug}/product/${product.slug}`} className="block no-underline">
                        <h3 className="font-display font-black italic text-[1.1rem] text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="font-serif italic text-[0.78rem] text-muted-foreground leading-relaxed mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-black text-[1.4rem] text-primary leading-none">€{product.price}</span>
                          {product.originalPrice && (
                            <span className="font-serif italic text-[0.72rem] text-muted-foreground line-through">€{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[0.7rem] text-muted-foreground">
                          <span className="text-accent text-sm">★</span>
                          <span className="font-display font-bold">{product.rating}</span>
                          <span className="font-serif italic">({product.reviews})</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" className="cta-primary w-full text-[0.78rem] px-3 py-2" onClick={() => handleBuy(product.id)}>
                          Buy now
                        </button>
                        <Link to={`/category/${categorySlug}/product/${product.slug}`} className="cta-secondary w-full text-[0.78rem] px-3 py-2 no-underline text-center">
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
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
