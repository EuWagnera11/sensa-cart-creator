import { Link } from "react-router-dom";
import satireHer from "@/assets/satire-her.webp";
import satireHim from "@/assets/satire/why-not.webp";

const SatireBanners = () => (
  <div className="border-y-[5px] border-dark">
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left — Her */}
      <Link to="/category/newbie" className="relative overflow-hidden border-r-0 md:border-r-[3px] border-dark group block no-underline">
        <div className="relative w-full aspect-[16/9]">
          <img
            src={satireHer}
            alt="Retro illustration — her"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
            <span className="cta-primary text-cream inline-block px-9 py-3.5 text-[1.05rem] font-bold shadow-[4px_4px_0_hsl(var(--dark))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[7px_7px_0_hsl(var(--dark))] transition-all">
              Just a peek →
            </span>
          </div>
        </div>
      </Link>

      <Link to="/category/push-it" className="relative overflow-hidden group block no-underline">
        <div className="relative w-full aspect-[16/9]">
          <img
            src={satireHim}
            alt="Retro illustration — him"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
            <span className="yellow-texture-fill border-[3px] border-dark px-9 py-3.5 font-display italic text-[1.05rem] font-bold shadow-[4px_4px_0_hsl(var(--dark))] rounded-sm group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[7px_7px_0_hsl(var(--dark))] transition-all inline-block">
              Why not? →
            </span>
          </div>
        </div>
      </Link>
    </div>
  </div>
);
export default SatireBanners;
