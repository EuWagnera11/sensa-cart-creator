import { Link } from "react-router-dom";
import satireHer from "@/assets/satire-her.webp";
import satireHim from "@/assets/satire/why-not.webp";

const SatireBanners = () => (
  <div className="border-y-[5px] border-dark">
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left — Her */}
      <div className="relative overflow-hidden border-r-0 md:border-r-[3px] border-dark group">
        <div className="relative w-full aspect-[16/9]">
          <img
            src={satireHer}
            alt="Retro illustration — her"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
            <Link
              to="/category/newbie"
              className="cta-primary text-cream no-underline inline-block px-9 py-3.5 text-[1.05rem] font-bold shadow-[4px_4px_0_hsl(var(--dark))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_hsl(var(--dark))]"
            >
              Just a peek →
            </Link>
          </div>
        </div>
      </div>

      {/* Right — Him */}
      <div className="relative overflow-hidden group">
        <div className="relative w-full aspect-[16/9]">
          <img
            src={satireHim}
            alt="Retro illustration — him"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
            <Link
              to="/category/push-it"
              className="yellow-texture-fill border-[3px] border-dark px-9 py-3.5 font-display italic text-[1.05rem] font-bold shadow-[4px_4px_0_hsl(var(--dark))] rounded-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_hsl(var(--dark))] transition-all no-underline inline-block"
            >
              Why not? →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default SatireBanners;
