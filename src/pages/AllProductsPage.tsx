import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useCart } from "@/context/CartContext";
import { categories, products } from "@/data/products";

const primaryCategorySlugs = ["buzz", "duo", "slippery", "tied", "newbie", "oops"];
const primaryCategorySet = new Set(primaryCategorySlugs);
const primaryCategories = categories.filter((category) => primaryCategorySet.has(category.slug));
const allProducts = products.filter((product) => primaryCategorySet.has(product.categorySlug));
const categoryMap = new Map(primaryCategories.map((category) => [category.slug, category]));

const AllProductsPage = () => {
  const { addItem, setIsOpen } = useCart();

  const handleBuy = (productId: string) => {
    const product = allProducts.find((item) => item.id === productId);
    if (!product) return;

    addItem(product, 1);
    setIsOpen(true);
    toast.success(`${product.name} added to bag ✨`);
  };

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      <section className="bg-dark border-b-[5px] border-primary relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--accent) / 0.18) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-[1]">
          <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm mb-6 no-underline text-cream/70 hover:text-cream transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <p className="section-kicker text-accent mb-3">Full Catalogue</p>
          <h1 className="font-display font-black italic text-cream leading-none mb-4" style={{ fontSize: "clamp(2.6rem,5vw,5rem)" }}>
            All Products.
          </h1>
          <p className="font-serif italic text-cream/70 max-w-2xl text-lg leading-relaxed">
            Everything worth discovering in one place — from best sellers and beginner picks to the dangerous little discounts.
          </p>
        </div>
      </section>

      <div className="bg-cream paper-bg border-b-[3px] border-dark px-6 lg:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap gap-2">
          {primaryCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="px-4 py-2 border-[3px] border-dark rounded-sm font-display italic text-sm font-bold shadow-[3px_3px_0_hsl(var(--dark))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_hsl(var(--dark))] no-underline bg-cream text-foreground hover:bg-accent"
            >
              {category.emoji} {category.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-parch paper-bg px-6 lg:px-12 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-[3px] border-dark">
            {allProducts.map((product, index) => {
              const category = categoryMap.get(product.categorySlug);

              return (
                <div
                  key={product.id}
                  className={`p-8 relative overflow-hidden transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0_hsl(var(--dark))] hover:z-[2] group bg-cream ${
                    (index + 1) % 3 !== 0 ? "border-r-0 lg:border-r-[3px] border-dark" : ""
                  } ${index < allProducts.length - 1 ? "border-b-[3px] border-dark" : ""}`}
                >
                  {product.sticker && (
                    <div
                      className="absolute -top-1 right-4 bg-accent text-foreground font-display italic font-bold text-[0.65rem] px-3 py-1 border-2 border-dark rounded-full shadow-[2px_2px_0_hsl(var(--dark))]"
                      style={{ transform: "rotate(3deg)" }}
                    >
                      {product.sticker}
                    </div>
                  )}

                  <Link to={`/category/${product.categorySlug}/product/${product.slug}`} className="block no-underline">
                    <div className={`${category?.color ?? "bg-parch"} border-[3px] border-dark rounded-sm h-40 flex items-center justify-center mb-5 group-hover:brightness-110 transition-all`}>
                      <span className="text-6xl">{product.emoji}</span>
                    </div>

                    <div className="font-display italic text-[0.7rem] text-muted-foreground mb-1">
                      {product.collection} · {product.category}
                    </div>
                    <h2 className="font-display font-black italic text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h2>
                    <p className="font-serif italic text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-2xl text-primary">€{product.price}</span>
                      {product.originalPrice && (
                        <span className="font-serif italic text-sm text-muted-foreground line-through">€{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="text-accent">★</span> {product.rating} ({product.reviews})
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button type="button" className="cta-primary w-full text-sm px-4 py-3" onClick={() => handleBuy(product.id)}>
                      Comprar
                    </button>
                    <Link to={`/category/${product.categorySlug}/product/${product.slug}`} className="cta-secondary w-full text-sm px-4 py-3 no-underline text-center">
                      Saiba mais
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AllProductsPage;
