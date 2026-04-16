import buzzBanner1 from "@/assets/banners/buzz-banner-1.jpg";
import buzzBanner2 from "@/assets/banners/buzz-banner-2.jpg";
import duoBanner1 from "@/assets/banners/duo-banner-1.jpg";
import duoBanner2 from "@/assets/banners/duo-banner-2.jpg";
import slipperyBanner1 from "@/assets/banners/slippery-banner-1.jpg";
import slipperyBanner2 from "@/assets/banners/slippery-banner-2.jpg";
import tiedBanner1 from "@/assets/banners/tied-banner-1.jpg";
import tiedBanner2 from "@/assets/banners/tied-banner-2.jpg";
import newbieBanner1 from "@/assets/banners/newbie-banner-1.jpg";
import newbieBanner2 from "@/assets/banners/newbie-banner-2.jpg";
import oopsBanner1 from "@/assets/banners/oops-banner-1.jpg";
import oopsBanner2 from "@/assets/banners/oops-banner-2.jpg";
import justInBanner1 from "@/assets/banners/just-in-banner-1.jpg";
import justInBanner2 from "@/assets/banners/just-in-banner-2.jpg";
import soloBanner1 from "@/assets/banners/solo-banner-1.jpg";
import soloBanner2 from "@/assets/banners/solo-banner-2.jpg";
import pushItBanner1 from "@/assets/banners/push-it-banner-1.jpg";
import pushItBanner2 from "@/assets/banners/push-it-banner-2.jpg";
import playtimeBanner1 from "@/assets/banners/playtime-banner-1.jpg";
import playtimeBanner2 from "@/assets/banners/playtime-banner-2.jpg";

export interface BannerSlide {
  image: string;
  headline: string;
  sub: string;
}

const categoryBanners: Record<string, BannerSlide[]> = {
  buzz: [
    { image: buzzBanner1, headline: "Feel the power.", sub: "10 modes. Zero apologies." },
    { image: buzzBanner2, headline: "Waves of pleasure.", sub: "Engineered to perfection." },
  ],
  duo: [
    { image: duoBanner1, headline: "Better together.", sub: "Designed for two." },
    { image: duoBanner2, headline: "Cheers to tonight.", sub: "Make it unforgettable." },
  ],
  slippery: [
    { image: slipperyBanner1, headline: "Smooth operator.", sub: "Premium gels & lubes." },
    { image: slipperyBanner2, headline: "Every drop counts.", sub: "Silky. Lasting. Perfect." },
  ],
  tied: [
    { image: tiedBanner1, headline: "Control or surrender.", sub: "Your rules. Your game." },
    { image: tiedBanner2, headline: "Crafted restraint.", sub: "Premium bondage gear." },
  ],
  newbie: [
    { image: newbieBanner1, headline: "Start here.", sub: "Curated kits for beginners." },
    { image: newbieBanner2, headline: "Pick your pleasure.", sub: "No judgement. Just fun." },
  ],
  oops: [
    { image: oopsBanner1, headline: "Flash Sale.", sub: "Up to 52% off." },
    { image: oopsBanner2, headline: "Grab before gone.", sub: "Limited stock deals." },
  ],
  "just-in": [
    { image: justInBanner1, headline: "Fresh trouble.", sub: "Just landed. First dibs." },
    { image: justInBanner2, headline: "Unwrap the new.", sub: "Premium drops, hot off the shelf." },
  ],
  solo: [
    { image: soloBanner1, headline: "Me, myself & wow.", sub: "No audience needed." },
    { image: soloBanner2, headline: "Self-care levelled up.", sub: "Treat yourself. You deserve it." },
  ],
  "push-it": [
    { image: pushItBanner1, headline: "A little further.", sub: "Kink & sensation, refined." },
    { image: pushItBanner2, headline: "Blindfold the ordinary.", sub: "Explore what excites you." },
  ],
  playtime: [
    { image: playtimeBanner1, headline: "You make the rules.", sub: "Accessories & play essentials." },
    { image: playtimeBanner2, headline: "Game on.", sub: "Set the mood. Roll the dice." },
  ],
};

export const getCategoryBanners = (slug: string): BannerSlide[] =>
  categoryBanners[slug] || [];

export default categoryBanners;
