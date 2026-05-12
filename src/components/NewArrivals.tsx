import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { FRESH_PRODUCTS_QUERY } from "@/data/shopifyQueries";
import { useDisplayedProducts } from "@/stores/displayedProducts";
import ShopifyProductCard from "./ShopifyProductCard";
import banner1 from "@/assets/banners/new-arrivals-1.webp";
import banner2 from "@/assets/banners/new-arrivals-2.webp";
import banner3 from "@/assets/banners/new-arrivals-3.webp";
import mobileBanner1 from "@/assets/banners/new-arrivals-mobile-1.webp";
import mobileBanner2 from "@/assets/banners/new-arrivals-mobile-2.webp";
import mobileBanner3 from "@/assets/banners/new-arrivals-mobile-3.webp";

const banners = [banner1, banner2, banner3];
const mobileBanners = [mobileBanner1, mobileBanner2, mobileBanner3];

const STICKERS = ["New Drop ✨", "Trending 🔥", "Fan Fave 💜", "Top Rated ⭐", "Best Seller 👑", "Hot 🌶️"];

const CARD_WIDTH = 220;
const CARD_GAP = 16;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const SPEED = 40; // px per second

const NewArrivals = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  const activeBanners = isMobile ? mobileBanners : banners;

  const { products, loading } = useShopifyProducts(FRESH_PRODUCTS_QUERY, 12);

  // Banner rotation
  const nextBanner = useCallback(
    () => setCurrent((c) => (c + 1) % activeBanners.length),
    [activeBanners.length]
  );
  useEffect(() => {
    const id = setInterval(nextBanner, 4500);
    return () => clearInterval(id);
  }, [nextBanner]);

  // Marquee state
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const productsCount = Math.max(products.length, 1);
  const totalWidth = productsCount * CARD_STEP;

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isPausedRef.current) {
        offsetRef.current += SPEED * dt;
      }

      if (offsetRef.current >= totalWidth) offsetRef.current -= totalWidth;
      if (offsetRef.current < 0) offsetRef.current += totalWidth;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  const handlePrev = useCallback(() => {
    offsetRef.current -= CARD_STEP;
    if (offsetRef.current < 0) offsetRef.current += totalWidth;
  }, [totalWidth]);

  const handleNext = useCallback(() => {
    offsetRef.current += CARD_STEP;
    if (offsetRef.current >= totalWidth) offsetRef.current -= totalWidth;
  }, [totalWidth]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // Triplicate for seamless loop
  const items = products.length > 0 ? [...products, ...products, ...products] : [];

  return (
    <section id="new-arrivals" className="bg-cream paper-bg">
      {/* Banner rotativo */}
      <div className="relative w-full overflow-hidden border-t-[3px] border-dark border-b-[6px] border-b-dark">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {activeBanners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`New arrivals banner ${i + 1}`}
              loading="eager"
              width={isMobile ? 1080 : 1920}
              height={isMobile ? 1440 : 640}
              className="w-full flex-shrink-0 object-cover aspect-[3/4] sm:aspect-[1920/640]"
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {activeBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full border-2 border-dark transition-all ${
                i === current ? "bg-accent scale-125" : "bg-cream/70"
              }`}
              aria-label={`Go to banner ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Título */}
      <div className="px-6 lg:px-12 pt-14 pb-4 lg:pt-20 lg:pb-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="section-kicker text-primary mb-2.5">Fresh off the shelf</p>
          <h2
            className="font-display font-black italic text-dark leading-none"
            style={{ fontSize: "clamp(2rem,3vw,3rem)" }}
          >
            What's New, Gorgeous?
          </h2>
        </div>
      </div>

      {/* Marquee contínuo */}
      <div
        className="relative pb-14 lg:pb-20 pt-6 overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {loading && products.length === 0 ? (
          <div className="flex gap-4 px-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-surface border-[3px] border-dark rounded-sm animate-pulse"
                style={{ width: CARD_WIDTH, aspectRatio: "3 / 4" }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center font-display italic text-muted-foreground">
            No products to show yet.
          </p>
        ) : (
          <div ref={trackRef} className="flex will-change-transform">
            {items.map((product, index) => (
              <div
                key={`${product.node.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px`, marginRight: `${CARD_GAP}px` }}
              >
                <ShopifyProductCard
                  product={product}
                  variant="marquee"
                  sticker={STICKERS[index % STICKERS.length]}
                />
              </div>
            ))}
          </div>
        )}

        {/* Setas */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent transition-colors z-20"
          aria-label="Previous product"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent transition-colors z-20"
          aria-label="Next product"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;
