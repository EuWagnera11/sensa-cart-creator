import { Link } from "react-router-dom";
import buzzImg from "@/assets/categories/buzz.webp";
import duoImg from "@/assets/categories/duo.webp";
import slipperyImg from "@/assets/categories/slippery.webp";
import tiedImg from "@/assets/categories/tied.webp";
import newbieImg from "@/assets/categories/newbie.webp";

import browsingImg from "@/assets/categories/browsing.webp";

const categoriesDisplay = [
  { slug: "buzz", name: "Buzz", emoji: "⚡", collection: "Legs will tremble", desc: "Vibrators", countLabel: "243 items", color: "bg-cat-buzz", image: buzzImg, cta: "Turn it on →" },
  { slug: "duo", name: "Duo", emoji: "🔥", collection: "Better together", desc: "For couples", countLabel: "189 items", color: "bg-cat-duo", image: duoImg, cta: "Play together →" },
  { slug: "slippery", name: "Slippery", emoji: "🌶️", collection: "Things get interesting", desc: "Gels & lubes", countLabel: "94 items", color: "bg-cat-slippery", image: slipperyImg, cta: "Make it smooth →" },
  { slug: "tied", name: "Tied", emoji: "🖤", collection: "Control or surrender", desc: "Bondage", countLabel: "201 items", color: "bg-cat-tied", image: tiedImg, cta: "Take control →" },
  { slug: "newbie", name: "Newbie", emoji: "🗝️", collection: "Just start", desc: "Starter kits", countLabel: "67 items", color: "bg-cat-newbie", image: newbieImg, cta: "Start slow →" },
  
  { slug: "oops", name: "Oops 🔥", emoji: "👀", collection: "Hard to resist", desc: "Sale", countLabel: "∞", color: "bg-cat-browsing", image: browsingImg, cta: "Don't miss it →" },
];

const Categories = () => (
  <div id="categories" className="border-y-[5px] border-dark">
    <div className="bg-cream paper-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-14 relative z-[1]">
        <h2 className="font-display font-black italic text-foreground leading-none mb-0" style={{ fontSize: "clamp(2.2rem,3.5vw,3.5rem)" }}>
          The Secret Menu.
        </h2>
      </div>
    </div>

    <div className="bg-dark border-t-[3px] border-primary">
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {categoriesDisplay.map((cat, index) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className={`relative cat-card p-5 lg:px-7 lg:py-9 overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1 hover:z-[2] group no-underline border-dark flex flex-col justify-end min-h-[180px] sm:min-h-[220px] xl:min-h-[260px] odd:border-r-4 lg:odd:border-r-0 ${index % 3 !== 2 ? "lg:border-r-4" : ""} ${index < 4 ? "border-b-4" : ""} lg:border-b-0 ${index < 3 ? "lg:border-b-4" : ""}`}
            style={{ boxShadow: "0 0 0 transparent" }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[1]"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--dark) / 0.08) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            <div className="relative z-[1]">
              <div
                className="font-display font-black italic leading-none mb-1 text-[1.6rem] text-white"
                style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}
              >
                {cat.name}
              </div>
              <div className="font-display italic text-[0.78rem] mb-1.5 text-white/70">{cat.collection}</div>
              <div className="text-[0.62rem] tracking-[2px] uppercase font-bold text-white/50">{cat.desc}</div>
              <div className="inline-flex items-center gap-1.5 mt-[18px] font-display italic text-[0.88rem] font-bold transition-all group-hover:gap-3 text-white/90">
                {cat.cta}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Categories;
