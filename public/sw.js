// OoohMy Service Worker v2
// Strategy: stale-while-revalidate for images, cache-first for fonts,
// network-first for JS/CSS (with fallback), pass-through for API.

const VERSION = "ooohmy-v2";
const CACHE_IMAGES = `${VERSION}-images`;
const CACHE_FONTS = `${VERSION}-fonts`;
const CACHE_STATIC = `${VERSION}-static`;

const MAX_IMAGE_CACHE_SIZE = 80; // hard cap on # of cached images

// ===== Lifecycle =====
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ===== Helpers =====
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      // Remove oldest entries (FIFO)
      for (let i = 0; i < keys.length - maxItems; i++) {
        await cache.delete(keys[i]);
      }
    }
  } catch {
    /* swallow */
  }
}

async function staleWhileRevalidate(event, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(event.request);
  const fetchPromise = fetch(event.request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(event.request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || fetchPromise;
}

async function cacheFirst(event, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(event.request);
  if (cached) return cached;
  try {
    const response = await fetch(event.request);
    if (response && response.status === 200) {
      cache.put(event.request, response.clone());
    }
    return response;
  } catch {
    return cached || Response.error();
  }
}

// ===== Fetch handler =====
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== "GET") return;

  // Skip API & cross-origin Shopify Storefront API (always fresh)
  if (url.hostname.includes("shopify") || url.hostname.includes("supabase")) {
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Skip the dev server's HMR & vite-internal requests
  if (
    url.pathname.startsWith("/@") ||
    url.pathname.includes("hot-update") ||
    url.search.includes("import") ||
    request.headers.get("accept")?.includes("text/event-stream")
  ) {
    return;
  }

  // ===== Strategy by resource type =====

  // Images: stale-while-revalidate + size cap
  if (
    request.destination === "image" ||
    /\.(webp|jpg|jpeg|png|svg|gif|avif|ico)(\?|$)/i.test(url.pathname)
  ) {
    event.respondWith(
      staleWhileRevalidate(event, CACHE_IMAGES).then((response) => {
        trimCache(CACHE_IMAGES, MAX_IMAGE_CACHE_SIZE);
        return response;
      })
    );
    return;
  }

  // Fonts: cache-first (Google Fonts, etc.)
  if (
    request.destination === "font" ||
    /\.(woff2?|ttf|otf|eot)(\?|$)/i.test(url.pathname) ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(cacheFirst(event, CACHE_FONTS));
    return;
  }

  // Static JS/CSS: stale-while-revalidate
  if (
    /\.(js|css)(\?|$)/i.test(url.pathname) ||
    url.pathname.includes("/assets/")
  ) {
    event.respondWith(staleWhileRevalidate(event, CACHE_STATIC));
    return;
  }
});

// Listen for messages (e.g. clear caches command)
self.addEventListener("message", (event) => {
  if (event.data === "CLEAR_CACHES") {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});
