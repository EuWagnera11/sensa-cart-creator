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
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under €30", min: 0, max: 30 },
  { label: "€30 – €60", min: 30, max: 60 },
  { label: "€60 – €100", min: 60, max: 100 },
  { label: "€100+", min: 100, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const categoryProducts = getProductsByCategory(categorySlug || "");
  const { addItem, setIsOpen } = useCart();

  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Price filter
    const range = PRICE_RANGES[priceRange];
    if (range && priceRange > 0) {
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
  }, [categoryProducts, priceRange, sortBy]);

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

  // Insert promo banner after 4th product
  const PROMO_INSERT_INDEX = 4;

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

      {/* Toolbar: Sort + Price Filter + Count */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center gap-3">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-auto min-w-[160px] border-[2px] border-dark bg-cream font-display italic text-sm font-bold shadow-[2px_2px_0_hsl(var(--dark))] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[2px] border-dark bg-cream shadow-[4px_4px_0_hsl(var(--dark))]">
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="font-display italic text-sm font-bold cursor-pointer">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price chips */}
          <div className="flex flex-wrap gap-1.5">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={range.label}
                type="button"
                onClick={() => setPriceRange(idx)}
                className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all shadow-[2px_2px_0_hsl(var(--dark))] ${
                  priceRange === idx
                    ? "red-texture-fill"
                    : "bg-cream text-foreground hover:bg-accent"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="ml-auto font-display italic text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filteredProducts.length}</span> products
          </div>
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🔜</span>
              <p className="font-display italic text-xl text-muted-foreground">
                {categoryProducts.length === 0 ? "Products coming soon..." : "No products match your filters."}
              </p>
              {priceRange > 0 && (
                <button
                  type="button"
                  onClick={() => setPriceRange(0)}
                  className="cta-secondary mt-4 inline-block text-sm px-6 py-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, index) => (
                <>
                  {/* Promo banner after 4th product */}
                  {index === PROMO_INSERT_INDEX && (
                    <div
                      key="promo-banner"
                      className="col-span-full rounded-sm border-[3px] border-dark overflow-hidden shadow-[4px_4px_0_hsl(var(--dark))]"
                    >
                      <div className={`${category.color} relative px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4`}>
                        <div className="absolute inset-0 pointer-events-none" style={{
                          backgroundImage: "radial-gradient(circle, rgba(0,0,0,.08) 1px, transparent 1px)",
                          backgroundSize: "14px 14px",
                        }} />
                        <div className="relative z-[2]">
                          <p className={`font-display font-black italic text-xl sm:text-2xl leading-tight ${category.darkText ? "text-foreground" : "text-white"}`}>
                            Free discreet shipping on orders over €50 📦
                          </p>
                          <p className={`font-serif italic text-sm mt-1 ${category.darkText ? "text-foreground/60" : "text-white/70"}`}>
                            Plain packaging. No logos. Your secret is safe with us.
                          </p>
                        </div>
                        <Link
                          to="/products"
                          className="relative z-[2] cta-primary no-underline whitespace-nowrap px-6 py-2.5 text-sm shrink-0"
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

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

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
                    <div className="p-4 pb-4">
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
