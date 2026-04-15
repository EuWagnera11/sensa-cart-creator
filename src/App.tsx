import { useEffect, useRef, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CartSheet from "@/components/CartSheet";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const CategoryPage = lazy(() => import("./pages/CategoryPage.tsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.tsx"));
const CartPage = lazy(() => import("./pages/CartPage.tsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.tsx"));
const AllProductsPage = lazy(() => import("./pages/AllProductsPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");

      window.requestAnimationFrame(() => {
        document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.hash, location.pathname]);

  return null;
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };

    const grow = () => el.classList.add("big");
    const shrink = () => el.classList.remove("big");

    document.addEventListener("mousemove", handleMove, { passive: true });

    const observer = new MutationObserver(() => {
      const selectors = "a, button, input, .cat-card, .product-card, .promo-card, .swatch-block";
      document.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
        element.addEventListener("mouseenter", grow);
        element.addEventListener("mouseleave", shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial binding
    const selectors = "a, button, input, .cat-card, .product-card, .promo-card, .swatch-block";
    document.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
      element.addEventListener("mouseenter", grow);
      element.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} aria-hidden="true" className="custom-cursor" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <CartProvider>
          <ScrollManager />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/category/:categorySlug/product/:productSlug" element={<ProductPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CartSheet />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
