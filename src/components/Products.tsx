import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useDisplayedProducts } from "@/stores/displayedProducts";
import ShopifyProductCard from "./ShopifyProductCard";

const BEST_SELLERS_QUERY = "inventory_total:>100";

const Products = () => {
  // Fetch a larger pool so we can drop products already shown above.
  const { products: pool, loading } = useShopifyProducts(BEST_SELLERS_QUERY, 24);
  const displayedIds = useDisplayedProducts((s) => s.ids);
  const products = useMemo(
    () => pool.filter((p) => !displayedIds.has(p.node.id)).slice(0, 8),
    [pool, displayedIds]
  );

  return (
    <div id="best-sellers" className="bg-dark border-t-[5px] border-dark border-b-[5px] border-b-dark px-6 lg:px-12 py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto">
        <p className="section-kicker text-accent mb-2.5">The Goods</p>
        <h2
          className="font-display font-black italic text-cream leading-none mb-14"
          style={{ fontSize: "clamp(2.2rem,3.5vw,3.5rem)" }}
        >
          Our Best Kept Secrets.
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-cream/5 border-[3px] border-cream/10 rounded-sm animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="font-display italic text-cream/60">No live products available right now.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ShopifyProductCard key={p.node.id} product={p} variant="marquee" />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="cta-secondary no-underline"
            style={{ borderColor: "rgba(255,255,255,.2)", boxShadow: "4px 4px 0 rgba(255,255,255,.1)" }}
          >
            View all products →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
