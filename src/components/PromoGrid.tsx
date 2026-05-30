import { Link } from "react-router-dom";
import newInImg from "@/assets/promos/new-in-this-week.webp";
import lingerieImg from "@/assets/promos/lingerie.webp";
import bondageImg from "@/assets/promos/new-to-bondage.webp";
import maleToysImg from "@/assets/promos/male-toys.webp";

const promos = [
  { bg: "bg-neon-mint", emoji: "✨", name: "Just In", sub: '"Fresh trouble. No warnings."', badge: "Just In", isNew: false, to: "/category/newbie", image: newInImg, cta: "Take a look →" },
  { bg: "bg-neon-purple", emoji: "🎀", name: "Just you", sub: '"No audience needed."', badge: "Solo", isNew: true, to: "/category/buzz", image: lingerieImg, cta: "Start here →" },
  { bg: "bg-neon-orange", emoji: "🔗", name: "Push it", sub: '"A little further tonight."', badge: "Hot", isNew: false, to: "/category/tied", image: bondageImg, cta: "Try it →" },
  { bg: "bg-dark", emoji: "🌶️", name: "Playtime", sub: '"You make the rules."', badge: "Play", isNew: true, to: "/category/duo", image: maleToysImg, cta: "Explore →" },
];

const PromoGrid = () => (
  <div className="border-y-[5px] border-dark bg-background paper-bg">
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {promos.map((promo, index) => (
        <Link key={promo.name} to={promo.to} className={`relative min-h-[200px] sm:min-h-[280px] xl:min-h-[340px] overflow-hidden flex flex-col justify-end group no-underline border-r-[3px] last:border-r-0 border-b-[3px] border-dark [&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:last:border-r-0 lg:border-r-4 transition-all hover:brightness-110`}>
          <img
            src={promo.image}
            alt={promo.name}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--dark) / 0.1) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          <div className={`absolute top-3 left-3 sm:top-5 sm:left-5 w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] rounded-full flex flex-col items-center justify-center text-center font-black text-[0.45rem] sm:text-[0.55rem] tracking-wide uppercase leading-tight border-2 sm:border-[3px] z-[2] ${promo.isNew ? "bg-primary text-cream border-white/20" : "bg-dark text-accent border-white/20"}`}>
            <span className="text-sm sm:text-lg font-display whitespace-pre-line leading-none">{promo.badge}</span>
          </div>

          <div className="relative z-[1] px-4 py-5 sm:px-6 sm:py-7">
            <div className="font-display font-black italic text-lg sm:text-2xl text-white mb-0.5 sm:mb-1" style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}>{promo.name}</div>
            <div className="font-serif italic text-[0.65rem] sm:text-[0.8rem] text-white/75 mb-2.5 sm:mb-3.5 max-w-[200px]">{promo.sub}</div>
            <span className="inline-block bg-white/90 text-foreground font-display italic text-[0.7rem] sm:text-[0.85rem] font-bold px-[14px] py-[6px] sm:px-[22px] sm:py-[9px] border-2 border-dark rounded-[2px] transition-all group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" style={{ boxShadow: "3px 3px 0 rgba(0,0,0,.3)" }}>
              {promo.cta}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default PromoGrid;
