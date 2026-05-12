import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug, categories } from "@/data/products";
import { getCategoryBanners } from "@/data/categoryBanners";
import Navbar from "@/components/Navbar";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CategoryHeroBanner from "@/components/CategoryHeroBanner";
import ShopifyProductsSection from "@/components/ShopifyProductsSection";
import { CATEGORY_SHOPIFY_QUERIES } from "@/data/shopifyQueries";
import { Truck } from "lucide-react";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const shopifyQuery =
    CATEGORY_SHOPIFY_QUERIES[categorySlug || ""] || "inventory_total:>20";

  if (!category) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch paper-bg">
          <div className="text-center">
            <span className="text-6xl block mb-4">🤷</span>
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">
              Category Not Found
            </h1>
            <p className="font-serif italic text-muted-foreground mb-6">
              This secret doesn't exist... yet.
            </p>
            <Link to="/" className="cta-primary inline-block no-underline px-8 py-3">
              Back to Home →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${category.name} — ${category.desc}`}
        description={`Explore ${category.desc.toLowerCase()} at OoohMy. ${category.collection}. Discreet shipping.`}
      />
      <AnnounceBanner />
      <Navbar />

      {/* Hero Banner */}
      {getCategoryBanners(categorySlug || "").length > 0 ? (
        <CategoryHeroBanner
          slides={getCategoryBanners(categorySlug || "")}
          categoryName={category.name}
          categoryEmoji={category.emoji}
          categoryCollection={category.collection}
          categoryDesc={category.desc}
          productCount={0}
          darkText={category.darkText}
        />
      ) : (
        <div className={`${category.color} border-b-[5px] border-dark relative overflow-hidden`}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,.1) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-[2]">
            <span className="text-6xl block mb-4">{category.emoji}</span>
            <h1
              className={`font-display font-black italic leading-none mb-2 ${
                category.darkText ? "text-foreground" : "text-white"
              }`}
              style={{
                fontSize: "clamp(3rem,5vw,5rem)",
                textShadow: category.darkText ? "none" : "3px 3px 0 rgba(0,0,0,.2)",
              }}
            >
              {category.name}.
            </h1>
            <p
              className={`font-display italic text-lg mb-1 ${
                category.darkText ? "text-foreground/60" : "text-white/70"
              }`}
            >
              {category.collection}
            </p>
            <p
              className={`text-xs tracking-[3px] uppercase font-bold ${
                category.darkText ? "text-foreground/40" : "text-white/40"
              }`}
            >
              {category.desc}
            </p>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-serif italic text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors no-underline text-muted-foreground">
            Home
          </Link>
          <span>›</span>
          <span className="text-foreground font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Category quick nav */}
      <div className="bg-parch paper-bg px-6 lg:px-12 pt-8">
        <div className="max-w-[1440px] mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`px-4 py-2 border-[3px] border-dark rounded-sm font-display italic text-sm font-bold shadow-[3px_3px_0_hsl(var(--dark))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_hsl(var(--dark))] no-underline ${
                cat.slug === categorySlug
                  ? "red-texture-fill"
                  : "bg-cream text-foreground hover:bg-accent"
              }`}
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Free shipping promo */}
      <div className="bg-parch paper-bg px-6 lg:px-12 pt-6">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-primary/90 to-primary border-[3px] border-dark rounded-sm overflow-hidden shadow-[4px_4px_0_hsl(var(--dark))]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-black italic text-white text-lg leading-tight">
                  Free Discreet Shipping
                </h3>
                <p className="font-serif italic text-white/70 text-sm">
                  On all orders over €50 · Plain packaging guaranteed
                </p>
              </div>
            </div>
            <Link
              to="/products"
              className="cta-primary bg-white !text-primary border-dark no-underline px-6 py-2.5 text-sm font-bold shrink-0 hover:bg-cream"
            >
              Shop All →
            </Link>
          </div>
        </div>
      </div>

      {/* Live Shopify products */}
      <ShopifyProductsSection
        query={shopifyQuery}
        count={24}
        kicker="Straight from the shop"
        title={`${category.name} picks`}
        emoji={category.emoji}
      />

      <Footer />
    </>
  );
};

export default CategoryPage;
