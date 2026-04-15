import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.webp";


const heroTrustItems: string[] = [];
const ribbonItems = ["📦 Discreet packaging", "⚡ Ships in 24h", "🔒 Zero judgement"];

const Hero = () => (
  <section className="min-h-[90vh] bg-parch paper-bg grid grid-cols-1 lg:grid-cols-[3fr_2fr] border-b-[5px] border-dark relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(23 100% 5% / 0.6) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="flex flex-col justify-center px-6 lg:px-14 py-20 lg:py-20 relative z-[2]">

      <h1 className="font-display font-black italic leading-[0.9]" style={{ animation: "slideUp .5s ease both .2s" }}>
        <span className="block text-primary" style={{ fontSize: "clamp(3.5rem,6vw,7rem)" }}>Oooh My.</span>
        <span className="block" style={{ fontSize: "clamp(4rem,7vw,8.5rem)", color: "transparent", WebkitTextStroke: "3px hsl(var(--dark))" }}>
          Pleasure.
        </span>
        <span className="block text-foreground font-black" style={{ fontSize: "clamp(2.5rem,4vw,4.5rem)" }}>Unfiltered.</span>
      </h1>

      <div className="w-16 h-1 bg-primary my-6" style={{ animation: "slideUp .5s ease both .3s" }} />

      <p style={{ animation: "slideUp .5s ease both .3s" }}>
        <span className="font-display italic font-black block text-[1.15rem] leading-[1.6]" style={{ color: "hsl(var(--foreground) / 0.75)" }}>
          You weren't supposed to find this.
        </span>
        <span className="block text-[1rem] leading-[1.8] mt-1" style={{ fontFamily: "'Montserrat', sans-serif", color: "hsl(var(--foreground) / 0.55)" }}>
          Relax. Nobody needs to know.
        </span>
      </p>

      <div className="flex gap-3.5 mt-9 flex-wrap" style={{ animation: "slideUp .5s ease both .4s" }}>
        <Link to="/#best-sellers" className="cta-primary no-underline">
          Discover the secret →
        </Link>
        <Link to="/#newsletter" className="cta-secondary no-underline">
          Our Story
        </Link>
      </div>

      <div className="flex gap-4 mt-7 flex-wrap items-center" style={{ animation: "slideUp .5s ease both .5s" }}>
        {heroTrustItems.map((item, index) => (
          <div key={item} className="contents">
            <div className="text-[0.72rem] font-bold" style={{ color: "hsl(31 35% 35%)" }}>{item}</div>
            {index < heroTrustItems.length - 1 && <div className="w-[3px] h-[3px] rounded-full" style={{ background: "hsl(34 32% 64%)" }} />}
          </div>
        ))}
      </div>
    </div>

    <div className="border-l-0 lg:border-l-[5px] border-t-[5px] lg:border-t-0 border-dark relative overflow-hidden flex items-center justify-center min-h-[60vh] lg:min-h-0">
      <img src={heroImage} alt="Confidential shopping" loading="eager" decoding="async" className="w-full h-full object-cover absolute inset-0" style={{ objectPosition: "60% top" }} />
    </div>
  </section>
);

export default Hero;
