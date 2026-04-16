import ooohMyImg from "@/assets/products/the-ooohmy-one-full.jpg";
import whisperImg from "@/assets/products/whisper.jpg";
import thunderImg from "@/assets/products/thunder.jpg";
import pocketRocketImg from "@/assets/products/pocket-rocket.jpg";
import togetherImg from "@/assets/products/the-together-full.jpg";
import dateNightImg from "@/assets/products/date-night.jpg";
import longDistanceImg from "@/assets/products/long-distance.jpg";
import hotStuffImg from "@/assets/products/hot-stuff-full.jpg";
import silkImg from "@/assets/products/silk.jpg";
import naturalImg from "@/assets/products/natural.jpg";
import starterRopesImg from "@/assets/products/starter-ropes.jpg";
import directorsKitImg from "@/assets/products/directors-kit.jpg";
import silkBlindfoldImg from "@/assets/products/silk-blindfold.jpg";
import setUpImg from "@/assets/products/the-set-up-full.jpg";
import curiousKitImg from "@/assets/products/curious-kit.jpg";
import redAlertImg from "@/assets/products/red-alert-set.jpg";
import ringKingImg from "@/assets/products/ring-king.jpg";

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
