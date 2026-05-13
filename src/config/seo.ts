/**
 * Centralized SEO/site config.
 *
 * When you point the production domain at the site, change SITE_URL here
 * and every canonical URL, OG tag, sitemap entry, and JSON-LD reference
 * will follow automatically.
 *
 * Optionally support env override at build time so different environments
 * (preview, staging, prod) can use different URLs without code changes.
 */

export const SITE_URL =
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== "undefined" && window.location.origin) ||
  "https://ooohmy.lovable.app"; // placeholder while in sandbox

export const SITE_NAME = "OoohMy";

export const SITE_TAGLINE = "Pleasure, Unfiltered";

export const DEFAULT_DESCRIPTION =
  "Vibrators, lubes, bondage & more — discreet shipping across Europe, body-safe products, zero judgement. Free EU delivery over €50.";

export const DEFAULT_KEYWORDS = [
  "adult store EU",
  "sex toys Europe",
  "discreet shipping",
  "body-safe pleasure products",
  "vibrators",
  "couples toys",
  "intimate wellness",
];

export const TWITTER_HANDLE = "@ooohmy"; // update when you have one

// Default OG image — replace with your own production image
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

// Brand colors for PWA + meta tags
export const THEME_COLOR = "#D63838"; // primary red
export const BACKGROUND_COLOR = "#F6EBD3"; // parch
