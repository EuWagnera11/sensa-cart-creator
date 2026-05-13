import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";

interface Props {
  currentHandle: string;
}

const RecentlyViewed = ({ currentHandle }: Props) => {
  const { handles } = useRecentlyViewed(currentHandle);
  const { products, loading } = useShopifyProductsByHandles(handles.slice(0, 8));
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [products.length]);

  if (handles.length === 0 || (!loading && products.length === 0)) return null;

  const scrollByCards = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="border-t-[3px] border-dark pt-10 mt-12">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="font-display italic font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1 inline-flex items-center gap-1.5">
            <Clock size={11} />
            Just browsed
          </p>
          <h2 className="font-display font-black italic text-foreground text-2xl leading-tight">
            Recently viewed
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-9 h-9 inline-flex items-center justify-center border-[2px] border-dark rounded-sm bg-cream hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cream"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-9 h-9 inline-flex items-center justify-center border-[2px] border-dark rounded-sm bg-cream hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cream"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {products.map((p) => {
          const node = p.node;
          const img = node.images?.edges?.[0]?.node;
          const price = node.priceRange.minVariantPrice;
          const currency = price.currencyCode === "EUR" ? "€" : `${price.currencyCode} `;
          return (
            <Link
              key={node.id}
              to={`/shop/product/${node.handle}`}
              className="group shrink-0 snap-start w-[150px] no-underline"
            >
              <div className="bg-cream border-[2px] border-dark/15 rounded-sm overflow-hidden transition-all duration-200 group-hover:border-dark group-hover:translate-y-[-2px] group-hover:shadow-[3px_3px_0_hsl(var(--dark))]">
                <div className="aspect-square bg-parch overflow-hidden">
                  {img ? (
                    <img
                      src={img.url}
                      alt={img.altText || node.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                  )}
                </div>
                <div className="px-2.5 py-2">
                  <p className="font-serif text-[11px] text-foreground line-clamp-2 leading-snug min-h-[2em] mb-1 group-hover:text-primary transition-colors">
                    {node.title}
                  </p>
                  <p className="font-display font-black text-xs text-foreground tabular-nums">
                    {currency}
                    {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RecentlyViewed;
