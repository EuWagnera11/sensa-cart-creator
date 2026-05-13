import { useEffect, useState, useCallback } from "react";

const KEY = "om_cookie_consent";
const TTL_MS = 13 * 30 * 24 * 60 * 60 * 1000; // 13 months (CNIL)

export interface CookieConsent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

interface Stored {
  consent: CookieConsent;
  ts: number;
}

export const DEFAULT_REJECTED: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  personalization: false,
};

export const DEFAULT_ACCEPTED: CookieConsent = {
  essential: true,
  analytics: true,
  marketing: true,
  personalization: true,
};

function read(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (Date.now() - parsed.ts > TTL_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return { ...parsed.consent, essential: true };
  } catch {
    return null;
  }
}

function write(consent: CookieConsent) {
  try {
    const data: Stored = { consent, ts: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("om-consent-changed", { detail: consent }));
  } catch {
    /* ignore */
  }
}

/**
 * SSR-safe cookie consent hook. `consent` is null until hydrated and
 * also null when the user hasn't made a choice yet (banner should show).
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(read());
    setHydrated(true);
    const sync = () => setConsent(read());
    window.addEventListener("om-consent-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("om-consent-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((next: CookieConsent) => {
    write(next);
    setConsent(next);
  }, []);

  const acceptAll = useCallback(() => save(DEFAULT_ACCEPTED), [save]);
  const rejectAll = useCallback(() => save(DEFAULT_REJECTED), [save]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setConsent(null);
  }, []);

  return { consent, hydrated, save, acceptAll, rejectAll, reset };
}

export function useAnalyticsAllowed() {
  const { consent } = useCookieConsent();
  return consent?.analytics ?? false;
}

export function useMarketingAllowed() {
  const { consent } = useCookieConsent();
  return consent?.marketing ?? false;
}

export function usePersonalizationAllowed() {
  const { consent } = useCookieConsent();
  return consent?.personalization ?? false;
}
