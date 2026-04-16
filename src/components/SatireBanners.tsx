import { Link } from "react-router-dom";
import satireHer from "@/assets/satire-her.webp";
import satireHim from "@/assets/satire/why-not.webp";

const SatireBanners = () => (
  <div className="border-y-[5px] border-dark">
    <div className="grid grid-cols-2">
      {/* Left — Her */}
      <Link to="/category/newbie" className="relative overflow-hidden border-r-[3px] border-dark group block no-underline">
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/10]">
          <img
            src={satireHer}
            alt="Retro illustration — her"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
            <span className="red-texture-fill border-[3px] border-dark rounded-sm px-5 py-2 text-[0.75rem] sm:px-9 sm:py-3 sm:text-[1.05rem] font-display italic font-bold text-cream shadow-[4px_4px_0_hsl(var(--dark))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[7px_7px_0_hsl(var(--dark))] transition-all inline-block">
              Just a peek →
            </span>
          </div>
        </div>
      </Link>

      <Link to="/category/push-it" className="relative overflow-hidden group block no-underline">
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/10]">
          <img
            src={satireHim}
            alt="Retro illustration — him"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
            <span className="yellow-texture-fill border-[3px] border-dark px-5 py-2 text-[0.75rem] sm:px-9 sm:py-3 sm:text-[1.05rem] font-display italic font-bold shadow-[4px_4px_0_hsl(var(--dark))] rounded-sm group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[7px_7px_0_hsl(var(--dark))] transition-all inline-block">
              Why not? →
            </span>
          </div>
        </div>
      </Link>
    </div>
  </div>
);
export default SatireBanners;
