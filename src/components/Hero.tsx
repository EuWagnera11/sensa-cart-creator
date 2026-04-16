import { Link } from "react-router-dom";
import { Star, Truck, ShieldCheck, Package } from "lucide-react";
import heroImage from "@/assets/hero-image.webp";

const trustBadges = [
  { icon: Package, label: "Discreet packaging" },
  { icon: Truck, label: "Ships in 24h" },
  { icon: ShieldCheck, label: "Zero judgement" },
  { icon: Star, label: "4.9★ avg rating" },
];

const Hero = () => (
  <section className="min-h-[92vh] bg-parch paper-bg grid grid-cols-1 lg:grid-cols-[1fr_1fr] border-b-[5px] border-dark relative overflow-hidden">
    {/* Halftone overlay */}
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(23 100% 5% / 0.6) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    {/* Left — copy */}
    <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-12 relative z-[2]">
      <h1 className="font-display font-black italic leading-[0.88]" style={{ animation: "slideUp .5s ease both .2s" }}>
        <span className="block text-primary" style={{ fontSize: "clamp(3.8rem,7vw,7.5rem)" }}>Oooh My.</span>
        <span
          className="block"
          style={{
            fontSize: "clamp(4.5rem,8vw,9.5rem)",
            color: "transparent",
            WebkitTextStroke: "3px hsl(var(--dark))",
          }}
        >
          Pleasure.
        </span>
        <span className="block text-foreground font-black" style={{ fontSize: "clamp(2.8rem,5vw,5.2rem)" }}>
          Unfiltered.
        </span>
      </h1>

      <div className="w-20 h-1 bg-primary my-6 lg:my-8" style={{ animation: "slideUp .5s ease both .3s" }} />

      <p style={{ animation: "slideUp .5s ease both .3s" }}>
        <span
          className="font-display italic font-black block text-[1.2rem] lg:text-[1.35rem] leading-[1.6]"
          style={{ color: "hsl(var(--foreground) / 0.75)" }}
        >
          You weren't supposed to find this.
        </span>
        <span
          className="block text-[1rem] lg:text-[1.1rem] leading-[1.8] mt-1.5"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "hsl(var(--foreground) / 0.55)" }}
        >
          Relax. Nobody needs to know.
        </span>
      </p>

      {/* CTAs */}
      <div className="flex gap-3.5 mt-8 lg:mt-10 flex-wrap" style={{ animation: "slideUp .5s ease both .4s" }}>
        <Link to="/products" className="cta-primary no-underline text-[1.05rem] px-10 py-4">
          Discover the secret →
        </Link>
        <Link to="/our-story" className="cta-secondary no-underline text-[1.05rem] px-8 py-4">
          Our Story
        </Link>
      </div>

      {/* Trust badges row */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 lg:mt-14"
        style={{ animation: "slideUp .5s ease both .5s" }}
      >
        {trustBadges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 bg-cream/60 border-2 border-dark/10 rounded-sm px-3 py-2.5"
          >
            <badge.icon className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
            <span className="font-display italic font-bold text-[0.72rem] text-foreground/70 leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Right — image */}
    <div className="border-l-0 lg:border-l-[5px] border-t-[5px] lg:border-t-0 border-dark relative overflow-hidden flex items-center justify-center min-h-[55vh] lg:min-h-0">
      <img
        src={heroImage}
        alt="Confidential shopping"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover absolute inset-0"
        style={{ objectPosition: "60% top" }}
      />

      {/* Floating badge */}
      <div
        className="absolute bottom-6 left-6 bg-cream/95 border-[3px] border-dark rounded-sm px-5 py-3 shadow-[4px_4px_0_hsl(var(--dark))] z-10 backdrop-blur-sm"
        style={{ animation: "slideUp .6s ease both .7s", transform: "rotate(-2deg)" }}
      >
        <p className="font-display italic font-black text-[0.85rem] text-foreground leading-tight">
          🔥 2,400+ happy customers
        </p>
        <p className="font-serif italic text-[0.7rem] text-muted-foreground mt-0.5">
          Shipped across Europe this month
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
