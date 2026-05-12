import { Link } from "react-router-dom";
import buzzImg from "@/assets/categories/buzz.webp";
import duoImg from "@/assets/categories/duo.webp";
import slipperyImg from "@/assets/categories/slippery.webp";
import tiedImg from "@/assets/categories/tied.webp";
import newbieImg from "@/assets/categories/newbie.webp";
import browsingImg from "@/assets/categories/browsing.webp";
import { getVisibleSections, type SectionId } from "@/lib/productSections";

// Visual-only mapping: image + tailwind color token per section.
// Section name / subtitle / description / cta / counts come from the
// curated JSON (sections_meta.json) — single source of truth.
const VISUALS: Record<SectionId, { image: string; color: string }> = {
  buzz: { image: buzzImg, color: "bg-cat-buzz" },
  duo: { image: duoImg, color: "bg-cat-duo" },
  slippery: { image: slipperyImg, color: "bg-cat-slippery" },
  tied: { image: tiedImg, color: "bg-cat-tied" },
  newbie: { image: newbieImg, color: "bg-cat-newbie" },
  oops: { image: browsingImg, color: "bg-cat-browsing" },
};

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const Categories = () => {
  const sections = getVisibleSections();

  return (
    <div id="categories" className="border-y-[5px] border-dark">
      <div className="bg-cream paper-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-14 relative z-[1]">
          <h2
            className="font-display font-black italic text-foreground leading-none mb-0"
            style={{ fontSize: "clamp(2.2rem,3.5vw,3.5rem)" }}
          >
            The Secret Menu.
          </h2>
        </div>
      </div>

      <div className="bg-dark border-t-[5px] border-primary">
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {sections.map((s, index) => {
            const v = VISUALS[s.id];
            const displayName = s.id === "oops" ? "Oops 🔥" : titleCase(s.name);
            return (
              <Link
                key={s.id}
                to={`/category/${s.id}`}
                className={`relative cat-card p-5 lg:px-7 lg:py-9 overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1 hover:z-[2] group no-underline border-dark flex flex-col justify-end min-h-[180px] sm:min-h-[220px] xl:min-h-[260px] odd:border-r-4 lg:odd:border-r-0 ${index % 3 !== 2 ? "lg:border-r-4" : ""} ${index < sections.length - 2 ? "border-b-4" : ""} lg:border-b-0 ${index < 3 ? "lg:border-b-4" : ""}`}
                style={{ boxShadow: "0 0 0 transparent" }}
              >
                <img
                  src={v.image}
                  alt={s.name}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[1]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, hsl(var(--dark) / 0.08) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />

                <div className="relative z-[1]">
                  <div
                    className="font-display font-black italic leading-none mb-1 text-[1.6rem] text-white"
                    style={{ textShadow: "2px 2px 0 rgba(0,0,0,.3)" }}
                  >
                    {displayName}
                  </div>
                  <div className="font-display italic text-[0.78rem] mb-1.5 text-white/70">
                    {s.subtitle}
                  </div>
                  <div className="text-[0.62rem] tracking-[2px] uppercase font-bold text-white/50">
                    {s.description} · {s.id === "oops" ? "whole catalog" : `${s.total_in_listing.toLocaleString()} items`}
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-[18px] font-display italic text-[0.88rem] font-bold transition-all group-hover:gap-3 text-white/90">
                    {s.cta}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
