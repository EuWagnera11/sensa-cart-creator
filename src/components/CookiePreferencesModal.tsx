import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryConfig {
  id: "necessary" | "analytics" | "marketing" | "personalization";
  name: string;
  description: string;
  required: boolean;
  examples: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "necessary",
    name: "Essentials",
    description:
      "Required for the site to work — cart, checkout, login, security. Can't be turned off.",
    required: true,
    examples: "Session, cart, CSRF protection",
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Helps us understand what's working (which pages get love, where people drop off). Aggregated, never sold.",
    required: false,
    examples: "Page views, click events, performance",
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Lets us show you ads on other sites that are actually relevant — and skip the ones that aren't.",
    required: false,
    examples: "Remarketing, conversion tracking",
  },
  {
    id: "personalization",
    name: "Personalization",
    description:
      "Remembers what you liked so the homepage doesn't show you the same thing twice.",
    required: false,
    examples: "Recently viewed, recommendations",
  },
];

// Toggle Switch — inline styles only, no Tailwind classes (avoids any purge/conflict)
interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label: string;
}

const Toggle = ({ checked, onChange, disabled, label }: ToggleProps) => {
  const TRACK_W = 56;
  const TRACK_H = 32;
  const KNOB = 22;
  const BORDER = 2;
  const PAD = (TRACK_H - KNOB - BORDER * 2) / 2;
  const knobLeftOff = PAD;
  const knobLeftOn = TRACK_W - KNOB - PAD - BORDER * 2;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      style={{
        position: "relative",
        flexShrink: 0,
        display: "inline-block",
        width: `${TRACK_W}px`,
        height: `${TRACK_H}px`,
        minWidth: `${TRACK_W}px`,
        backgroundColor: checked ? "hsl(var(--primary))" : "hsl(var(--cream))",
        border: `${BORDER}px solid hsl(var(--dark))`,
        borderRadius: "9999px",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color 200ms ease",
        boxShadow: "2px 2px 0 hsl(var(--dark))",
        verticalAlign: "middle",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: `${PAD}px`,
          left: checked ? `${knobLeftOn}px` : `${knobLeftOff}px`,
          width: `${KNOB}px`,
          height: `${KNOB}px`,
          backgroundColor: "hsl(var(--dark))",
          borderRadius: "9999px",
          transition: "left 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          display: "block",
        }}
      />
    </button>
  );
};

const CookiePreferencesModal = ({ isOpen, onClose }: Props) => {
  const { consent, updateConsent } = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [personalization, setPersonalization] = useState(false);

  useEffect(() => {
    if (isOpen && consent) {
      setAnalytics(!!consent.analytics);
      setMarketing(!!consent.marketing);
      setPersonalization(!!consent.personalization);
    }
  }, [isOpen, consent]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const save = () => {
    updateConsent({ analytics, marketing, personalization });
    onClose();
  };

  const acceptAll = () => {
    updateConsent({ analytics: true, marketing: true, personalization: true });
    onClose();
  };

  const rejectAll = () => {
    updateConsent({ analytics: false, marketing: false, personalization: false });
    onClose();
  };

  const getValue = (id: CategoryConfig["id"]) => {
    if (id === "necessary") return true;
    if (id === "analytics") return analytics;
    if (id === "marketing") return marketing;
    return personalization;
  };

  const toggle = (id: CategoryConfig["id"]) => {
    if (id === "analytics") setAnalytics((v) => !v);
    if (id === "marketing") setMarketing((v) => !v);
    if (id === "personalization") setPersonalization((v) => !v);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center px-3 sm:px-6 py-4 sm:py-8"
    >
      <div
        className="absolute inset-0 bg-dark/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-[640px] max-h-[92vh] flex flex-col bg-cream border-[4px] border-dark rounded-sm overflow-hidden"
        style={{ boxShadow: "10px 10px 0 hsl(var(--dark))" }}
      >
        {/* Header */}
        <div className="bg-dark border-b-[4px] border-primary px-6 py-4 flex items-center justify-between shrink-0">
          <h2
            id="cookie-prefs-title"
            className="font-display italic font-black text-cream text-xl"
          >
            Cookie preferences
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-cream/70 hover:text-cream transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <p className="font-serif italic text-sm text-foreground/80 leading-relaxed mb-4">
            Pick what stays and what goes. Essentials always run — without them
            the cart wouldn't even open. Everything else is up to you.
          </p>

          {CATEGORIES.map((cat) => {
            const value = getValue(cat.id);
            return (
              <div
                key={cat.id}
                className="border-[3px] border-dark rounded-sm p-4 bg-parch"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-display italic font-black text-dark text-base">
                        {cat.name}
                      </h3>
                      {cat.required && (
                        <span className="inline-block text-[10px] font-display italic font-black uppercase tracking-wider bg-dark text-cream px-1.5 py-0.5 rounded-sm">
                          Always on
                        </span>
                      )}
                    </div>
                    <p className="font-serif italic text-xs text-foreground/80 leading-relaxed mb-1">
                      {cat.description}
                    </p>
                    <p className="font-serif text-[11px] text-muted-foreground">
                      Examples: {cat.examples}
                    </p>
                  </div>

                  <Toggle
                    checked={value}
                    onChange={() => !cat.required && toggle(cat.id)}
                    disabled={cat.required}
                    label={`Toggle ${cat.name}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-cream border-t-[3px] border-dark px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0">
          <button
            type="button"
            onClick={rejectAll}
            className="cta-secondary px-3 py-2.5 text-xs font-display italic font-black uppercase tracking-wider"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={save}
            className="cta-secondary px-3 py-2.5 text-xs font-display italic font-black uppercase tracking-wider"
          >
            Save my choice
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="cta-primary px-3 py-2.5 text-xs font-display italic font-black uppercase tracking-wider"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
