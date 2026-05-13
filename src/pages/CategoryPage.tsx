import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Truck, Loader2, SlidersHorizontal } from "lucide-react";
import { getCategoryBySlug, categories } from "@/data/products";
import { getCategoryBanners } from "@/data/categoryBanners";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CategoryHeroBanner from "@/components/CategoryHeroBanner";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import FilterDrawer from "@/components/filters/FilterDrawer";
import SortDropdown from "@/components/filters/SortDropdown";
import ActiveFiltersChips from "@/components/filters/ActiveFiltersChips";
import { useFiltersAndSort } from "@/hooks/useFiltersAndSort";
import { useSectionFull, isCatchAllSection } from "@/lib/productSections";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";
import { useAllShopifyProducts } from "@/hooks/useAllShopifyProducts";
import { dedupeProducts } from "@/lib/productGroups";
import { useShopifyCart } from "@/stores/shopifyCart";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify";

const PAGE_SIZE = 24;

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const isCatchAll = isCatchAllSection(categorySlug || "");
  const { section, listing_handles, loading: sectionLoading } = useSectionFull(categorySlug);

  // Filters (only used in curated flow)
  const filters = useFiltersAndSort({
    sourceHandles: listing_handles,
    forcedCategory: categorySlug,
  });
  const { filteredHandles, state, activeCount, setSort, ...filterRest } = filters;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Curated handles flow (default)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredHandles]);

  const visibleHandles = useMemo(
    () => filteredHandles.slice(0, visibleCount),
    [filteredHandles, visibleCount]
  );
  const handlesQuery = useShopifyProductsByHandles(isCatchAll ? [] : visibleHandles);

  // Catch-all (whole catalog) flow — used by "oops"
  const allQuery = useAllShopifyProducts(PAGE_SIZE);

  const products = isCatchAll ? allQuery.products : handlesQuery.products;
  const productsLoading = isCatchAll ? allQuery.loading : handlesQuery.loading;
  const loadingMore = isCatchAll ? allQuery.loadingMore : handlesQuery.loading;
  const hasMore = isCatchAll
    ? allQuery.hasMore
    : visibleCount < filteredHandles.length;
  const onLoadMore = () => {
    if (isCatchAll) allQuery.loadMore();
    else setVisibleCount((c) => c + PAGE_SIZE);
  };
  const deduped = useMemo(() => dedupeProducts(products), [products]);
  const totalLabel = isCatchAll
    ? `${deduped.length}+`
    : `${deduped.length} of ${filteredHandles.length.toLocaleString()}`;

  const addItem = useShopifyCart((s) => s.addItem);
  const setCartOpen = useShopifyCart((s) => s.setIsOpen);
  const handleAdd = async (p: ShopifyProduct) => {
    const variant = p.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: p,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setCartOpen(true);
    toast.success(`${p.node.title} added to bag ✨`);
  };

  if (!category || !section) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch paper-bg">
          <div className="text-center">
            <span className="text-6xl block mb-4">🤷</span>
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">
              Category Not Found
            </h1>
            <p className="font-serif italic text-muted-foreground mb-6">
              This secret doesn't exist... yet.
            </p>
            <Link to="/" className="cta-primary inline-block no-underline px-8 py-3">
              Back to Home →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const initialLoading = (!isCatchAll && sectionLoading) || (productsLoading && deduped.length === 0);

  return (
    <>
      <SEOHead
        title={`${category.name} — ${section.description}`}
        description={`${section.subtitle}. ${section.total_in_listing} ${section.description.toLowerCase()} at OoohMy. Discreet shipping.`}
      />
      <AnnounceBanner />
      <Navbar />

      {/* Hero Banner */}
      {getCategoryBanners(categorySlug || "").length > 0 ? (
        <CategoryHeroBanner
          slides={getCategoryBanners(categorySlug || "")}
          categoryName={category.name}
          categoryEmoji={category.emoji}
          categoryCollection={section.subtitle}
          categoryDesc={section.description}
          productCount={section.total_in_listing}
          darkText={category.darkText}
        />
      ) : (
        <div className={`${category.color} border-b-[5px] border-dark relative overflow-hidden`}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,.1) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-[2]">
            <span className="text-6xl block mb-4">{category.emoji}</span>
            <h1
              className={`font-display font-black italic leading-none mb-2 ${
                category.darkText ? "text-foreground" : "text-white"
              }`}
              style={{
                fontSize: "clamp(3rem,5vw,5rem)",
                textShadow: category.darkText ? "none" : "3px 3px 0 rgba(0,0,0,.2)",
              }}
            >
              {category.name}.
            </h1>
            <p
              className={`font-display italic text-lg mb-1 ${
                category.darkText ? "text-foreground/60" : "text-white/70"
              }`}
            >
              {section.subtitle}
            </p>
            <p
              className={`text-xs tracking-[3px] uppercase font-bold ${
                category.darkText ? "text-foreground/40" : "text-white/40"
              }`}
            >
              {section.description} · {section.total_in_listing.toLocaleString()} items
            </p>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">
            Home
          </Link>
          <span>›</span>
          <span className="text-foreground font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Category quick nav */}
      <div className="bg-parch paper-bg px-6 lg:px-12 pt-8">
        <div className="max-w-[1440px] mx-auto flex flex-wrap gap-2">
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
      </div>

      {/* Free shipping promo */}
      <div className="bg-parch paper-bg px-6 lg:px-12 pt-6">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-primary/90 to-primary border-[3px] border-dark rounded-sm overflow-hidden shadow-[4px_4px_0_hsl(var(--dark))]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-black italic text-white text-lg leading-tight">
                  Free Discreet Shipping
                </h3>
                <p className="font-serif italic text-white/70 text-sm">
                  On all orders over €50 · Plain packaging guaranteed
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 bg-white text-dark border-[3px] border-dark rounded-sm no-underline px-6 py-2.5 text-sm font-display italic font-black shrink-0 shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_hsl(var(--dark))] transition-all"
            >
              Shop All →
            </Link>
          </div>
        </div>
      </div>

      {/* Curated Shopify products */}
      <section className="bg-parch paper-bg border-y-[3px] border-dark mt-8 px-4 lg:px-12 py-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="section-kicker text-primary mb-2">Straight from the shop</p>
              <h2
                className="font-display font-black italic text-foreground leading-none"
                style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)" }}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name} picks
              </h2>
            </div>
            <span className="font-display italic text-sm text-muted-foreground">
              Showing {totalLabel}
            </span>
          </div>

          {/* Mobile filter/sort bar (hidden in catch-all) */}
          {!isCatchAll && (
            <div className="flex lg:hidden items-center justify-between mb-4 gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="cta-secondary inline-flex items-center gap-2 px-4 py-2.5 text-xs"
              >
                <SlidersHorizontal size={14} />
                Filter{activeCount > 0 && ` (${activeCount})`}
              </button>
              <SortDropdown sort={state.sort} setSort={setSort} />
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            {!isCatchAll && (
              <div className="hidden lg:block">
                <FilterSidebar
                  state={state}
                  activeCount={activeCount}
                  resultCount={filteredHandles.length}
                  forcedCategory={categorySlug}
                  {...filterRest}
                />
              </div>
            )}

            {/* Mobile drawer */}
            {!isCatchAll && (
              <FilterDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                state={state}
                activeCount={activeCount}
                resultCount={filteredHandles.length}
                forcedCategory={categorySlug}
                {...filterRest}
              />
            )}

            <div className="flex-1 min-w-0">
              {!isCatchAll && (
                <>
                  <div className="hidden lg:flex items-center justify-end mb-4">
                    <SortDropdown sort={state.sort} setSort={setSort} />
                  </div>
                  <ActiveFiltersChips
                    state={state}
                    forcedCategory={categorySlug}
                    {...filterRest}
                  />
                </>
              )}

              {initialLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[420px] bg-cream border-[3px] border-dark rounded-sm animate-pulse"
                      style={{ boxShadow: "var(--shadow-brutal)" }}
                    />
                  ))}
                </div>
              ) : deduped.length === 0 ? (
                <p className="font-display italic text-muted-foreground">
                  No live products match these filters.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {deduped.map((p) => (
                      <ProductCard key={p.node.id} product={p} onAdd={handleAdd} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="text-center mt-10">
                      <button
                        type="button"
                        onClick={onLoadMore}
                        disabled={loadingMore}
                        className="cta-secondary inline-flex items-center gap-2"
                      >
                        {loadingMore ? <Loader2 size={16} className="animate-spin" /> : null}
                        Load more →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CategoryPage;
