/**
 * Preloads all site images into the browser cache on first visit.
 * Images are loaded in the background without blocking rendering.
 */

// Product images
import ooohMyImg from "@/assets/products/the-ooohmy-one-full.webp";
import whisperImg from "@/assets/products/whisper.webp";
import thunderImg from "@/assets/products/thunder.webp";
import pocketRocketImg from "@/assets/products/pocket-rocket.webp";
import togetherImg from "@/assets/products/the-together-full.webp";
import dateNightImg from "@/assets/products/date-night.webp";
import longDistanceImg from "@/assets/products/long-distance.webp";
import hotStuffImg from "@/assets/products/hot-stuff-full.webp";
import silkImg from "@/assets/products/silk.webp";
import naturalImg from "@/assets/products/natural.webp";
import starterRopesImg from "@/assets/products/starter-ropes.webp";
import directorsKitImg from "@/assets/products/directors-kit.webp";
import silkBlindfoldImg from "@/assets/products/silk-blindfold.webp";
import setUpImg from "@/assets/products/the-set-up-full.webp";
import curiousKitImg from "@/assets/products/curious-kit.webp";
import redAlertImg from "@/assets/products/red-alert-set.webp";
import ringKingImg from "@/assets/products/ring-king.webp";

// Banner images
import buzzBanner1 from "@/assets/banners/buzz-banner-1.webp";
import buzzBanner2 from "@/assets/banners/buzz-banner-2.webp";
import duoBanner1 from "@/assets/banners/duo-banner-1.webp";
import duoBanner2 from "@/assets/banners/duo-banner-2.webp";
import slipperyBanner1 from "@/assets/banners/slippery-banner-1.webp";
import slipperyBanner2 from "@/assets/banners/slippery-banner-2.webp";
import tiedBanner1 from "@/assets/banners/tied-banner-1.webp";
import tiedBanner2 from "@/assets/banners/tied-banner-2.webp";
import newbieBanner1 from "@/assets/banners/newbie-banner-1.webp";
import newbieBanner2 from "@/assets/banners/newbie-banner-2.webp";
import oopsBanner1 from "@/assets/banners/oops-banner-1.webp";
import oopsBanner2 from "@/assets/banners/oops-banner-2.webp";
import justInBanner1 from "@/assets/banners/just-in-banner-1.webp";
import justInBanner2 from "@/assets/banners/just-in-banner-2.webp";
import soloBanner1 from "@/assets/banners/solo-banner-1.webp";
import soloBanner2 from "@/assets/banners/solo-banner-2.webp";
import pushItBanner1 from "@/assets/banners/push-it-banner-1.webp";
import pushItBanner2 from "@/assets/banners/push-it-banner-2.webp";
import playtimeBanner1 from "@/assets/banners/playtime-banner-1.webp";
import playtimeBanner2 from "@/assets/banners/playtime-banner-2.webp";

// Hero & misc images
import heroImage from "@/assets/hero-image.webp";
import heroIllustration from "@/assets/hero-illustration.webp";
import satireBanner from "@/assets/satire-banner.webp";
import satireHer from "@/assets/satire-her.webp";
import satireHim from "@/assets/satire-him.webp";
import clubMember1 from "@/assets/club-member-1.webp";
import clubMember2 from "@/assets/club-member-2.webp";
import clubMember3 from "@/assets/club-member-3.webp";

// Category images
const categoryModules = import.meta.glob("@/assets/categories/*.webp", { eager: true, import: "default" });
const categoryImages = Object.values(categoryModules) as string[];

// Promo images
const promoModules = import.meta.glob("@/assets/promos/*.webp", { eager: true, import: "default" });
const promoImages = Object.values(promoModules) as string[];

// Satire folder images
const satireModules = import.meta.glob("@/assets/satire/*.webp", { eager: true, import: "default" });
const satireImages = Object.values(satireModules) as string[];

// Page images
const pageModules = import.meta.glob("@/assets/pages/*.webp", { eager: true, import: "default" });
const pageImages = Object.values(pageModules) as string[];

const ALL_IMAGES: string[] = [
  // Hero & top-fold (highest priority)
  heroImage, heroIllustration,
  // Products
  ooohMyImg, whisperImg, thunderImg, pocketRocketImg, togetherImg,
  dateNightImg, longDistanceImg, hotStuffImg, silkImg, naturalImg,
  starterRopesImg, directorsKitImg, silkBlindfoldImg, setUpImg,
  curiousKitImg, redAlertImg, ringKingImg,
  // Satire misc
  satireBanner, satireHer, satireHim,
  // Club
  clubMember1, clubMember2, clubMember3,
  // Banners
  buzzBanner1, buzzBanner2, duoBanner1, duoBanner2,
  slipperyBanner1, slipperyBanner2, tiedBanner1, tiedBanner2,
  newbieBanner1, newbieBanner2, oopsBanner1, oopsBanner2,
  justInBanner1, justInBanner2, soloBanner1, soloBanner2,
  pushItBanner1, pushItBanner2, playtimeBanner1, playtimeBanner2,
  // Dynamic globs
  ...categoryImages,
  ...promoImages,
  ...satireImages,
  ...pageImages,
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // don't block on errors
    img.src = src;
  });
}

/**
 * Preloads all images in batches to avoid overwhelming the browser.
 * First batch = hero/above-fold, then everything else.
 */
export function preloadAllImages(): void {
  // Priority: first 2 images (hero) immediately
  const priority = ALL_IMAGES.slice(0, 2);
  const rest = ALL_IMAGES.slice(2);

  // Load priority images right away
  priority.forEach((src) => preloadImage(src));

  // Load the rest in batches of 6 after a short delay
  const BATCH_SIZE = 6;
  let index = 0;

  function loadNextBatch() {
    const batch = rest.slice(index, index + BATCH_SIZE);
    if (batch.length === 0) return;
    
    Promise.all(batch.map(preloadImage)).then(() => {
      index += BATCH_SIZE;
      // Use requestIdleCallback if available, otherwise setTimeout
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 100);
      }
    });
  }

  // Start background loading after first paint
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadNextBatch);
  } else {
    setTimeout(loadNextBatch, 500);
  }
}
