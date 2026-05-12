import { useMemo } from "react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { groupSimilarProducts } from "@/lib/groupProducts";
import ShopifyProductCard from "./ShopifyProductCard";

interface Props {
  query: string;
  count?: number;
  title: string;
  kicker?: string;
  emoji?: string;
}

const ShopifyProductsSection = ({ query, count = 8, title, kicker, emoji }: Props) => {
  // Fetch a larger pool so grouping doesn't leave us with too few cards.
  const { products: pool, loading, error } = useShopifyProducts(query, Math.max(count * 2, 24));
  const products = useMemo(() => groupSimilarProducts(pool).slice(0, count), [pool, count]);

  if (error) return null;

  return (
    <section className="bg-parch paper-bg border-y-[3px] border-dark px-6 lg:px-12 py-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            {kicker && <p className="section-kicker text-primary mb-2">{kicker}</p>}
            <h2
              className="font-display font-black italic text-foreground leading-none"
              style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)" }}
            >
              {emoji && <span className="mr-2">{emoji}</span>}
              {title}
            </h2>
          </div>
          <span className="font-display italic text-sm text-muted-foreground">
            Live from our shop · {products.length} item{products.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="h-[420px] bg-cream border-[3px] border-dark rounded-sm animate-pulse"
                style={{ boxShadow: "var(--shadow-brutal)" }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="font-display italic text-muted-foreground">
            No live products match this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((g) => (
              <ShopifyProductCard
                key={g.product.node.id}
                product={g.product}
                sticker={g.groupSize > 1 ? `+${g.groupSize} variants` : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopifyProductsSection;
