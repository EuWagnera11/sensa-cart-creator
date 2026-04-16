import { useState, useEffect, useCallback } from "react";
import type { BannerSlide } from "@/data/categoryBanners";

interface CategoryHeroBannerProps {
  slides: BannerSlide[];
  categoryName: string;
  categoryEmoji: string;
  categoryCollection: string;
  categoryDesc: string;
  productCount: number;
  darkText?: boolean;
}

const CategoryHeroBanner = ({
  slides,
  categoryName,
  categoryEmoji,
  categoryCollection,
  categoryDesc,
  productCount,
  darkText = false,
}: CategoryHeroBannerProps) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  // Auto-rotate every 5s
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden border-b-[5px] border-dark">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="absolute inset-0 w-full h-full object-cover"
            width={1440}
            height={512}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-[3] h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-10 lg:pb-14">
        <span className="text-5xl lg:text-6xl block mb-3 drop-shadow-lg">{categoryEmoji}</span>
        <h1
          className="font-display font-black italic text-white leading-none mb-2"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", textShadow: "3px 3px 0 rgba(0,0,0,.3)" }}
        >
          {categoryName}.
        </h1>

        {/* Slide-specific tagline */}
        <p
          className="font-display italic text-lg lg:text-xl text-white/90 mb-1 transition-opacity duration-500"
          key={current}
        >
          {slides[current].headline}
        </p>
        <p className="font-serif italic text-sm text-white/60 mb-1">{slides[current].sub}</p>

        <p className="text-[0.65rem] tracking-[3px] uppercase font-bold text-white/40 mt-2">
          {categoryDesc} · {productCount} products
        </p>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="flex gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHeroBanner;
