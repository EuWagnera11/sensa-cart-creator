const CACHE_NAME = "ooohmy-images-v1";

// Cache images on fetch
self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  
  // Only cache image requests and assets
  if (
    event.request.destination === "image" ||
    url.match(/\.(webp|jpg|jpeg|png|svg|gif|avif)(\?|$)/i)
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        
        return fetch(event.request).then((response) => {
          // Only cache successful responses
          if (!response || response.status !== 200) return response;
          
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          
          return response;
        });
      })
    );
  }
});

// Clean old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener("install", () => {
  self.skipWaiting();
});
