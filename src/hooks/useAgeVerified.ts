import { useEffect, useState, useCallback } from "react";

const KEY = "om_age_verified";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const TTL_SECONDS = Math.floor(TTL_MS / 1000);

interface Stored {
  verified: boolean;
  ts: number;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function cookiesAvailable(): boolean {
  if (typeof document === "undefined" || typeof navigator === "undefined") return false;
  if (navigator.cookieEnabled === false) return false;
  try {
    document.cookie = "om_cookie_probe=1; Max-Age=60; Path=/; SameSite=Lax";
    const available = document.cookie.includes("om_cookie_probe=1");
    document.cookie = "om_cookie_probe=; Max-Age=0; Path=/; SameSite=Lax";
    return available;
  } catch {
    return false;
  }
}

function parseStored(raw: string | null): Stored | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

function isValid(parsed: Stored | null): boolean {
  if (!parsed?.verified) return false;
  return Date.now() - parsed.ts <= TTL_MS;
}

function read(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const fromCookie = parseStored(getCookie(KEY));

    if (fromCookie) {
      if (isValid(fromCookie)) return true;
      expireCookie();
      localStorage.removeItem(KEY);
      return false;
    }

    if (cookiesAvailable()) {
      localStorage.removeItem(KEY);
      return false;
    }

    const fromStorage = parseStored(localStorage.getItem(KEY));
    return isValid(fromStorage);
  } catch {
    return false;
  }
}

function expireCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function write(data: Stored) {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const json = JSON.stringify(data);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${KEY}=${encodeURIComponent(json)}; Max-Age=${TTL_SECONDS}; Path=/; SameSite=Lax${secure}`;
  localStorage.setItem(KEY, json);
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
      write(data);
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
