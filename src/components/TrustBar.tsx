import trustBox from "@/assets/icons/trust-box.png";
import trustLightning from "@/assets/icons/trust-lightning.png";
import trustLock from "@/assets/icons/trust-lock.png";

const trustMobile = [
  { img: trustBox, title: "Discreet", sub: "No logos. No questions." },
  { img: trustLightning, title: "24–48h", sub: "Ships fast, always." },
  { img: trustLock, title: "Private", sub: "Your car. Your secret." },
];

const trustDesktop = [
  { img: trustBox, title: "Your neighbours? Clueless.", sub: '"No logos. No questions. Nothing to explain."' },
  { img: trustLightning, title: "Faster than your excuses.", sub: '"Ships in 24–48h. Discreet, always."' },
  { img: trustLock, title: "Nothing to explain.", sub: '"Your car. Your secret."' },
];

const TrustBar = () => (
  <div className="bg-background paper-bg py-5 sm:py-10 lg:py-14 px-4 lg:px-12 border-b-4 border-dark">
    <div className="max-w-[1200px] mx-auto">
      {/* Mobile — compact horizontal */}
      <div className="grid grid-cols-3 gap-3 sm:hidden">
        {trustMobile.map((item) => (
          <div key={item.title} className="flex items-center gap-2.5 justify-center">
            <img src={item.img} alt="" className="w-7 h-7 object-contain" loading="eager" />
            <div>
              <div className="font-display font-black text-[0.8rem] text-foreground leading-tight">{item.title}</div>
              <div className="font-serif italic text-[0.62rem] text-foreground/50 leading-snug mt-0.5">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — cards with texture & shadow */}
      <div className="hidden sm:grid grid-cols-3 gap-6">
        {trustDesktop.map((item) => (
          <div
            key={item.title}
            className="relative flex-col text-center bg-parch border-[3px] border-dark/15 rounded-lg px-6 py-8 overflow-hidden"
            style={{ boxShadow: "4px 4px 0 hsl(var(--dark) / 0.08)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--dark) / 0.12) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
            <img src={item.img} alt="" className="relative w-14 h-14 object-contain mx-auto mb-4" loading="eager" />
            <div className="relative font-display font-black text-[1rem] text-foreground leading-tight">{item.title}</div>
            <div className="relative font-serif italic text-[0.82rem] text-foreground/50 leading-snug mt-2">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBar;
