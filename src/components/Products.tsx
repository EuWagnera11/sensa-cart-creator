import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { useDisplayedProducts } from "@/stores/displayedProducts";
import ShopifyProductCard from "./ShopifyProductCard";

const Products = () => {
  // Pull 12 from curated "the_goods" pool, then drop ones already shown
  // by other sections (e.g. NewArrivals) and trim to 8.
  const { products: pool, loading } = useFeaturedProducts("goods", 12);
  const displayedIds = useDisplayedProducts((s) => s.ids);
  const products = useMemo(() => {
    return pool.filter((p) => !displayedIds.has(p.node.id)).slice(0, 8);
  }, [pool, displayedIds]);

  return (
    <div
      id="best-sellers"
      className="bg-dark border-t-[5px] border-dark border-b-[5px] border-b-dark px-6 lg:px-12 py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto">
        <p className="section-kicker text-accent mb-2.5">The Goods</p>
        <h2
          className="font-display font-black italic text-cream leading-none mb-14"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Our Best Kept Secrets.
        </h2>

        {loading && products.length === 0 ? (
          <div className="text-center text-cream/60 font-serif italic py-12">
            Loading the goods…
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-cream/60 font-serif italic py-12">
            More secrets coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {products.map((p) => (
              <ShopifyProductCard key={p.node.id} product={p} variant="grid" />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="cta-primary inline-block no-underline px-8 py-3.5"
          >
            View all →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
