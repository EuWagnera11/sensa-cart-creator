/**
 * Preloads all site images by injecting <link rel="preload"> into <head>.
 * This is faster than new Image() because the browser's network scheduler
 * picks them up immediately at high priority.
 */

function preloadViaLink(src: string, priority: "high" | "auto" = "auto"): void {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  if (priority === "high") {
    link.setAttribute("fetchpriority", priority);
  }
  document.head.appendChild(link);
}

function collectImageUrls(): string[] {
  const globs = [
    import.meta.glob("@/assets/hero-image.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/hero-illustration.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/banners/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/promos/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire-her.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire/why-not.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/products/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/categories/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/pages/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire-banner.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/club-member-*.webp", { eager: true, import: "default" }),
  ];

  const urls: string[] = [];
  for (const g of globs) {
    for (const val of Object.values(g)) {
      if (typeof val === "string") urls.push(val);
    }
  }
  return urls;
}

/**
 * Injects preload links for ALL images.
 * Hero + banners get fetchpriority="high", rest get auto.
 */
export function preloadAllImages(): void {
  const all = collectImageUrls();
  // First 8 URLs (hero + main banners) get high priority
  all.forEach((src, i) => preloadViaLink(src, i < 8 ? "high" : "auto"));
}
