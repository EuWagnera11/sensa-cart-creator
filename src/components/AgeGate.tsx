import { useEffect } from "react";
import { useAgeVerified } from "@/hooks/useAgeVerified";

const AgeGate = () => {
  const { verified, confirm, reject } = useAgeVerified();

  // Lock body scroll while gate is shown
  useEffect(() => {
    if (verified === false) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [verified]);

  if (verified !== false) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/95 backdrop-blur-sm"
    >
      {/* Halftone backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--accent) / 0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-lg w-full bg-cream border-[5px] border-dark shadow-[10px_10px_0_hsl(var(--primary))] p-8 sm:p-10 text-center">
        <p className="section-kicker text-primary mb-3">Hold up, sweetheart</p>
        <h2
          id="age-gate-title"
          className="font-display font-black italic text-dark leading-none mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
        >
          Are you 18+?
        </h2>
        <p className="font-serif italic text-dark/70 text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto">
          This site contains adult products and explicit imagery. By entering you confirm you're of legal age in your country.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={confirm}
            className="cta-primary px-8 py-3 text-base"
          >
            Yes, I'm 18+
          </button>
          <button
            type="button"
            onClick={reject}
            className="cta-secondary px-8 py-3 text-base"
          >
            Not yet
          </button>
        </div>

        <p className="font-serif italic text-xs text-dark/40 mt-6">
          We'll remember your answer for 30 days. No tracking, just a tiny note in your browser.
        </p>
      </div>
    </div>
  );
};

export default AgeGate;
