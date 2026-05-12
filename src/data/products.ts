export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  collection: string;
  emoji: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  sticker?: string;
  features: string[];
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  collection: string;
  desc: string;
  count: number;
  color: string;
  darkText?: boolean;
}

export const categories: Category[] = [
  { slug: "buzz", name: "Buzz", emoji: "⚡", collection: "Legs will tremble", desc: "Vibrators", count: 12, color: "bg-cat-buzz" },
  { slug: "duo", name: "Duo", emoji: "🔥", collection: "Better together", desc: "For couples", count: 8, color: "bg-cat-duo" },
  { slug: "slippery", name: "Slippery", emoji: "🌶️", collection: "Things get interesting", desc: "Gels & lubes", count: 6, color: "bg-cat-slippery" },
  { slug: "tied", name: "Tied", emoji: "🖤", collection: "Control or surrender", desc: "Bondage", count: 7, color: "bg-cat-tied" },
  { slug: "newbie", name: "Newbie", emoji: "🗝️", collection: "Just start", desc: "Starter kits", count: 5, color: "bg-cat-newbie" },

  { slug: "oops", name: "Oops", emoji: "🔥", collection: "Hard to resist", desc: "Sale", count: 10, color: "bg-cat-browsing" },
];

export const products: Product[] = [
  // BUZZ
  { id: "b1", name: "The OoohMy One", slug: "the-ooohmy-one", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "⚡", description: '"Your neighbours will know. That\'s their problem."', longDescription: "Premium vibrator with 10 vibration modes, medical-grade silicone, waterproof and ultra-quiet. Because pleasure doesn't need alarms.", price: 79, sticker: "Fan Fave 🔥", features: ["10 vibration modes", "Medical-grade silicone", "IPX7 waterproof", "Ultra-quiet motor", "USB rechargeable", "Travel pouch included"], images: ["⚡"], inStock: true, rating: 4.9, reviews: 342 },
  { id: "b2", name: "Whisper", slug: "whisper", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "🤫", description: '"So quiet, your flatmate will never know."', longDescription: "The most discreet vibrator on the market. Whisper-quiet motor with surprising power. Perfect for thin-walled flats.", price: 59, features: ["Whisper-quiet motor", "7 modes", "Compact design", "Premium silicone", "Magnetic charging"], images: ["🤫"], inStock: true, rating: 4.7, reviews: 189 },
  { id: "b3", name: "Thunder", slug: "thunder", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "⛈️", description: '"Warning: May cause noise complaints."', longDescription: "For those who don't care what the neighbours think. Maximum power, ergonomic design, 12 intense vibration patterns.", price: 99, originalPrice: 129, sticker: "Sale 🏷️", features: ["12 intense patterns", "Maximum power", "Ergonomic design", "Dual motor", "3h battery life"], images: ["⛈️"], inStock: true, rating: 4.8, reviews: 256 },
  { id: "b4", name: "Pocket Rocket", slug: "pocket-rocket", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "🚀", description: '"Small but deadly. In a good way."', longDescription: "Fits in your bag, your pocket, anywhere. Mini size, maxi pleasure. The perfect travel companion.", price: 39, features: ["Ultra compact", "5 modes", "Discreet", "Travel-friendly", "Batteries included"], images: ["🚀"], inStock: true, rating: 4.5, reviews: 412 },

  // DUO
  { id: "d1", name: "The Together", slug: "the-together", category: "Duo", categorySlug: "duo", collection: "Two's Company", emoji: "💑", description: '"Two is always better. We rest our case."', longDescription: "Designed for couples who want to elevate the experience. Dual stimulation, app-controlled remote and synchronised vibration.", price: 129, sticker: "Best Seller 👑", features: ["Dual stimulation", "App remote control", "Synchronised vibration", "Flexible silicone", "10 couples modes"], images: ["💑"], inStock: true, rating: 4.9, reviews: 523 },
  { id: "d2", name: "Date Night", slug: "date-night", category: "Duo", categorySlug: "duo", collection: "Two's Company", emoji: "🍷", description: '"Netflix and... oh."', longDescription: "The perfect kit for special evenings. Includes couples vibrator, massage candle and idea guide. All in gift-ready packaging.", price: 89, features: ["Complete kit", "Massage candle included", "Idea guide", "Gift packaging", "Dual vibrator"], images: ["🍷"], inStock: true, rating: 4.6, reviews: 178 },
  { id: "d3", name: "Long Distance", slug: "long-distance", category: "Duo", categorySlug: "duo", collection: "Two's Company", emoji: "📱", description: '"Love knows no distance. Neither does Bluetooth."', longDescription: "Control your partner's pleasure from anywhere in the world. Dedicated app, unlimited range, real-time vibration.", price: 109, sticker: "New Drop ✨", features: ["Global app control", "Unlimited Bluetooth", "Built-in chat", "Custom patterns", "4h battery"], images: ["📱"], inStock: true, rating: 4.8, reviews: 234 },

  // SLIPPERY
  { id: "s1", name: "Hot Stuff", slug: "hot-stuff", category: "Slippery", categorySlug: "slippery", collection: "The Slippery Slope", emoji: "🌶️", description: '"Warning: may cause strong opinions and zero regrets."', longDescription: "Premium warming gel. A growing sensation of heat that elevates every touch. Water-based, compatible with all materials.", price: 34, sticker: "New Drop ✨", features: ["Warming effect", "Water-based", "Condom compatible", "150ml", "Paraben-free"], images: ["🌶️"], inStock: true, rating: 4.4, reviews: 567 },
  { id: "s2", name: "Silk", slug: "silk", category: "Slippery", categorySlug: "slippery", collection: "The Slippery Slope", emoji: "✨", description: '"Smoother than your best pickup line."', longDescription: "Premium long-lasting silicone lubricant. One drop is all you need. Silky, persistent, no reapplication required.", price: 29, features: ["Silicone-based", "Long-lasting", "Ultra concentrated", "200ml", "Hypoallergenic"], images: ["✨"], inStock: true, rating: 4.7, reviews: 891 },
  { id: "s3", name: "Natural", slug: "natural", category: "Slippery", categorySlug: "slippery", collection: "The Slippery Slope", emoji: "🌿", description: '"As organic as your excuses."', longDescription: "100% natural, vegan and organic. For those who like sustainable pleasure. Aloe vera and vitamin E.", price: 24, features: ["100% natural", "Vegan", "Certified organic", "Aloe vera", "100ml"], images: ["🌿"], inStock: true, rating: 4.6, reviews: 345 },

  // TIED
  { id: "t1", name: "Starter Ropes", slug: "starter-ropes", category: "Tied", categorySlug: "tied", collection: "The Director's Cut", emoji: "🪢", description: '"Learn the ropes. Literally."', longDescription: "Silk rope kit for beginners. Soft on the skin, strong enough to hold. Includes illustrated knot guide.", price: 39, sticker: "Starter 🗝️", features: ["Silk ropes", "2x 5 metres", "Knot guide included", "Skin-soft", "Machine washable"], images: ["🪢"], inStock: true, rating: 4.5, reviews: 189 },
  { id: "t2", name: "The Director's Kit", slug: "the-directors-kit", category: "Tied", categorySlug: "tied", collection: "The Director's Cut", emoji: "🎬", description: '"Action! ...and cut."', longDescription: "Premium bondage kit: padded cuffs, silk blindfold, collar, leash and paddle. All in a leather case.", price: 159, sticker: "Premium 👑", features: ["6 pieces", "Vegan leather", "Case included", "Interior padding", "Quick-release safety clasp"], images: ["🎬"], inStock: true, rating: 4.9, reviews: 145 },
  { id: "t3", name: "Silk Blindfold", slug: "silk-blindfold", category: "Tied", categorySlug: "tied", collection: "The Director's Cut", emoji: "🎭", description: '"What you can\'t see won\'t hurt you. Probably."', longDescription: "Double-sided silk blindfold: one side silk, the other satin. 100% light-blocking. Adjustable and comfortable elastic.", price: 24, features: ["Double-sided silk", "100% blackout", "Adjustable elastic", "Hypoallergenic", "Silk pouch included"], images: ["🎭"], inStock: true, rating: 4.6, reviews: 456 },

  // NEWBIE
  { id: "n1", name: "The Set-Up", slug: "the-set-up", category: "Newbie", categorySlug: "newbie", collection: "First Showing", emoji: "🗝️", description: '"Everything you need. Nothing embarrassing. Much."', longDescription: "Complete starter kit: mini vibrator, natural lubricant, exploration guide and discreet pouch. The perfect first step.", price: 99, sticker: "Starter 🗝️", features: ["Mini vibrator", "50ml lubricant", "Illustrated guide", "Discreet pouch", "Batteries included"], images: ["🗝️"], inStock: true, rating: 4.8, reviews: 678 },
  { id: "n2", name: "Curious Kit", slug: "curious-kit", category: "Newbie", categorySlug: "newbie", collection: "First Showing", emoji: "🔍", description: '"For the curious. No judgement."', longDescription: "Exploration kit with 5 mini products to discover what you enjoy most. Surprise included in every box.", price: 59, sticker: "New ✨", features: ["5 mini products", "Surprise included", "Discovery guide", "Gift packaging", "All rechargeable"], images: ["🔍"], inStock: true, rating: 4.6, reviews: 234 },

  // OOPS (Sale)
  { id: "o1", name: "Thunder", slug: "thunder-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "⛈️", description: '"Same thunder. Less cash."', longDescription: "Maximum power, ergonomic design, 12 intense vibration patterns. Now at an unmissable price.", price: 69, originalPrice: 129, sticker: "-46% 🔥", features: ["12 intense patterns", "Maximum power", "Ergonomic design", "Dual motor", "3h battery life"], images: ["⛈️"], inStock: true, rating: 4.8, reviews: 256 },
  { id: "o2", name: "Date Night", slug: "date-night-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "🍷", description: '"Romance on a budget. Still classy."', longDescription: "The perfect kit for special evenings. Includes couples vibrator, massage candle and idea guide.", price: 49, originalPrice: 89, sticker: "-45% 🔥", features: ["Complete kit", "Massage candle included", "Idea guide", "Gift packaging", "Dual vibrator"], images: ["🍷"], inStock: true, rating: 4.6, reviews: 178 },
  { id: "o3", name: "Starter Ropes", slug: "starter-ropes-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "🪢", description: '"Tie the deal before it\'s gone."', longDescription: "Silk rope kit for beginners. Soft on the skin, strong enough to hold. Includes illustrated knot guide.", price: 19, originalPrice: 39, sticker: "-51% 🔥", features: ["Silk ropes", "2x 5 metres", "Knot guide included", "Skin-soft", "Machine washable"], images: ["🪢"], inStock: true, rating: 4.5, reviews: 189 },
  { id: "o4", name: "Silk Lube", slug: "silk-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "✨", description: '"Smooth savings."', longDescription: "Premium long-lasting silicone lubricant. One drop is all you need. Silky, persistent.", price: 14, originalPrice: 29, sticker: "-52% 🔥", features: ["Silicone-based", "Long-lasting", "Ultra concentrated", "200ml", "Hypoallergenic"], images: ["✨"], inStock: true, rating: 4.7, reviews: 891 },
  { id: "o5", name: "Red Alert Set", slug: "red-alert-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "❤️", description: '"Half price. Full drama."', longDescription: "Bold red set with suspenders and stockings. Includes matching choker.", price: 44, originalPrice: 89, sticker: "-50% 🔥", features: ["Complete set", "Suspenders included", "Silk stockings", "Matching choker", "XS-XXL"], images: ["❤️"], inStock: true, rating: 4.7, reviews: 178 },
  { id: "o6", name: "Ring King", slug: "ring-king-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "👑", description: '"A crown at half the price."', longDescription: "Vibrating ring with dual stimulation. Stretchy silicone, 10 vibration modes.", price: 22, originalPrice: 44, sticker: "-50% 🔥", features: ["Dual vibration", "Stretchy silicone", "10 modes", "USB rechargeable", "Waterproof"], images: ["👑"], inStock: true, rating: 4.8, reviews: 323 },

  // JUST IN (new arrivals)
  { id: "ji1", name: "The OoohMy One", slug: "the-ooohmy-one-new", category: "Just In", categorySlug: "just-in", collection: "Fresh Trouble", emoji: "⚡", description: '"Your neighbours will know. That\'s their problem."', longDescription: "Premium vibrator with 10 vibration modes, medical-grade silicone, waterproof and ultra-quiet.", price: 79, sticker: "New ✨", features: ["10 vibration modes", "Medical-grade silicone", "IPX7 waterproof", "Ultra-quiet motor", "USB rechargeable"], images: ["⚡"], inStock: true, rating: 4.9, reviews: 342 },
  { id: "ji2", name: "Hot Stuff", slug: "hot-stuff-new", category: "Just In", categorySlug: "just-in", collection: "Fresh Trouble", emoji: "🌶️", description: '"Warning: may cause strong opinions and zero regrets."', longDescription: "Premium warming gel. A growing sensation of heat that elevates every touch.", price: 34, sticker: "New ✨", features: ["Warming effect", "Water-based", "Condom compatible", "150ml"], images: ["🌶️"], inStock: true, rating: 4.4, reviews: 567 },
  { id: "ji3", name: "Long Distance", slug: "long-distance-new", category: "Just In", categorySlug: "just-in", collection: "Fresh Trouble", emoji: "📱", description: '"Love knows no distance. Neither does Bluetooth."', longDescription: "Control your partner's pleasure from anywhere in the world.", price: 109, sticker: "New Drop ✨", features: ["Global app control", "Unlimited Bluetooth", "Built-in chat"], images: ["📱"], inStock: true, rating: 4.8, reviews: 234 },
  { id: "ji4", name: "Curious Kit", slug: "curious-kit-new", category: "Just In", categorySlug: "just-in", collection: "Fresh Trouble", emoji: "🔍", description: '"For the curious. No judgement."', longDescription: "Exploration kit with 5 mini products to discover what you enjoy most.", price: 59, sticker: "New ✨", features: ["5 mini products", "Surprise included", "Discovery guide"], images: ["🔍"], inStock: true, rating: 4.6, reviews: 234 },

  // SOLO
  { id: "so1", name: "The OoohMy One", slug: "the-ooohmy-one-solo", category: "Solo", categorySlug: "solo", collection: "No Audience Needed", emoji: "⚡", description: '"Your neighbours will know. That\'s their problem."', longDescription: "Premium vibrator with 10 vibration modes, medical-grade silicone, waterproof and ultra-quiet.", price: 79, sticker: "Fan Fave 🔥", features: ["10 vibration modes", "Medical-grade silicone", "IPX7 waterproof", "Ultra-quiet motor"], images: ["⚡"], inStock: true, rating: 4.9, reviews: 342 },
  { id: "so2", name: "Whisper", slug: "whisper-solo", category: "Solo", categorySlug: "solo", collection: "No Audience Needed", emoji: "🤫", description: '"So quiet, your flatmate will never know."', longDescription: "The most discreet vibrator on the market. Whisper-quiet motor with surprising power.", price: 59, features: ["Whisper-quiet motor", "7 modes", "Compact design", "Premium silicone"], images: ["🤫"], inStock: true, rating: 4.7, reviews: 189 },
  { id: "so3", name: "Thunder", slug: "thunder-solo", category: "Solo", categorySlug: "solo", collection: "No Audience Needed", emoji: "⛈️", description: '"Warning: May cause noise complaints."', longDescription: "For those who don't care what the neighbours think. Maximum power.", price: 99, originalPrice: 129, sticker: "Sale 🏷️", features: ["12 intense patterns", "Maximum power", "Dual motor"], images: ["⛈️"], inStock: true, rating: 4.8, reviews: 256 },
  { id: "so4", name: "Pocket Rocket", slug: "pocket-rocket-solo", category: "Solo", categorySlug: "solo", collection: "No Audience Needed", emoji: "🚀", description: '"Small but deadly. In a good way."', longDescription: "Fits in your bag, your pocket, anywhere. Mini size, maxi pleasure.", price: 39, features: ["Ultra compact", "5 modes", "Discreet", "Travel-friendly"], images: ["🚀"], inStock: true, rating: 4.5, reviews: 412 },

  // PUSH IT (kink & sensation)
  { id: "pi1", name: "Starter Ropes", slug: "starter-ropes-push", category: "Push It", categorySlug: "push-it", collection: "A Little Further", emoji: "🪢", description: '"Learn the ropes. Literally."', longDescription: "Silk rope kit for beginners. Soft on the skin, strong enough to hold.", price: 39, sticker: "Starter 🗝️", features: ["Silk ropes", "2x 5 metres", "Knot guide included"], images: ["🪢"], inStock: true, rating: 4.5, reviews: 189 },
  { id: "pi2", name: "The Director's Kit", slug: "directors-kit-push", category: "Push It", categorySlug: "push-it", collection: "A Little Further", emoji: "🎬", description: '"Action! ...and cut."', longDescription: "Premium bondage kit: padded cuffs, silk blindfold, collar, leash and paddle.", price: 159, sticker: "Premium 👑", features: ["6 pieces", "Vegan leather", "Case included"], images: ["🎬"], inStock: true, rating: 4.9, reviews: 145 },
  { id: "pi3", name: "Hot Stuff", slug: "hot-stuff-push", category: "Push It", categorySlug: "push-it", collection: "A Little Further", emoji: "🌶️", description: '"Warning: may cause strong opinions and zero regrets."', longDescription: "Premium warming gel. A growing sensation of heat.", price: 34, sticker: "Hot 🔥", features: ["Warming effect", "Water-based", "Condom compatible"], images: ["🌶️"], inStock: true, rating: 4.4, reviews: 567 },
  { id: "pi4", name: "Silk Blindfold", slug: "silk-blindfold-push", category: "Push It", categorySlug: "push-it", collection: "A Little Further", emoji: "🎭", description: '"What you can\'t see won\'t hurt you. Probably."', longDescription: "Double-sided silk blindfold. 100% light-blocking.", price: 24, features: ["Double-sided silk", "100% blackout", "Adjustable elastic"], images: ["🎭"], inStock: true, rating: 4.6, reviews: 456 },

  // PLAYTIME (accessories & play)
  { id: "pt1", name: "The Together", slug: "the-together-play", category: "Playtime", categorySlug: "playtime", collection: "You Make the Rules", emoji: "💑", description: '"Two is always better. We rest our case."', longDescription: "Designed for couples who want to elevate the experience.", price: 129, sticker: "Best Seller 👑", features: ["Dual stimulation", "App remote control", "Synchronised vibration"], images: ["💑"], inStock: true, rating: 4.9, reviews: 523 },
  { id: "pt2", name: "Date Night", slug: "date-night-play", category: "Playtime", categorySlug: "playtime", collection: "You Make the Rules", emoji: "🍷", description: '"Netflix and... oh."', longDescription: "The perfect kit for special evenings.", price: 89, features: ["Complete kit", "Massage candle included", "Idea guide"], images: ["🍷"], inStock: true, rating: 4.6, reviews: 178 },
  { id: "pt3", name: "The Set-Up", slug: "the-set-up-play", category: "Playtime", categorySlug: "playtime", collection: "You Make the Rules", emoji: "🗝️", description: '"Everything you need. Nothing embarrassing. Much."', longDescription: "Complete starter kit: mini vibrator, natural lubricant, exploration guide.", price: 99, sticker: "Starter 🗝️", features: ["Mini vibrator", "50ml lubricant", "Illustrated guide"], images: ["🗝️"], inStock: true, rating: 4.8, reviews: 678 },
  { id: "pt4", name: "Ring King", slug: "ring-king-play", category: "Playtime", categorySlug: "playtime", collection: "You Make the Rules", emoji: "👑", description: '"Wear the crown."', longDescription: "Vibrating ring with dual stimulation. Stretchy silicone, 10 vibration modes.", price: 44, features: ["Dual vibration", "Stretchy silicone", "10 modes", "USB rechargeable"], images: ["👑"], inStock: true, rating: 4.8, reviews: 323 },
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.categorySlug === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};
