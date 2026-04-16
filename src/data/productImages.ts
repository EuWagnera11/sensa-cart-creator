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

// Map product names to their images (products share images across categories)
const imageByName: Record<string, string> = {
  "The OoohMy One": ooohMyImg,
  "Whisper": whisperImg,
  "Thunder": thunderImg,
  "Pocket Rocket": pocketRocketImg,
  "The Together": togetherImg,
  "Date Night": dateNightImg,
  "Long Distance": longDistanceImg,
  "Hot Stuff": hotStuffImg,
  "Silk": silkImg,
  "Natural": naturalImg,
  "Starter Ropes": starterRopesImg,
  "The Director's Kit": directorsKitImg,
  "Silk Blindfold": silkBlindfoldImg,
  "The Set-Up": setUpImg,
  "Curious Kit": curiousKitImg,
  "Red Alert Set": redAlertImg,
  "Ring King": ringKingImg,
};

export const getProductImage = (productName: string): string | undefined => {
  return imageByName[productName];
};
