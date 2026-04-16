import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";

import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useCart } from "@/context/CartContext";
import { categories, products } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const primaryCategorySlugs = ["buzz", "duo", "slippery", "tied", "newbie", "oops"];
const primaryCategorySet = new Set(primaryCategorySlugs);
const primaryCategories = categories.filter((c) => primaryCategorySet.has(c.slug));
const allProducts = products.filter((p) => primaryCategorySet.has(p.categorySlug));
const categoryMap = new Map(primaryCategories.map((c) => [c.slug, c]));

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
  { label: "Newest", value: "newest" },
];

const normalise = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const AllProductsPage = () => {
  const { addItem, setIsOpen } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Text search
    if (query.length >= 2) {
      const q = normalise(query);
      result = result.filter(
        (p) =>
          normalise(p.name).includes(q) ||
          normalise(p.category).includes(q) ||
          normalise(p.description).includes(q) ||
          normalise(p.longDescription).includes(q)
      );
    }

    // Category filter
    if (selectedCategories.size > 0) {
      result = result.filter((p) => selectedCategories.has(p.categorySlug));
    }

    // Price filter
    const range = PRICE_RANGES[priceRange];
    if (range.max !== Infinity || range.min !== 0) {
      result = result.filter((p) => p.price >= range.min && p.price < (range.max === Infinity ? 99999 : range.max));
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
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
      case "newest":
        result.reverse();
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [query, selectedCategories, priceRange, minRating, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedCategories(new Set());
    setPriceRange(0);
    setMinRating(0);
    setSortBy("popular");
    setSearchParams({});
  };

  const hasFilters = query.length > 0 || selectedCategories.size > 0 || priceRange > 0 || minRating > 0;

  const handleBuy = (productId: string) => {
    const product = allProducts.find((item) => item.id === productId);
    if (!product) return;
    addItem(product, 1);
    setIsOpen(true);
    toast.success(`${product.name} added to bag ✨`);
  };

  return (
    <>
      <SEOHead title="All Products" description="Browse our full collection of vibrators, lubes, bondage gear & more. Discreet shipping, zero judgement." />
      <AnnounceBanner />
      <Navbar />

      {/* Hero */}
      <section className="bg-dark border-b-[5px] border-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--accent) / 0.18) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 relative z-[1]">
          <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm mb-6 no-underline text-cream/70 hover:text-cream transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <p className="section-kicker text-accent mb-3">Full Catalogue</p>
          <h1 className="font-display font-black italic text-cream leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            All Products.
          </h1>

          {/* Search bar */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-10 py-3.5 bg-cream border-[3px] border-dark rounded-sm font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-cream border-b-[3px] border-dark sticky top-[66px] z-[50]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border-[3px] border-dark rounded-sm font-display italic text-sm font-bold bg-cream shadow-[3px_3px_0_hsl(var(--dark))] transition-all"
              >
                <SlidersHorizontal size={14} /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
              </button>

              {/* Desktop: Category chips */}
              <div className="hidden lg:flex items-center gap-2 flex-wrap">
                {primaryCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => toggleCategory(cat.slug)}
                    className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all ${
                      selectedCategories.has(cat.slug)
                        ? "bg-dark text-cream shadow-none translate-x-0 translate-y-0"
                        : "bg-cream text-foreground shadow-[2px_2px_0_hsl(var(--dark))] hover:bg-accent"
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Price range */}
              <div className="hidden lg:block relative group">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold bg-cream shadow-[2px_2px_0_hsl(var(--dark))]">
                  {PRICE_RANGES[priceRange].label} <ChevronDown size={12} />
                </button>
                <div className="absolute right-0 top-full mt-1 bg-cream border-[3px] border-dark rounded-sm shadow-[4px_4px_0_hsl(var(--dark))] hidden group-hover:block z-10 min-w-[160px]">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => setPriceRange(i)}
                      className={`block w-full text-left px-4 py-2 font-serif text-sm hover:bg-dark/5 transition-colors ${priceRange === i ? "font-bold text-primary" : ""}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating filter */}
              <div className="hidden lg:flex items-center gap-1">
                {[0, 4, 4.5, 4.7].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`px-2 py-1 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all ${
                      minRating === r ? "bg-dark text-cream" : "bg-cream text-foreground shadow-[2px_2px_0_hsl(var(--dark))]"
                    }`}
                  >
                    {r === 0 ? "All" : `${r}★+`}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold bg-cream shadow-[2px_2px_0_hsl(var(--dark))] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {hasFilters && (
                <button onClick={clearFilters} className="text-primary font-display italic text-xs font-bold hover:underline">
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Mobile filters panel */}
          {filtersOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t-2 border-dark/10 space-y-4 pb-2">
              <div>
                <p className="font-display italic text-xs font-bold mb-2 text-muted-foreground">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {primaryCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => toggleCategory(cat.slug)}
                      className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all ${
                        selectedCategories.has(cat.slug) ? "bg-dark text-cream" : "bg-cream text-foreground shadow-[2px_2px_0_hsl(var(--dark))]"
                      }`}
                    >
                      {cat.emoji} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-display italic text-xs font-bold mb-2 text-muted-foreground">Price</p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => setPriceRange(i)}
                      className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all ${
                        priceRange === i ? "bg-dark text-cream" : "bg-cream text-foreground shadow-[2px_2px_0_hsl(var(--dark))]"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-display italic text-xs font-bold mb-2 text-muted-foreground">Min. Rating</p>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 4.7].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 border-[2px] border-dark rounded-sm font-display italic text-xs font-bold transition-all ${
                        minRating === r ? "bg-dark text-cream" : "bg-cream text-foreground shadow-[2px_2px_0_hsl(var(--dark))]"
                      }`}
                    >
                      {r === 0 ? "All" : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="bg-parch paper-bg px-6 lg:px-12 pt-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <p className="font-serif italic text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"} found
            {query && <span> for "<strong className="text-foreground">{query}</strong>"</span>}
          </p>
        </div>
      </div>

      {/* Product grid */}
      <section className="bg-parch paper-bg px-6 lg:px-12 py-8 pb-16">
        <div className="max-w-[1440px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🔍</span>
              <h2 className="font-display font-black italic text-2xl text-foreground mb-2">No products found</h2>
              <p className="font-serif italic text-muted-foreground mb-6">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="cta-primary inline-block px-8 py-3">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => {
                const category = categoryMap.get(product.categorySlug);
                const img = getProductImage(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-cream border-[3px] border-dark rounded-sm overflow-hidden transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] group"
                  >
                    <Link to={`/category/${product.categorySlug}/product/${product.slug}`} className="block no-underline">
                      <div className={`${category?.color ?? "bg-parch"} border-b-[3px] border-dark h-48 flex items-center justify-center relative overflow-hidden`}>
                        {img ? (
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <span className="text-6xl">{product.emoji}</span>
                        )}
                        {product.sticker && (
                          <span className="absolute top-2 right-2 bg-accent text-foreground font-display italic font-bold text-[0.6rem] px-2.5 py-0.5 border-2 border-dark rounded-full shadow-[2px_2px_0_hsl(var(--dark))]" style={{ transform: "rotate(2deg)" }}>
                            {product.sticker}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="font-display italic text-[0.65rem] text-muted-foreground mb-1 uppercase tracking-wider">
                          {product.category}
                        </div>
                        <h2 className="font-display font-black italic text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h2>
                        <p className="font-serif italic text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{product.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-xl text-primary">€{product.price}</span>
                            {product.originalPrice && (
                              <span className="font-serif italic text-xs text-muted-foreground line-through">€{product.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="text-accent">★</span> {product.rating}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      <button type="button" className="cta-primary w-full text-xs px-3 py-2.5" onClick={() => handleBuy(product.id)}>
                        Buy now
                      </button>
                      <Link to={`/category/${product.categorySlug}/product/${product.slug}`} className="cta-secondary w-full text-xs px-3 py-2.5 no-underline text-center">
                        Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AllProductsPage;
