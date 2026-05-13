/**
 * Service Worker registration helper.
 *
 * Call once at app startup (from main.tsx). Registers in production,
 * skips in development. Handles update flow.
 */

export function registerServiceWorker() {
  // Skip in dev (Vite already serves with fast HMR — SW would conflict)
  if (import.meta.env.DEV) return;

  if (!("serviceWorker" in navigator)) return;

  // Wait until page is loaded so registration doesn't block paint
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        // Check for updates every hour
        setInterval(() => registration.update(), 60 * 60 * 1000);

        // Handle waiting SW
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      })
      .catch((err) => {
        // Don't show error to user — SW failure shouldn't block the site
        console.warn("[SW] Registration failed:", err);
      });

    // Reload page when new SW takes over
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}
