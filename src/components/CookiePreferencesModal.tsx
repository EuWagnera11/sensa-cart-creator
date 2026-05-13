import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  CookieConsent,
  DEFAULT_ACCEPTED,
  DEFAULT_REJECTED,
  useCookieConsent,
} from "@/hooks/useCookieConsent";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES: {
  key: keyof CookieConsent;
  title: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    key: "essential",
    title: "Essential",
    description:
      "Required for the site to function: cart, login, age verification. Cannot be disabled.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Helps us understand which pages people visit so we can fix what's broken and improve what works.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Used by ad partners to show you relevant promotions on other sites. Off by default.",
  },
  {
    key: "personalization",
    title: "Personalization",
    description:
      "Remembers preferences (size, colour, recently viewed) so you don't have to set them again.",
  },
];

const CookiePreferencesModal = ({ open, onClose }: Props) => {
  const { consent, save } = useCookieConsent();
  const [draft, setDraft] = useState<CookieConsent>(consent ?? DEFAULT_REJECTED);

  useEffect(() => {
    if (open) setDraft(consent ?? DEFAULT_REJECTED);
  }, [open, consent]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock scroll while modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const toggle = (key: keyof CookieConsent) => {
    if (key === "essential") return;
    setDraft((d) => ({ ...d, [key]: !d[key] }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-cream border-[5px] border-dark shadow-[8px_8px_0_hsl(var(--primary))]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-dark/10 transition-colors"
          aria-label="Close cookie preferences"
        >
          <X size={20} className="text-dark" />
        </button>

        <div className="p-6 sm:p-8">
          <p className="section-kicker text-primary mb-2">Your call</p>
          <h2
            id="cookie-prefs-title"
            className="font-display font-black italic text-dark leading-none mb-3"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)" }}
          >
            Cookie preferences.
          </h2>
          <p className="font-serif italic text-dark/70 text-sm mb-6">
            Pick what you're comfortable with. You can change this anytime from the Privacy Policy page.
          </p>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const enabled = draft[cat.key];
              return (
                <div
                  key={cat.key}
                  className="border-[3px] border-dark p-4 flex items-start gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-display font-black italic text-dark text-lg mb-1">
                      {cat.title}
                      {cat.locked && (
                        <span className="ml-2 font-serif italic text-xs text-dark/50 not-italic">
                          (always on)
                        </span>
                      )}
                    </h3>
                    <p className="font-serif italic text-xs text-dark/60 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(cat.key)}
                    disabled={cat.locked}
                    aria-pressed={enabled}
                    aria-label={`Toggle ${cat.title}`}
                    className={`relative shrink-0 w-12 h-7 border-[2px] border-dark transition-colors ${
                      enabled ? "bg-primary" : "bg-cream"
                    } ${cat.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-cream border-[2px] border-dark transition-transform ${
                        enabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                save(DEFAULT_REJECTED);
                onClose();
              }}
              className="cta-secondary px-4 py-2.5 text-sm"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={() => {
                save(DEFAULT_ACCEPTED);
                onClose();
              }}
              className="cta-secondary px-4 py-2.5 text-sm"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => {
                save(draft);
                onClose();
              }}
              className="cta-primary px-4 py-2.5 text-sm"
            >
              Save choices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
