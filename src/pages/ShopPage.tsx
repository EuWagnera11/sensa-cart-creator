import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import FilterSidebar from "@/components/filters/FilterSidebar";
import FilterDrawer from "@/components/filters/FilterDrawer";
import SortDropdown from "@/components/filters/SortDropdown";
import ActiveFiltersChips from "@/components/filters/ActiveFiltersChips";
import { ALL_LISTING_HANDLES } from "@/lib/productGroups";
import { useFiltersAndSort } from "@/hooks/useFiltersAndSort";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";
import { useShopifyCart } from "@/stores/shopifyCart";
import type { ShopifyProduct } from "@/lib/shopify";

const PAGE_SIZE = 24;

const ShopPage = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = useFiltersAndSort({ sourceHandles: ALL_LISTING_HANDLES });
  const { filteredHandles, state, activeCount, setSort, ...rest } = filters;

  // Reset pagination when filter set changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredHandles]);

  const visibleHandles = useMemo(
    () => filteredHandles.slice(0, visibleCount),
    [filteredHandles, visibleCount]
  );
  const { products, loading } = useShopifyProductsByHandles(visibleHandles);
  const hasMore = visibleCount < filteredHandles.length;

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

  return (
    <>
      <SEOHead title="Shop · OoohMy" description="Browse the full OoohMy catalogue. Discreet shipping, zero judgement." />
      <AnnounceBanner />
      <Navbar />

      {/* Hero */}
      <section className="bg-dark border-b-[5px] border-primary relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, hsl(var(--accent) / 0.18) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 relative z-[1]">
          <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm mb-6 no-underline text-cream/70 hover:text-cream transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <p className="section-kicker text-accent mb-3">Live catalogue</p>
          <h1 className="font-display font-black italic text-cream leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Shop.
          </h1>
          <p className="font-serif italic text-cream/60 max-w-xl">
            {ALL_LISTING_HANDLES.length.toLocaleString()} products. Real checkout. Discreet box always.
          </p>
        </div>
      </section>

      <section className="bg-parch paper-bg px-4 lg:px-12 py-8 pb-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Mobile top bar */}
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

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                state={state}
                activeCount={activeCount}
                resultCount={filteredHandles.length}
                {...rest}
              />
            </div>

            {/* Mobile drawer */}
            <FilterDrawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              state={state}
              activeCount={activeCount}
              resultCount={filteredHandles.length}
              {...rest}
            />

            {/* Right column */}
            <div className="flex-1 min-w-0">
              <div className="hidden lg:flex items-center justify-between mb-4 gap-4">
                <p className="font-serif italic text-sm text-muted-foreground">
                  {filteredHandles.length.toLocaleString()} product{filteredHandles.length === 1 ? "" : "s"}
                </p>
                <SortDropdown sort={state.sort} setSort={setSort} />
              </div>

              <ActiveFiltersChips state={state} {...rest} />

              {loading && products.length === 0 ? (
                <div className="flex justify-center py-32">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredHandles.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-6xl block mb-4">🔍</span>
                  <h2 className="font-display font-black italic text-2xl text-foreground mb-2">No matches</h2>
                  <p className="font-serif italic text-muted-foreground">
                    Try clearing some filters to see more products.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {products.map((p) => (
                      <ProductCard key={p.node.id} product={p} onAdd={handleAdd} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="flex justify-center mt-12">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        disabled={loading}
                        className="cta-primary inline-flex items-center gap-2 disabled:opacity-60"
                      >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />} Load more
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

export default ShopPage;
