import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import CartSheet from "@/components/CartSheet";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import AllProductsPage from "./pages/AllProductsPage.tsx";
import OurStoryPage from "./pages/OurStoryPage.tsx";
import NoJudgmentPage from "./pages/NoJudgmentPage.tsx";
import AffiliatesPage from "./pages/AffiliatesPage.tsx";
import PressPage from "./pages/PressPage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import NotFound from "./pages/NotFound.tsx";

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
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <CartProvider>
          <ScrollManager />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/no-judgment" element={<NoJudgmentPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/category/:categorySlug/product/:productSlug" element={<ProductPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          <CartSheet />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
