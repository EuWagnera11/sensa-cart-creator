import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCrossSell } from "@/hooks/useCrossSell";
import { useShopifyProductsByHandles } from "@/hooks/useShopifyProductsByHandles";

interface Props {
  currentHandle: string;
}

const CrossSell = ({ currentHandle }: Props) => {
  const { sameVendor, sameCategory } = useCrossSell(currentHandle, 8);

  return (
    <div className="space-y-12 mt-12 border-t-[3px] border-dark pt-10">
      {sameVendor.length > 0 && (
        <CarouselSection
          eyebrow="More from this brand"
          title="You may also like"
          handles={sameVendor}
        />
      )}

      {sameCategory.length > 0 && (
        <CarouselSection
          eyebrow="Often bought together"
          title="In the same vibe"
          handles={sameCategory}
        />
      )}
    </div>
  );
};

const CarouselSection = ({
  eyebrow,
  title,
  handles,
}: {
  eyebrow: string;
  title: string;
  handles: string[];
}) => {
  const { products, loading } = useShopifyProductsByHandles(handles);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Track scroll position to enable/disable arrow buttons
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

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by 2 cards (~440px) — feels like Amazon/Zalando
    el.scrollBy({ left: direction * 440, behavior: "smooth" });
  };

  if (loading && products.length === 0) {
    return (
      <section>
        <div className="mb-5">
          <p className="font-display italic font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {eyebrow}
          </p>
          <h2 className="font-display font-black italic text-foreground text-2xl leading-tight">{title}</h2>
        </div>
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="font-display italic font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {eyebrow}
          </p>
          <h2 className="font-display font-black italic text-foreground text-2xl leading-tight">
            {title}
          </h2>
        </div>

        {/* Arrow controls (desktop) */}
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

      {/* Scroller with hidden scrollbar — swipe & arrows still work */}
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {products.map((p) => (
          <MiniProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
};

const MiniProductCard = ({ product }: { product: any }) => {
  const node = product.node;
  const img = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const currency = price.currencyCode === "EUR" ? "€" : `${price.currencyCode} `;

  return (
    <Link
      to={`/shop/product/${node.handle}`}
      className="group shrink-0 snap-start w-[180px] sm:w-[200px] no-underline"
    >
      <div className="bg-cream border-[2px] border-dark/15 rounded-sm overflow-hidden transition-all duration-200 group-hover:border-dark group-hover:translate-y-[-2px] group-hover:shadow-[4px_4px_0_hsl(var(--dark))]">
        <div className="aspect-square bg-parch overflow-hidden">
          {img ? (
            <img
              src={shopifyImg(img.url, 200)}
              alt={img.altText || node.title}
              loading="eager"
              decoding="async"
              width={200}
              height={200}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
          )}
        </div>
        <div className="px-3 py-2.5">
          <p className="font-serif text-xs text-foreground line-clamp-2 leading-snug min-h-[2.2em] mb-1 group-hover:text-primary transition-colors">
            {node.title}
          </p>
          <p className="font-display font-black text-sm text-foreground tabular-nums">
            {currency}
            {parseFloat(price.amount).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CrossSell;
