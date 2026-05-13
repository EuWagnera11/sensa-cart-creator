import { useEffect, useState, useCallback } from "react";

const KEY = "om_age_verified";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface Stored {
  verified: boolean;
  ts: number;
}

function read(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed.verified) return false;
    if (Date.now() - parsed.ts > TTL_MS) {
      localStorage.removeItem(KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * SSR-safe age verification. Returns null during initial hydration to avoid
 * flashing the gate before localStorage is available.
 */
export function useAgeVerified() {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    setVerified(read());
    const sync = () => setVerified(read());
    window.addEventListener("om-age-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("om-age-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const confirm = useCallback(() => {
    try {
      const data: Stored = { verified: true, ts: Date.now() };
      localStorage.setItem(KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("om-age-changed"));
    } catch {
      /* ignore */
    }
    setVerified(true);
  }, []);

  const reject = useCallback(() => {
    window.location.href = "https://www.google.com";
  }, []);

  return { verified, confirm, reject };
}
