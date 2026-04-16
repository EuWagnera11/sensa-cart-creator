import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadAllImages } from "./lib/imagePreloader";

// Preload ALL images BEFORE React even starts rendering
preloadAllImages();

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for persistent image caching
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // SW registration failed silently — images still preloaded via JS
    });
  });
}
