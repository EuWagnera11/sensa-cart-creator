import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAgeVerified } from "@/hooks/useAgeVerified";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookiePreferencesModal from "./CookiePreferencesModal";

const CookieBanner = () => {
  const { verified } = useAgeVerified();
  const { consent, hydrated, acceptAll, rejectAll } = useCookieConsent();
  const [prefsOpen, setPrefsOpen] = useState(false);

  // Allow other parts of the app to reopen preferences
  useEffect(() => {
    const open = () => setPrefsOpen(true);
    window.addEventListener("om-open-cookie-prefs", open);
    return () => window.removeEventListener("om-open-cookie-prefs", open);
  }, []);

  // Wait for age gate to be passed and hooks to hydrate
  const showBanner = hydrated && verified === true && consent === null;

  return (
    <>
      {showBanner && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[90] bg-cream border-t-[4px] border-dark shadow-[0_-4px_0_hsl(var(--primary))]"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex-1 min-w-0">
              <p className="font-display font-black italic text-dark text-base sm:text-lg leading-tight mb-1">
                Cookies, but make it transparent.
              </p>
              <p className="font-serif italic text-dark/70 text-xs sm:text-sm leading-relaxed">
                We use essential cookies to run the site. Analytics, marketing & personalization are optional —
                your call. Read the{" "}
                <Link to="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>{" "}
                for the full breakdown.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={rejectAll}
                className="cta-secondary px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={() => setPrefsOpen(true)}
                className="cta-secondary px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="cta-primary px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      <CookiePreferencesModal open={prefsOpen} onClose={() => setPrefsOpen(false)} />
    </>
  );
};

export default CookieBanner;
