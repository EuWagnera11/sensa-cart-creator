import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import banner1 from "@/assets/banners/new-arrivals-1.webp";
import banner2 from "@/assets/banners/new-arrivals-2.webp";
import banner3 from "@/assets/banners/new-arrivals-3.webp";
import hotStuffImg from "@/assets/products/hot-stuff.webp";
import togetherImg from "@/assets/products/the-together.webp";
import setUpImg from "@/assets/products/the-set-up.webp";

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
];

const NewArrivals = () => {
  const [current, setCurrent] = useState(0);
  const { addItem, setIsOpen } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (el) {
      const cardWidth = el.querySelector("a")?.offsetWidth ?? 200;
      el.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (el) {
      const cardWidth = el.querySelector("a")?.offsetWidth ?? 200;
      el.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }
  };

  const handleAdd = (p: (typeof newProducts)[number]) => {
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
      {/* Full-width rotating banner */}
      <div className="relative w-full overflow-hidden border-y-[5px] border-dark">
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
              className="w-full flex-shrink-0 object-cover aspect-[1920/640]"
            />
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center font-display font-bold text-lg shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent transition-colors z-10"
          aria-label="Previous banner"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center font-display font-bold text-lg shadow-[3px_3px_0_hsl(var(--dark))] hover:bg-accent transition-colors z-10"
          aria-label="Next banner"
        >
          →
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
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

      {/* Products carousel */}
      <div className="px-6 lg:px-12 pt-14 pb-4 lg:pt-20 lg:pb-6">
        <div className="max-w-[1440px] mx-auto flex items-end justify-between">
          <div>
            <p className="section-kicker text-primary mb-2.5">Fresh off the shelf</p>
            <h2
              className="font-display font-black italic text-dark leading-none"
              style={{ fontSize: "clamp(2rem,3vw,3rem)" }}
            >
              What's New, Gorgeous?
            </h2>
          </div>
          <button
            onClick={scrollRight}
            className="hidden sm:flex items-center gap-1.5 bg-dark text-cream font-display italic font-bold text-[0.8rem] px-5 py-2.5 border-[3px] border-dark rounded-sm hover:bg-primary transition-colors"
            style={{ boxShadow: "3px 3px 0 hsl(var(--dark) / 0.3)" }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative pb-14 lg:pb-20">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-6 lg:px-12 pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {newProducts.map((product) => (
            <Link
              key={product.slug}
              to={`/category/${product.categorySlug}/product/${product.slug}`}
              className="group relative overflow-hidden flex-shrink-0 w-[200px] sm:w-[260px] lg:w-[300px] no-underline border-[3px] border-dark rounded-sm snap-start"
              style={{ boxShadow: "4px 4px 0 hsl(var(--dark))" }}
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Sticker */}
                <div
                  className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-accent text-foreground font-display italic font-bold text-[0.55rem] sm:text-[0.68rem] px-2.5 py-0.5 sm:px-3.5 sm:py-1 border-2 border-dark rounded-full z-[2]"
                  style={{ transform: "rotate(3deg)", boxShadow: "2px 2px 0 hsl(var(--dark))" }}
                >
                  {product.sticker}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-[1] p-4 sm:p-6">
                  <div className="font-display italic text-[0.6rem] sm:text-[0.68rem] mb-0.5 text-white/40">
                    {product.collection}
                  </div>
                  <div
                    className="font-display font-black italic text-[1rem] sm:text-[1.4rem] text-white leading-none mb-1.5"
                    style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}
                  >
                    {product.name}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-accent text-[0.75rem] sm:text-[0.85rem]">★</span>
                    <span className="font-display font-bold text-white text-[0.72rem] sm:text-[0.8rem]">
                      {product.rating}
                    </span>
                    <span className="font-serif italic text-white/40 text-[0.6rem] sm:text-[0.7rem]">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="font-display font-black text-[1.1rem] sm:text-[1.4rem] text-accent">
                      {product.price}
                    </div>
                    <button
                      type="button"
                      className="bg-cream text-foreground border-2 border-dark px-3 py-1.5 sm:px-4 sm:py-2 font-display italic text-[0.65rem] sm:text-[0.8rem] font-bold rounded-full transition-colors hover:bg-accent"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(product); }}
                    >
                      Add 🛒
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile arrows */}
        <button
          onClick={scrollLeft}
          className="sm:hidden absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center shadow-[3px_3px_0_hsl(var(--dark))] z-10"
          aria-label="Previous product"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollRight}
          className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream/90 border-[3px] border-dark rounded-full flex items-center justify-center shadow-[3px_3px_0_hsl(var(--dark))] z-10"
          aria-label="Next product"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;
