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
import { ArrowLeft, SlidersHorizontal, ChevronDown, ChevronUp, X, Star, Truck, Shield, Tag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under €30", min: 0, max: 30 },
  { label: "€30 – €60", min: 30, max: 60 },
  { label: "€60 – €100", min: 60, max: 100 },
  { label: "€100+", min: 100, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

const PROMO_MESSAGES: Record<string, { text: string; bg: string }> = {
  buzz: { text: "🔥 Free Discreet Pouch on orders over €60 in Buzz!", bg: "bg-primary" },
  duo: { text: "💕 Valentine Special — 15% off all Duo products! Code: DUO15", bg: "bg-cat-duo" },
  slippery: { text: "✨ Buy 2 Get 1 Free on all Gels & Lubes!", bg: "bg-cat-slippery" },
  tied: { text: "🖤 New Arrivals in Bondage — Free Shipping on €80+", bg: "bg-cat-tied" },
  newbie: { text: "🗝️ First time? Free starter guide with every Newbie kit!", bg: "bg-cat-newbie" },
  oops: { text: "🏷️ Clearance Sale — Up to 52% Off! While stocks last.", bg: "bg-primary" },
};

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const categoryProducts = getProductsByCategory(categorySlug || "");
  const { addItem, setIsOpen } = useCart();

  // Filters
  const [priceRange, setPriceRange] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({ price: true, rating: true, shipping: true });

  const filtered = useMemo(() => {
    let result = [...categoryProducts];

    // Price
    const range = PRICE_RANGES[priceRange];
    if (range.max !== Infinity || range.min !== 0) {
      result = result.filter((p) => p.price >= range.min && p.price < (range.max === Infinity ? 99999 : range.max));
    }

    // Rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.reverse(); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [categoryProducts, priceRange, minRating, sortBy]);

  const hasFilters = priceRange > 0 || minRating > 0;

  const clearFilters = () => {
    setPriceRange(0);
    setMinRating(0);
    setSortBy("popular");
  };

  const handleBuy = (productId: string) => {
    const product = categoryProducts.find((item) => item.id === productId);
    if (!product) return;
    addItem(product, 1);
    setIsOpen(true);
    toast.success(`${product.name} added to bag ✨`);
  };

  const toggleFilter = (key: keyof typeof expandedFilters) => {
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
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
            <Link to="/" className="cta-primary inline-block no-underline px-8 py-3">Back to Home →</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const promo = PROMO_MESSAGES[categorySlug || ""];

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

      {/* Promo Banner */}
      {promo && (
        <div className={`${promo.bg} border-b-[3px] border-dark`}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3 text-center">
            <p className="font-display italic font-bold text-sm text-white tracking-wide" style={{ textShadow: "1px 1px 0 rgba(0,0,0,.2)" }}>
              {promo.text}
            </p>
          </div>
        </div>
      )}

      {/* Breadcrumb + Sort Bar */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3 sticky top-[66px] z-[50]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">Home</Link>
              <span>›</span>
              <span className="text-foreground font-semibold">{category.name}</span>
            </div>
            <span className="hidden sm:inline text-xs text-muted-foreground font-serif italic">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold bg-cream shadow-[2px_2px_0_hsl(var(--dark))]"
            >
              <SlidersHorizontal size={14} /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
            </button>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-display italic font-bold text-muted-foreground">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold bg-cream shadow-[2px_2px_0_hsl(var(--dark))] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Display count */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-display italic font-bold text-muted-foreground">Show:</span>
              <span className="px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold bg-cream shadow-[2px_2px_0_hsl(var(--dark))]">
                All
              </span>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="text-primary font-display italic text-xs font-bold hover:underline">
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="bg-parch paper-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-[240px] shrink-0">
              <div className="sticky top-[130px] space-y-5">
                {/* Categories */}
                <div className="bg-cream border-[3px] border-dark rounded-sm overflow-hidden" style={{ boxShadow: "var(--shadow-brutal)" }}>
                  <div className="bg-dark px-4 py-2.5">
                    <h3 className="font-display italic font-bold text-sm text-cream">Categories</h3>
                  </div>
                  <div className="p-3 space-y-1">
                    {categories.filter(c => ["buzz", "duo", "slippery", "tied", "newbie", "oops"].includes(c.slug)).map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-serif italic transition-all no-underline ${
                          cat.slug === categorySlug
                            ? "bg-primary/10 text-primary font-bold border-l-[3px] border-primary"
                            : "text-foreground/70 hover:bg-dark/5 hover:text-foreground"
                        }`}
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.name}</span>
                        <span className="ml-auto text-[0.65rem] text-muted-foreground">{getProductsByCategory(cat.slug).length}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-cream border-[3px] border-dark rounded-sm overflow-hidden" style={{ boxShadow: "var(--shadow-brutal)" }}>
                  <button onClick={() => toggleFilter("price")} className="w-full flex items-center justify-between px-4 py-2.5 bg-dark">
                    <h3 className="font-display italic font-bold text-sm text-cream">Price</h3>
                    {expandedFilters.price ? <ChevronUp size={14} className="text-cream" /> : <ChevronDown size={14} className="text-cream" />}
                  </button>
                  {expandedFilters.price && (
                    <div className="p-3 space-y-1">
                      {PRICE_RANGES.map((range, i) => (
                        <button
                          key={i}
                          onClick={() => setPriceRange(i)}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-sm text-sm font-serif italic transition-all text-left ${
                            priceRange === i
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-foreground/70 hover:bg-dark/5"
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${priceRange === i ? "border-primary bg-primary" : "border-dark/30"}`}>
                            {priceRange === i && <span className="w-1.5 h-1.5 bg-cream rounded-[1px]" />}
                          </span>
                          {range.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rating Filter */}
                <div className="bg-cream border-[3px] border-dark rounded-sm overflow-hidden" style={{ boxShadow: "var(--shadow-brutal)" }}>
                  <button onClick={() => toggleFilter("rating")} className="w-full flex items-center justify-between px-4 py-2.5 bg-dark">
                    <h3 className="font-display italic font-bold text-sm text-cream">Rating</h3>
                    {expandedFilters.rating ? <ChevronUp size={14} className="text-cream" /> : <ChevronDown size={14} className="text-cream" />}
                  </button>
                  {expandedFilters.rating && (
                    <div className="p-3 space-y-1">
                      {[0, 4, 4.5, 4.7].map((r) => (
                        <button
                          key={r}
                          onClick={() => setMinRating(r)}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-sm text-sm transition-all text-left ${
                            minRating === r ? "bg-primary/10 font-bold" : "hover:bg-dark/5"
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${minRating === r ? "border-primary bg-primary" : "border-dark/30"}`}>
                            {minRating === r && <span className="w-1.5 h-1.5 bg-cream rounded-[1px]" />}
                          </span>
                          {r === 0 ? (
                            <span className="font-serif italic text-foreground/70">All ratings</span>
                          ) : (
                            <span className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={i < Math.floor(r) ? "fill-accent text-accent" : "text-muted-foreground/30"} />
                              ))}
                              <span className="font-serif italic text-xs text-muted-foreground ml-1">{r}+</span>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Shipping Info */}
                <div className="bg-cream border-[3px] border-dark rounded-sm overflow-hidden" style={{ boxShadow: "var(--shadow-brutal)" }}>
                  <button onClick={() => toggleFilter("shipping")} className="w-full flex items-center justify-between px-4 py-2.5 bg-dark">
                    <h3 className="font-display italic font-bold text-sm text-cream">Shipping</h3>
                    {expandedFilters.shipping ? <ChevronUp size={14} className="text-cream" /> : <ChevronDown size={14} className="text-cream" />}
                  </button>
                  {expandedFilters.shipping && (
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-2 px-3 py-2 text-sm font-serif italic text-foreground/70">
                        <Truck size={14} className="text-primary" />
                        Free over €50
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 text-sm font-serif italic text-foreground/70">
                        <Shield size={14} className="text-primary" />
                        Discreet packaging
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 text-sm font-serif italic text-foreground/70">
                        <Tag size={14} className="text-primary" />
                        30-day returns
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-[100] lg:hidden">
                <div className="absolute inset-0 bg-dark/50" onClick={() => setSidebarOpen(false)} />
                <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-cream overflow-y-auto">
                  <div className="flex items-center justify-between p-4 border-b-[3px] border-dark bg-dark">
                    <h3 className="font-display italic font-bold text-lg text-cream">Filters</h3>
                    <button onClick={() => setSidebarOpen(false)} className="text-cream"><X size={20} /></button>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Categories */}
                    <div>
                      <p className="font-display italic font-bold text-sm text-foreground mb-2">Categories</p>
                      <div className="space-y-1">
                        {categories.filter(c => ["buzz", "duo", "slippery", "tied", "newbie", "oops"].includes(c.slug)).map((cat) => (
                          <Link
                            key={cat.slug}
                            to={`/category/${cat.slug}`}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-serif italic transition-all no-underline ${
                              cat.slug === categorySlug
                                ? "bg-primary/10 text-primary font-bold"
                                : "text-foreground/70 hover:bg-dark/5"
                            }`}
                          >
                            {cat.emoji} {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Price */}
                    <div>
                      <p className="font-display italic font-bold text-sm text-foreground mb-2">Price</p>
                      <div className="space-y-1">
                        {PRICE_RANGES.map((range, i) => (
                          <button
                            key={i}
                            onClick={() => setPriceRange(i)}
                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-sm text-sm font-serif italic text-left ${
                              priceRange === i ? "bg-primary/10 text-primary font-bold" : "text-foreground/70"
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${priceRange === i ? "border-primary bg-primary" : "border-dark/30"}`}>
                              {priceRange === i && <span className="w-1.5 h-1.5 bg-cream rounded-[1px]" />}
                            </span>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Rating */}
                    <div>
                      <p className="font-display italic font-bold text-sm text-foreground mb-2">Rating</p>
                      <div className="space-y-1">
                        {[0, 4, 4.5, 4.7].map((r) => (
                          <button
                            key={r}
                            onClick={() => setMinRating(r)}
                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-sm text-sm text-left ${
                              minRating === r ? "bg-primary/10 font-bold" : ""
                            }`}
                          >
                            {r === 0 ? "All" : `${r}★+`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => { clearFilters(); setSidebarOpen(false); }} className="cta-primary w-full text-sm py-3 mt-4">
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Category quick nav */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.filter(c => ["buzz", "duo", "slippery", "tied", "newbie", "oops"].includes(c.slug)).map((cat) => (
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

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-5xl block mb-4">🔜</span>
                  <p className="font-display italic text-xl text-muted-foreground">No products match your filters.</p>
                  <button onClick={clearFilters} className="cta-primary mt-4 px-6 py-2.5 text-sm">Clear Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product) => {
                    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                    const freeShipping = product.price >= 50;

                    return (
                      <div
                        key={product.id}
                        className="group relative bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0_hsl(var(--dark))] hover:z-[2]"
                        style={{ boxShadow: "var(--shadow-brutal)" }}
                      >
                        {/* Image */}
                        <Link to={`/category/${categorySlug}/product/${product.slug}`} className="block no-underline relative">
                          <div className="relative aspect-square overflow-hidden bg-surface">
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
                                <span className="text-7xl">{product.emoji}</span>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Badges - top left */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                              {discount > 0 && (
                                <span className="bg-primary text-white font-display italic font-bold text-[0.65rem] px-2.5 py-1 border-2 border-dark rounded-sm shadow-[2px_2px_0_hsl(var(--dark))]">
                                  -{discount}%
                                </span>
                              )}
                              {freeShipping && (
                                <span className="bg-accent text-foreground font-display italic font-bold text-[0.6rem] px-2 py-0.5 border-2 border-dark rounded-sm shadow-[1px_1px_0_hsl(var(--dark))] flex items-center gap-1">
                                  <Truck size={10} /> Free Ship
                                </span>
                              )}
                              {product.rating >= 4.8 && (
                                <span className="bg-dark text-cream font-display italic font-bold text-[0.6rem] px-2 py-0.5 border-2 border-dark rounded-sm shadow-[1px_1px_0_hsl(var(--dark))]">
                                  ⭐ Top Rated
                                </span>
                              )}
                            </div>

                            {/* Sticker badge - top right */}
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

                        {/* Info */}
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
                              Buy now
                            </button>
                            <Link to={`/category/${categorySlug}/product/${product.slug}`} className="cta-secondary w-full text-[0.82rem] px-4 py-2.5 no-underline text-center">
                              Learn more
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;
