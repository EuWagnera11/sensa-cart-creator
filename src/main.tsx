import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadAllImages } from "./lib/imagePreloader";
import { registerServiceWorker } from "./lib/registerSW";

// Preload ALL images BEFORE React even starts rendering
preloadAllImages();

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker (production only — see registerSW.ts)
registerServiceWorker();
