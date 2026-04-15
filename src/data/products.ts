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
  { id: "b1", name: "The OoohMy One", slug: "the-ooohmy-one", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "⚡", description: '"Your neighbours will know. That\'s their problem."', longDescription: "Premium vibrador com 10 modos de vibração, silicone médico, à prova d'água e ultra silencioso. Porque o prazer não precisa de alarmes.", price: 79, sticker: "Fan Fave 🔥", features: ["10 modos de vibração", "Silicone médico", "À prova d'água IPX7", "Ultra silencioso", "USB recarregável", "Bolsa de viagem incluída"], images: ["⚡"], inStock: true, rating: 4.9, reviews: 342 },
  { id: "b2", name: "Whisper", slug: "whisper", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "🤫", description: '"So quiet, your flatmate will never know."', longDescription: "O vibrador mais discreto do mercado. Motor sussurrante com potência surpreendente. Perfeito para quem vive em apartamentos com paredes finas.", price: 59, features: ["Motor sussurrante", "7 modos", "Compacto", "Silicone premium", "Carregamento magnético"], images: ["🤫"], inStock: true, rating: 4.7, reviews: 189 },
  { id: "b3", name: "Thunder", slug: "thunder", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "⛈️", description: '"Warning: May cause noise complaints."', longDescription: "Para quem não se importa com o que os vizinhos pensam. Potência máxima, design ergonómico, 12 padrões de vibração intensos.", price: 99, originalPrice: 129, sticker: "Sale 🏷️", features: ["12 padrões intensos", "Potência máxima", "Design ergonómico", "Dual motor", "3h de bateria"], images: ["⛈️"], inStock: true, rating: 4.8, reviews: 256 },
  { id: "b4", name: "Pocket Rocket", slug: "pocket-rocket", category: "Buzz", categorySlug: "buzz", collection: "The Main Event", emoji: "🚀", description: '"Small but deadly. In a good way."', longDescription: "Cabe na bolsa, no bolso, em qualquer lugar. Tamanho mini, prazer maxi. O companheiro de viagem perfeito.", price: 39, features: ["Ultra compacto", "5 modos", "Discreto", "Travel-friendly", "Pilhas incluídas"], images: ["🚀"], inStock: true, rating: 4.5, reviews: 412 },

  // DUO
  { id: "d1", name: "The Together", slug: "the-together", category: "Duo", categorySlug: "duo", collection: "Two's Company", emoji: "💑", description: '"Two is always better. We rest our case."', longDescription: "Desenhado para casais que querem elevar a experiência. Dupla estimulação, controlo remoto via app e vibração sincronizada.", price: 129, sticker: "Best Seller 👑", features: ["Dupla estimulação", "Controlo via app", "Vibração sincronizada", "Silicone flexível", "10 modos para casal"], images: ["💑"], inStock: true, rating: 4.9, reviews: 523 },
  { id: "d2", name: "Date Night", slug: "date-night", category: "Duo", categorySlug: "duo", collection: "Two's Company", emoji: "🍷", description: '"Netflix and... oh."', longDescription: "O kit perfeito para noites especiais. Inclui vibrador para casal, vela de massagem e guia de ideias. Tudo em embalagem de presente.", price: 89, features: ["Kit completo", "Vela de massagem incluída", "Guia de ideias", "Embalagem presente", "Vibrador dual"], images: ["🍷"], inStock: true, rating: 4.6, reviews: 178 },
  { id: "d3", name: "Long Distance", slug: "long-distance", category: "Duo", categorySlug: "duo", collection: "Two's Company", emoji: "📱", description: '"Love knows no distance. Neither does Bluetooth."', longDescription: "Controla o prazer do teu parceiro de qualquer lugar do mundo. App dedicada, sem limite de distância, vibração em tempo real.", price: 109, sticker: "New Drop ✨", features: ["Controlo global via app", "Bluetooth ilimitado", "Chat integrado", "Padrões customizáveis", "Bateria 4h"], images: ["📱"], inStock: true, rating: 4.8, reviews: 234 },

  // SLIPPERY
  { id: "s1", name: "Hot Stuff", slug: "hot-stuff", category: "Slippery", categorySlug: "slippery", collection: "The Slippery Slope", emoji: "🌶️", description: '"Warning: may cause strong opinions and zero regrets."', longDescription: "Gel de aquecimento premium. Sensação crescente de calor que eleva cada toque. Base aquosa, compatível com todos os materiais.", price: 34, sticker: "New Drop ✨", features: ["Efeito aquecimento", "Base aquosa", "Compatível com preservativos", "150ml", "Sem parabenos"], images: ["🌶️"], inStock: true, rating: 4.4, reviews: 567 },
  { id: "s2", name: "Silk", slug: "silk", category: "Slippery", categorySlug: "slippery", collection: "The Slippery Slope", emoji: "✨", description: '"Smoother than your best pickup line."', longDescription: "Lubrificante de silicone premium de longa duração. Uma gota basta. Sedoso, persistente, sem necessidade de reaplicar.", price: 29, features: ["Base silicone", "Longa duração", "Ultra concentrado", "200ml", "Hipoalergénico"], images: ["✨"], inStock: true, rating: 4.7, reviews: 891 },
  { id: "s3", name: "Natural", slug: "natural", category: "Slippery", categorySlug: "slippery", collection: "The Slippery Slope", emoji: "🌿", description: '"As organic as your excuses."', longDescription: "100% natural, vegan e orgânico. Para quem gosta de prazer sustentável. Aloe vera e vitamina E.", price: 24, features: ["100% natural", "Vegan", "Orgânico certificado", "Aloe vera", "100ml"], images: ["🌿"], inStock: true, rating: 4.6, reviews: 345 },


  // TIED
  { id: "t1", name: "Starter Ropes", slug: "starter-ropes", category: "Tied", categorySlug: "tied", collection: "The Director's Cut", emoji: "🪢", description: '"Learn the ropes. Literally."', longDescription: "Kit de cordas de seda para iniciantes. Suaves na pele, fortes o suficiente. Inclui guia ilustrado de nós.", price: 39, sticker: "Starter 🗝️", features: ["Cordas de seda", "2x 5 metros", "Guia de nós incluído", "Suave na pele", "Lavável"], images: ["🪢"], inStock: true, rating: 4.5, reviews: 189 },
  { id: "t2", name: "The Director's Kit", slug: "the-directors-kit", category: "Tied", categorySlug: "tied", collection: "The Director's Cut", emoji: "🎬", description: '"Action! ...and cut."', longDescription: "Kit completo de bondage premium: algemas acolchoadas, venda de seda, collar, leash e paddle. Tudo em maleta de couro.", price: 159, sticker: "Premium 👑", features: ["6 peças", "Couro vegan", "Maleta incluída", "Acolchoamento interior", "Fecho de segurança rápida"], images: ["🎬"], inStock: true, rating: 4.9, reviews: 145 },
  { id: "t3", name: "Silk Blindfold", slug: "silk-blindfold", category: "Tied", categorySlug: "tied", collection: "The Director's Cut", emoji: "🎭", description: '"What you can\'t see won\'t hurt you. Probably."', longDescription: "Venda de seda dupla face: um lado seda, outro lado satin. Bloqueia 100% da luz. Elástico ajustável e confortável.", price: 24, features: ["Seda dupla face", "100% blackout", "Elástico ajustável", "Hipoalergénica", "Bolsa de seda incluída"], images: ["🎭"], inStock: true, rating: 4.6, reviews: 456 },


  // NEWBIE
  { id: "n1", name: "The Set-Up", slug: "the-set-up", category: "Newbie", categorySlug: "newbie", collection: "First Showing", emoji: "🗝️", description: '"Everything you need. Nothing embarrassing. Much."', longDescription: "Kit iniciante completo: mini vibrador, lubrificante natural, guia de exploração e bolsa discreta. O primeiro passo perfeito.", price: 99, sticker: "Starter 🗝️", features: ["Mini vibrador", "Lubrificante 50ml", "Guia ilustrado", "Bolsa discreta", "Pilhas incluídas"], images: ["🗝️"], inStock: true, rating: 4.8, reviews: 678 },
  { id: "n2", name: "Curious Kit", slug: "curious-kit", category: "Newbie", categorySlug: "newbie", collection: "First Showing", emoji: "🔍", description: '"For the curious. No judgement."', longDescription: "Kit de exploração com 5 mini produtos para descobrir o que mais gostas. Surpresa incluída em cada caixa.", price: 59, sticker: "New ✨", features: ["5 mini produtos", "Surpresa incluída", "Guia de descoberta", "Embalagem presente", "Tudo recarregável"], images: ["🔍"], inStock: true, rating: 4.6, reviews: 234 },


  // OOPS (Sale)
  { id: "o1", name: "Thunder", slug: "thunder-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "⛈️", description: '"Same thunder. Less cash."', longDescription: "Potência máxima, design ergonómico, 12 padrões de vibração intensos. Agora com desconto imperdível.", price: 69, originalPrice: 129, sticker: "-46% 🔥", features: ["12 padrões intensos", "Potência máxima", "Design ergonómico", "Dual motor", "3h de bateria"], images: ["⛈️"], inStock: true, rating: 4.8, reviews: 256 },
  { id: "o2", name: "Date Night", slug: "date-night-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "🍷", description: '"Romance on a budget. Still classy."', longDescription: "O kit perfeito para noites especiais. Inclui vibrador para casal, vela de massagem e guia de ideias.", price: 49, originalPrice: 89, sticker: "-45% 🔥", features: ["Kit completo", "Vela de massagem incluída", "Guia de ideias", "Embalagem presente", "Vibrador dual"], images: ["🍷"], inStock: true, rating: 4.6, reviews: 178 },
  { id: "o3", name: "Starter Ropes", slug: "starter-ropes-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "🪢", description: '"Tie the deal before it\'s gone."', longDescription: "Kit de cordas de seda para iniciantes. Suaves na pele, fortes o suficiente. Inclui guia ilustrado de nós.", price: 19, originalPrice: 39, sticker: "-51% 🔥", features: ["Cordas de seda", "2x 5 metros", "Guia de nós incluído", "Suave na pele", "Lavável"], images: ["🪢"], inStock: true, rating: 4.5, reviews: 189 },
  { id: "o4", name: "Silk Lube", slug: "silk-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "✨", description: '"Smooth savings."', longDescription: "Lubrificante de silicone premium de longa duração. Uma gota basta. Sedoso, persistente.", price: 14, originalPrice: 29, sticker: "-52% 🔥", features: ["Base silicone", "Longa duração", "Ultra concentrado", "200ml", "Hipoalergénico"], images: ["✨"], inStock: true, rating: 4.7, reviews: 891 },
  { id: "o5", name: "Red Alert Set", slug: "red-alert-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "❤️", description: '"Half price. Full drama."', longDescription: "Conjunto vermelho ousado com ligas e meias. Inclui choker coordenado.", price: 44, originalPrice: 89, sticker: "-50% 🔥", features: ["Conjunto completo", "Ligas incluídas", "Meias de seda", "Choker coordenado", "XS-XXL"], images: ["❤️"], inStock: true, rating: 4.7, reviews: 178 },
  { id: "o6", name: "Ring King", slug: "ring-king-sale", category: "Oops", categorySlug: "oops", collection: "Hard to Resist", emoji: "👑", description: '"A crown at half the price."', longDescription: "Anel vibratório com estimulação dual. Silicone elástico, 10 modos de vibração.", price: 22, originalPrice: 44, sticker: "-50% 🔥", features: ["Vibração dual", "Silicone elástico", "10 modos", "USB recarregável", "À prova d'água"], images: ["👑"], inStock: true, rating: 4.8, reviews: 323 },
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
