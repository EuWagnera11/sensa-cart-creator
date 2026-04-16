import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.webp";



const Hero = () => (
  <section className="min-h-[85vh] bg-parch paper-bg grid grid-cols-1 lg:grid-cols-[1fr_1fr] border-b-[5px] border-dark relative overflow-hidden">
    {/* Halftone overlay */}
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(23 100% 5% / 0.6) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    {/* Left — copy */}
    <div className="flex flex-col justify-center px-5 sm:px-10 lg:px-14 xl:px-20 py-10 sm:py-16 lg:py-12 relative z-[2]">
      <h1 className="font-display font-black italic leading-[0.88]" style={{ animation: "slideUp .5s ease both .2s" }}>
        <span className="block text-primary" style={{ fontSize: "clamp(3rem,5.5vw,7.5rem)" }}>Oooh My.</span>
        <span
          className="block"
          style={{
            fontSize: "clamp(3.5rem,6.5vw,9.5rem)",
            color: "transparent",
            WebkitTextStroke: "3px hsl(var(--dark))",
          }}
        >
          Pleasure.
        </span>
        <span className="block text-foreground font-black" style={{ fontSize: "clamp(2.2rem,4vw,5.2rem)" }}>
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
      <div className="flex gap-3 sm:gap-3.5 mt-6 sm:mt-8 lg:mt-10 flex-row flex-wrap" style={{ animation: "slideUp .5s ease both .4s" }}>
        <Link to="/products" className="cta-primary no-underline text-[0.95rem] sm:text-[1.05rem] px-7 sm:px-10 py-3.5 sm:py-4">
          Discover the secret →
        </Link>
        <Link to="/our-story" className="cta-secondary no-underline text-[0.95rem] sm:text-[1.05rem] px-6 sm:px-8 py-3.5 sm:py-4">
          Our Story
        </Link>
      </div>

      {/* Trust badges row */}
    </div>

    {/* Right — image */}
    <div className="border-l-0 lg:border-l-[5px] border-t-[5px] lg:border-t-0 border-dark relative overflow-hidden flex items-center justify-center min-h-[40vh] sm:min-h-[55vh] lg:min-h-0">
      <img
        src={heroImage}
        alt="Confidential shopping"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover absolute inset-0"
        style={{ objectPosition: "60% top" }}
      />

    </div>
  </section>
);

export default Hero;
