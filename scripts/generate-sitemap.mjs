#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from listing_handles.json + static routes.
 *
 * Runs automatically before every `npm run build` via the "prebuild" script.
 * Reads SITE_URL from env (VITE_SITE_URL) or falls back to placeholder.
 *
 * Sitemap protocol: https://www.sitemaps.org/protocol.html
 * Limits: max 50k URLs and 50MB per file (we're well under both).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SITE_URL =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://ooohmy.lovable.app";

// Strip trailing slash so we don't generate //paths
const base = SITE_URL.replace(/\/+$/, "");

// ===== Static routes =====
// Listed with relative priority and change frequency.
const staticRoutes = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/shop", priority: 0.9, changefreq: "daily" },
  { path: "/category/buzz", priority: 0.8, changefreq: "daily" },
  { path: "/category/duo", priority: 0.8, changefreq: "daily" },
  { path: "/category/slippery", priority: 0.8, changefreq: "daily" },
  { path: "/category/tied", priority: 0.8, changefreq: "daily" },
  { path: "/category/newbie", priority: 0.8, changefreq: "daily" },
  { path: "/our-story", priority: 0.5, changefreq: "monthly" },
  { path: "/no-judgment", priority: 0.4, changefreq: "monthly" },
  { path: "/press", priority: 0.3, changefreq: "monthly" },
  { path: "/affiliates", priority: 0.3, changefreq: "monthly" },
  { path: "/faq", priority: 0.5, changefreq: "monthly" },
  { path: "/contact", priority: 0.4, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changefreq: "yearly" },
  { path: "/terms-of-use", priority: 0.2, changefreq: "yearly" },
  { path: "/refund-policy", priority: 0.2, changefreq: "yearly" },
  { path: "/impressum", priority: 0.2, changefreq: "yearly" },
];

// ===== Products from listing_handles.json =====
let productHandles = [];
try {
  const raw = readFileSync(resolve(ROOT, "src/data/listing_handles.json"), "utf8");
  const parsed = JSON.parse(raw);
  productHandles = Array.isArray(parsed) ? parsed : parsed.handles || [];
  console.log(`✓ Found ${productHandles.length} product handles`);
} catch (err) {
  console.warn("⚠ Could not read listing_handles.json — sitemap will be missing products");
  console.warn(`  ${err.message}`);
}

// ===== Build XML =====
const today = new Date().toISOString().split("T")[0];

const escapeXml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const urlEntry = (loc, priority, changefreq, lastmod = today) =>
  `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;

const entries = [];

// Static routes
for (const r of staticRoutes) {
  entries.push(urlEntry(`${base}${r.path}`, r.priority, r.changefreq));
}

// Product routes — priority 0.6, weekly (products updated regularly)
for (const handle of productHandles) {
  if (!handle || typeof handle !== "string") continue;
  entries.push(urlEntry(`${base}/shop/product/${handle}`, 0.6, "weekly"));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

// ===== Write =====
const outPath = resolve(ROOT, "public/sitemap.xml");
writeFileSync(outPath, xml);

const sizeKb = Buffer.byteLength(xml) / 1024;
console.log(`✓ Wrote sitemap.xml (${entries.length} URLs, ${sizeKb.toFixed(1)} KB)`);
console.log(`  → ${outPath}`);
console.log(`  → SITE_URL = ${base}`);
