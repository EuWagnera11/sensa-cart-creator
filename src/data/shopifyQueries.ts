// Maps storefront category slugs to Shopify Storefront API search queries.
// Tuned for the connected store's Portuguese catalog.
export const CATEGORY_SHOPIFY_QUERIES: Record<string, string> = {
  buzz: "title:vibr* OR title:vibrador OR title:bullet OR title:massageador",
  duo: "title:duo OR title:casal OR vendor:BIJOUX OR title:couple",
  slippery: "title:lubrif* OR title:gel OR title:óleo OR title:oleo OR title:creme",
  tied: "title:bondage OR title:algema OR title:venda OR title:chicote OR vendor:KHEPER",
  newbie: "vendor:BAILE OR title:basico OR title:starter OR title:iniciante",
  oops: "inventory_total:>50",
};

// Generic "what's new" query used by the homepage marquee.
export const FRESH_PRODUCTS_QUERY = "inventory_total:>20";
