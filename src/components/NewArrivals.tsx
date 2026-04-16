import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useCarousel } from "@/hooks/useCarousel";
import banner1 from "@/assets/banners/new-arrivals-1.webp";
import banner2 from "@/assets/banners/new-arrivals-2.webp";
import banner3 from "@/assets/banners/new-arrivals-3.webp";
import hotStuffImg from "@/assets/products/hot-stuff.webp";
import togetherImg from "@/assets/products/the-together.webp";
import setUpImg from "@/assets/products/the-set-up.webp";
import whisperImg from "@/assets/products/whisper.webp";
import pocketRocketImg from "@/assets/products/pocket-rocket.webp";
import dateNightImg from "@/assets/products/date-night.webp";
import thunderImg from "@/assets/products/thunder.webp";
import ooohMyOneImg from "@/assets/products/the-ooohmy-one.webp";
import directorsKitImg from "@/assets/products/directors-kit.webp";
import silkImg from "@/assets/products/silk.webp";
import curiousKitImg from "@/assets/products/curious-kit.webp";
import longDistanceImg from "@/assets/products/long-distance.webp";

const banners = [banner1, banner2, banner3];

const newProducts = [
  {
    slug: "hot-stuff",
    categorySlug: "slippery",
    name: "Hot Stuff",
    emoji: "🌶️",
    collection: "The Slippery Slope",
    category: "Gels",
    desc: '"Warning: may cause strong opinions and zero regrets."',
    price: "€34",
    sticker: "New Drop ✨",
    image: hotStuffImg,
    rating: 4.6,
    reviews: 567,
  },
  {
    slug: "the-together",
    categorySlug: "duo",
    name: "The Together",
    emoji: "💑",
    collection: "Two's Company",
    category: "Duo",
    desc: '"Two is always better. We rest our case."',
    price: "€129",
    sticker: "Best Seller 👑",
    image: togetherImg,
    rating: 4.9,
    reviews: 523,
  },
  {
    slug: "the-set-up",
    categorySlug: "newbie",
    name: "The Set-Up",
    emoji: "🗝️",
    collection: "First Showing",
    category: "Newbie",
    desc: '"Everything you need. Nothing embarrassing. Much."',
    price: "€99",
    sticker: "Starter 🗝️",
    image: setUpImg,
    rating: 4.8,
    reviews: 678,
  },
  {
    slug: "whisper",
    categorySlug: "buzz",
    name: "Whisper",
    emoji: "🤫",
    collection: "Quiet Riot",
    category: "Vibrators",
    desc: '"Silent but deadly. In the best way."',
    price: "€59",
    sticker: "Trending 🔥",
    image: whisperImg,
    rating: 4.7,
    reviews: 412,
  },
  {
    slug: "pocket-rocket",
    categorySlug: "buzz",
    name: "Pocket Rocket",
    emoji: "🚀",
    collection: "Quiet Riot",
    category: "Vibrators",
    desc: '"Small. Mighty. Discreet."',
    price: "€45",
    sticker: "Fan Fave 💜",
    image: pocketRocketImg,
    rating: 4.8,
    reviews: 891,
  },
  {
    slug: "date-night",
    categorySlug: "duo",
    name: "Date Night",
    emoji: "🌹",
    collection: "Two's Company",
    category: "Duo",
    desc: '"Everything for the night you\'ve been planning."',
    price: "€89",
    sticker: "New 🆕",
    image: dateNightImg,
    rating: 4.5,
    reviews: 234,
  },
  {
    slug: "thunder",
    categorySlug: "buzz",
    name: "Thunder",
    emoji: "⛈️",
    collection: "The Main Event",
    category: "Vibrators",
    desc: '"Warning: May cause noise complaints."',
    price: "€99",
    sticker: "Sale 🏷️",
    image: thunderImg,
    rating: 4.8,
    reviews: 256,
  },
  {
    slug: "the-ooohmy-one",
    categorySlug: "buzz",
    name: "The OoohMy One",
    emoji: "⚡",
    collection: "The Main Event",
    category: "Vibrators",
    desc: '"Your neighbours will know. That\'s their problem."',
    price: "€79",
    sticker: "Fan Fave 🔥",
    image: ooohMyOneImg,
    rating: 4.9,
    reviews: 342,
  },
  {
    slug: "the-directors-kit",
    categorySlug: "tied",
    name: "Director's Kit",
    emoji: "🎬",
    collection: "The Director's Cut",
    category: "Bondage",
    desc: '"Action! ...and cut."',
    price: "€159",
    sticker: "Premium 👑",
    image: directorsKitImg,
    rating: 4.9,
    reviews: 145,
  },
  {
    slug: "silk",
    categorySlug: "slippery",
    name: "Silk",
    emoji: "✨",
    collection: "The Slippery Slope",
    category: "Gels",
    desc: '"Smoother than your best pickup line."',
    price: "€29",
    sticker: "Top Rated ⭐",
    image: silkImg,
    rating: 4.7,
    reviews: 891,
  },
  {
    slug: "curious-kit",
    categorySlug: "newbie",
    name: "Curious Kit",
    emoji: "🔍",
    collection: "First Showing",
    category: "Newbie",
    desc: '"For the curious. No judgement."',
    price: "€59",
    sticker: "New ✨",
    image: curiousKitImg,
    rating: 4.6,
    reviews: 234,
  },
  {
    slug: "long-distance",
    categorySlug: "duo",
    name: "Long Distance",
    emoji: "📱",
    collection: "Two's Company",
    category: "Duo",
    desc: '"Love knows no distance. Neither does Bluetooth."',
    price: "€109",
    sticker: "New Drop ✨",
    image: longDistanceImg,
    rating: 4.8,
    reviews: 234,
  },
];

const ACTIVE_WIDTH = 280;
const CARD_WIDTH = 220;

const NewArrivals = () => {
  const [current, setCurrent] = useState(0);
  const { addItem, setIsOpen } = useCart();

  const {
    activeIndex,
    next: nextProduct,
    prev: prevProduct,
    goTo,
    pause,
    resume,
    getCardStyle,
    getSignedOffset,
  } = useCarousel({ itemCount: newProducts.length, autoPlayInterval: 4000, visibleCount: 5 });

  const nextBanner = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);

  useEffect(() => {
    const id = setInterval(nextBanner, 4500);
    return () => clearInterval(id);
  }, [nextBanner]);

  const handleAdd = (p: (typeof newProducts)[number], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: p.slug,
      name: p.name,
      slug: p.slug,
      category: p.category,
      categorySlug: p.categorySlug,
      collection: p.collection,
      emoji: p.emoji,
      description: p.desc,
      longDescription: p.desc,
      price: Number(p.price.replace("€", "")),
      sticker: p.sticker,
      features: ["Fast dispatch", "Discreet packaging"],
      images: [p.emoji],
      inStock: true,
      rating: p.rating,
      reviews: p.reviews,
    });
    setIsOpen(true);
    toast.success(`${p.name} added to bag ✨`);
  };

  return (
    <section id="new-arrivals" className="bg-cream paper-bg">
      {/* Banner rotativo */}
      <div className="relative w-full overflow-hidden border-y-[3px] border-dark">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`New arrivals banner ${i + 1}`}
              loading="eager"
              width={1920}
              height={640}
              className="w-full flex-shrink-0 object-cover aspect-[16/9] sm:aspect-[1920/640]"
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {banners.map((_, i) => (
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

      {/* Carrossel 3D */}
      <div
        className="relative pb-14 lg:pb-20 pt-6 overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ height: `${ACTIVE_WIDTH * (4 / 3) + 40}px` }}
        >
          {newProducts.map((product, index) => {
            const style = getCardStyle(index);
            const signed = getSignedOffset(index);
            const isActive = signed === 0;
            const cardW = isActive ? ACTIVE_WIDTH : CARD_WIDTH;

            return (
              <div
                key={product.slug}
                className="absolute"
                style={{
                  width: `${cardW}px`,
                  transform: style.transform,
                  opacity: style.opacity,
                  filter: style.filter,
                  zIndex: style.zIndex,
                  pointerEvents: style.pointerEvents,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => {
                  if (!isActive) goTo(index);
                }}
              >
                <Link
                  to={`/category/${product.categorySlug}/product/${product.slug}`}
                  className="group relative overflow-hidden flex-shrink-0 no-underline border-[3px] border-dark rounded-sm block transition-transform duration-300 hover:scale-[1.03]"
                  style={{
                    boxShadow: isActive
                      ? "6px 6px 0 hsl(var(--dark))"
                      : "4px 4px 0 hsl(var(--dark))",
                  }}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="relative aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div
                      className="absolute top-2 right-2 bg-accent text-foreground font-display italic font-bold text-[0.48rem] sm:text-[0.55rem] px-2 py-0.5 border-2 border-dark rounded-full z-[2]"
                      style={{ transform: "rotate(3deg)", boxShadow: "2px 2px 0 hsl(var(--dark))" }}
                    >
                      {product.sticker}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-[1] p-2.5 sm:p-3">
                      <div
                        className="font-display font-black italic text-white leading-none mb-0.5 text-[0.75rem] sm:text-[0.9rem]"
                        style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}
                      >
                        {product.name}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-accent text-[0.6rem]">★</span>
                        <span className="font-display font-bold text-white text-[0.55rem]">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-display font-black text-[0.9rem] sm:text-[1.1rem] text-accent">
                          {product.price}
                        </div>
                        <button
                          type="button"
                          className="bg-cream text-foreground border-2 border-dark px-2 py-0.5 sm:px-2.5 sm:py-1 font-display italic text-[0.5rem] sm:text-[0.6rem] font-bold rounded-full transition-colors hover:bg-accent"
                          onClick={(e) => handleAdd(product, e)}
                        >
                          Add 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Setas */}
        <button
          onClick={prevProduct}
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent transition-colors z-20"
          aria-label="Previous product"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent transition-colors z-20"
          aria-label="Next product"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dots indicadores */}
        <div className="flex justify-center gap-1.5 mt-6">
          {newProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full border border-dark transition-all ${
                i === activeIndex ? "bg-primary scale-125" : "bg-cream/70"
              }`}
              aria-label={`Go to product ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
