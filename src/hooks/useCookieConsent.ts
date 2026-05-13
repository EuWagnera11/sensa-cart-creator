import { useEffect, useState, useCallback } from "react";

const KEY = "om_cookie_consent";
const TTL_MS = 13 * 30 * 24 * 60 * 60 * 1000; // 13 months (CNIL)
const TTL_SECONDS = Math.floor(TTL_MS / 1000);

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

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function clearLegacyStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

function expireCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function readFromLocalStorage(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

function read(): CookieConsent | null {
  try {
    const raw = getCookie(KEY);
    let parsed: Stored | null = null;
    if (raw) {
      try {
        parsed = JSON.parse(raw) as Stored;
      } catch {
        parsed = null;
      }
    }
    // Fallback to localStorage (iframe / cookie-blocked contexts)
    if (!parsed) parsed = readFromLocalStorage();
    if (!parsed) return null;
    if (Date.now() - parsed.ts > TTL_MS) {
      expireCookie();
      try { localStorage.removeItem(KEY); } catch { /* ignore */ }
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
    const json = JSON.stringify(data);
    const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${KEY}=${encodeURIComponent(json)}; Max-Age=${TTL_SECONDS}; Path=/; SameSite=Lax${secure}`;
    // Also persist to localStorage as fallback for iframe / cookie-blocked contexts
    try { localStorage.setItem(KEY, json); } catch { /* ignore */ }
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
    expireCookie();
    clearLegacyStorage();
    window.dispatchEvent(new Event("om-consent-changed"));
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
