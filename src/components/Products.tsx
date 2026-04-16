import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import ooohMyImg from "@/assets/products/the-ooohmy-one.webp";
import hotStuffImg from "@/assets/products/hot-stuff.webp";
import setUpImg from "@/assets/products/the-set-up.webp";
import togetherImg from "@/assets/products/the-together.webp";

const products = [
  { emoji: "⚡", collection: "The Main Event · Buzz", name: "The OoohMy One", slug: "the-ooohmy-one", category: "Buzz", categorySlug: "buzz", desc: '"Your neighbours will know. That\'s their problem."', price: "€79", sticker: "Most wanted 🔥", bg: "rgba(255,45,107,.15)", image: ooohMyImg, rating: 4.8, reviews: 1284 },
  { emoji: "🌶️", collection: "The Slippery Slope · Gels", name: "Hot Stuff", slug: "hot-stuff", category: "Gels", categorySlug: "slippery", desc: '"Warning: may cause strong opinions and zero regrets."', price: "€34", sticker: "New Drop ✨", bg: "rgba(255,107,26,.12)", image: hotStuffImg, rating: 4.6, reviews: 567 },
  { emoji: "🗝️", collection: "First Showing · Newbie", name: "The Set-Up", slug: "the-set-up", category: "Newbie", categorySlug: "newbie", desc: '"Everything you need. Nothing embarrassing. Much."', price: "€99", sticker: "Starter 🗝️", bg: "rgba(0,212,184,.1)", image: setUpImg, rating: 4.8, reviews: 678 },
  { emoji: "💑", collection: "Two's Company · Duo", name: "The Together", slug: "the-together", category: "Duo", categorySlug: "duo", desc: '"Two is always better. We rest our case."', price: "€129", sticker: "Best Seller 👑", bg: "rgba(255,208,0,.08)", image: togetherImg, rating: 4.9, reviews: 523 },
];

const Products = () => {
  const { addItem, setIsOpen } = useCart();

  const handleAdd = (product: typeof products[number]) => {
    addItem({
      id: product.slug,
      name: product.name,
      slug: product.slug,
      category: product.category,
      categorySlug: product.categorySlug,
      collection: product.collection,
      emoji: product.emoji,
      description: product.desc,
      longDescription: product.desc,
      price: Number(product.price.replace("€", "")),
      sticker: product.sticker,
      features: ["Fast dispatch", "Discreet packaging", "Bestseller pick"],
      images: [product.emoji],
      inStock: true,
      rating: 4.8,
      reviews: 120,
    });
    setIsOpen(true);
    toast.success(`${product.name} added to bag ✨`);
  };

  return (
    <div id="best-sellers" className="bg-dark border-t-[5px] border-dark border-b-[5px] border-b-primary px-6 lg:px-12 py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto">
        <p className="section-kicker text-accent mb-2.5">The Goods</p>
        <h2 className="font-display font-black italic text-cream leading-none mb-14" style={{ fontSize: "clamp(2.2rem,3.5vw,3.5rem)" }}>
          Our Best Kept Secrets.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-[3px] border-white/10">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              to={`/category/${product.categorySlug}/product/${product.slug}`}
              className={`group relative overflow-hidden transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:-rotate-[0.5deg] hover:z-[2] flex flex-col justify-end aspect-square no-underline ${index % 4 !== 3 ? "lg:border-r-[3px] border-white/10" : ""} ${index < 2 ? "sm:border-b-[3px] lg:border-b-0 border-white/10" : ""}`}
            >
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute top-3 right-4 bg-accent text-foreground font-display italic font-bold text-[0.68rem] px-3.5 py-1 border-2 border-dark rounded-full z-[2]" style={{ transform: "rotate(3deg)", boxShadow: "2px 2px 0 hsl(var(--dark))" }}>
                {product.sticker}
              </div>

              <div className="relative z-[1] p-8 pb-7">
              <div className="font-display italic text-[0.75rem] mb-1 text-white/40">{product.collection}</div>
              <div className="font-display font-black italic text-[1.6rem] text-white leading-none mb-2.5" style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}>{product.name}</div>
              <div className="font-serif italic text-[0.82rem] leading-relaxed mb-3 text-white/50">{product.desc}</div>

              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-accent text-[0.9rem]">★</span>
                <span className="font-display font-bold text-white text-[0.85rem]">{product.rating}</span>
                <span className="font-serif italic text-white/40 text-[0.78rem]">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="font-display font-black text-[1.8rem] text-accent">{product.price}</div>
                <button type="button" className="bg-cream text-foreground border-2 border-dark px-[18px] py-2 font-display italic text-[0.88rem] font-bold rounded-full transition-colors hover:bg-accent" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(product); }}>
                  Add 🛒
                </button>
              </div>

              <span className="font-serif italic text-[0.78rem] mt-4 text-white/55">
                Discover
              </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="cta-secondary no-underline" style={{ borderColor: "rgba(255,255,255,.2)", boxShadow: "4px 4px 0 rgba(255,255,255,.1)" }}>
            View all products →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
