/**
 * Preloads all site images into the browser cache on first visit.
 * Uses dynamic glob imports so images are NOT bundled into the main JS chunk.
 */

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function collectImageUrls(): string[] {
  // All globs are eager but only resolve the URL string (default export),
  // NOT the binary — Vite hashes the file and returns the public URL.
  const globs = [
    import.meta.glob("@/assets/hero-image.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/hero-illustration.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/products/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/banners/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/categories/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/promos/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/pages/*.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire-banner.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire-her.webp", { eager: true, import: "default" }),
    import.meta.glob("@/assets/satire-him.webp", { eager: true, import: "default" }),
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
 * Preloads all images in batches to avoid overwhelming the browser.
 * First batch = hero/above-fold, then everything else.
 */
export function preloadAllImages(): void {
  const all = collectImageUrls();
  // Priority: first 2 (hero images) immediately
  const priority = all.slice(0, 2);
  const rest = all.slice(2);

  priority.forEach((src) => preloadImage(src));

  const BATCH_SIZE = 6;
  let index = 0;

  function loadNextBatch() {
    const batch = rest.slice(index, index + BATCH_SIZE);
    if (batch.length === 0) return;

    Promise.all(batch.map(preloadImage)).then(() => {
      index += BATCH_SIZE;
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 100);
      }
    });
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadNextBatch);
  } else {
    setTimeout(loadNextBatch, 500);
  }
}
