import { Link } from "react-router-dom";
import satireHer from "@/assets/satire-her.webp";
import satireHim from "@/assets/satire/why-not.webp";

const bannerClasses = "absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105";
const leftBtnWrapClasses = "absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-10";
const rightBtnWrapClasses = "absolute bottom-7 sm:bottom-8 left-0 right-0 flex justify-center z-10";
const btnBase = "border-[2px] border-dark rounded-sm px-5 py-2 text-[0.75rem] sm:px-9 sm:py-3 sm:text-[1.05rem] font-display italic font-bold shadow-[4px_4px_0_hsl(var(--dark))] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[7px_7px_0_hsl(var(--dark))] transition-all inline-block";

const SatireBanners = () => (
  <div className="border-y-[5px] border-dark">
    <div className="grid grid-cols-2">
      {/* Left — Her */}
      <Link to="/category/newbie" className="relative overflow-hidden group block no-underline border-r-[1.5px] border-dark">
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/10]">
          <img src={satireHer} alt="Retro illustration — her" loading="eager" className={bannerClasses} />
          <div className={leftBtnWrapClasses}>
            <span className={`red-texture-fill text-cream ${btnBase}`}>Just a peek →</span>
          </div>
        </div>
      </Link>

      {/* Right — Him */}
      <Link to="/category/push-it" className="relative overflow-hidden group block no-underline border-l-[1.5px] border-dark">
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/10]">
          <img src={satireHim} alt="Retro illustration — him" loading="eager" className={bannerClasses} />
          <div className={rightBtnWrapClasses}>
            <span className={`yellow-texture-fill ${btnBase}`}>Why not? →</span>
          </div>
        </div>
      </Link>
    </div>
  </div>
);
export default SatireBanners;
