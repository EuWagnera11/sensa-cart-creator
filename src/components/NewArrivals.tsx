import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
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

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

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
              loading={i === 0 ? "eager" : "lazy"}
              width={1920}
              height={640}
              className="w-full flex-shrink-0 object-cover"
              style={{ aspectRatio: "1920/640" }}
            />
          ))}
        </div>

        {/* Navigation arrows */}
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

        {/* Dots */}
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

      {/* 3 Products grid */}
      <div className="px-6 lg:px-12 py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto">
          <p className="section-kicker text-primary mb-2.5">Fresh off the shelf</p>
          <h2
            className="font-display font-black italic text-dark leading-none mb-12"
            style={{ fontSize: "clamp(2rem,3vw,3rem)" }}
          >
            What's New, Gorgeous?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-[3px] border-dark">
            {newProducts.map((product, i) => (
              <Link
                key={product.slug}
                to={`/category/${product.categorySlug}/product/${product.slug}`}
                className={`group relative overflow-hidden flex flex-col aspect-[3/4] no-underline ${
                  i < 2 ? "sm:border-r-[3px] border-dark" : ""
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                {/* Sticker */}
                <div
                  className="absolute top-3 right-4 bg-accent text-foreground font-display italic font-bold text-[0.68rem] px-3.5 py-1 border-2 border-dark rounded-full z-[2]"
                  style={{ transform: "rotate(3deg)", boxShadow: "2px 2px 0 hsl(var(--dark))" }}
                >
                  {product.sticker}
                </div>

                {/* Content */}
                <div className="relative z-[1] mt-auto p-7">
                  <div className="font-display italic text-[0.72rem] mb-1 text-white/40">
                    {product.collection}
                  </div>
                  <div
                    className="font-display font-black italic text-[1.5rem] text-white leading-none mb-2"
                    style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}
                  >
                    {product.name}
                  </div>
                  <div className="font-serif italic text-[0.8rem] leading-relaxed mb-3 text-white/50">
                    {product.desc}
                  </div>

                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-accent text-[0.9rem]">★</span>
                    <span className="font-display font-bold text-white text-[0.85rem]">
                      {product.rating}
                    </span>
                    <span className="font-serif italic text-white/40 text-[0.78rem]">
                      ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="font-display font-black text-[1.6rem] text-accent">
                      {product.price}
                    </div>
                    <button
                      type="button"
                      className="bg-cream text-foreground border-2 border-dark px-[18px] py-2 font-display italic text-[0.85rem] font-bold rounded-full transition-colors hover:bg-accent"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(product); }}
                    >
                      Add 🛒
                    </button>
                  </div>

                  <span className="font-serif italic text-[0.78rem] mt-3 text-white/55 inline-block">
                    Discover →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
