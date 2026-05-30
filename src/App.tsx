import { Suspense, lazy, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Loader2 } from "lucide-react";
import CartSheet from "@/components/CartSheet";
import ShopifyCartDrawer from "@/components/ShopifyCartDrawer";
import { useCartSync } from "@/hooks/useCartSync";
import { useNavigationTracker } from "@/hooks/useNavigationTracker";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import AgeGate from "@/components/AgeGate";
import CookieBanner from "@/components/CookieBanner";

// Eager — hot path: landing + browse + PDP + cart/checkout (no chunk wait between them)
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import ShopProductPage from "./pages/ShopProductPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AllProductsPage from "./pages/AllProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";

// Lazy — low-traffic static / legal / auxiliary pages
const OurStoryPage = lazy(() => import("./pages/OurStoryPage.tsx"));
const NoJudgmentPage = lazy(() => import("./pages/NoJudgmentPage.tsx"));
const AffiliatesPage = lazy(() => import("./pages/AffiliatesPage.tsx"));
const PressPage = lazy(() => import("./pages/PressPage.tsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.tsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.tsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.tsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage.tsx"));
const TermsOfUsePage = lazy(() => import("./pages/TermsOfUsePage.tsx"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage.tsx"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage.tsx"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-parch">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const CartSyncMount = () => {
  useCartSync();
  return null;
};

const NavigationTrackerMount = () => {
  useNavigationTracker();
  return null;
};

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
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  useEffect(() => {
    if (isTouchDevice) {
      const handleTouch = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;
        const ripple = document.createElement("div");
        ripple.className = "tap-ripple";
        ripple.style.left = touch.clientX + "px";
        ripple.style.top = touch.clientY + "px";
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 450);
      };
      document.addEventListener("touchstart", handleTouch, { passive: true });
      return () => document.removeEventListener("touchstart", handleTouch);
    }

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

    const selectors = "a, button, input, .cat-card, .product-card, .promo-card, .swatch-block";
    document.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
      element.addEventListener("mouseenter", grow);
      element.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;
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
            <Suspense fallback={<PageLoader />}>
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
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/product/:handle" element={<ShopProductPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/wishlist" element={<WishlistPage />} />
                <Route path="/category/:categorySlug" element={<CategoryPage />} />
                <Route path="/category/:categorySlug/product/:productSlug" element={<ProductPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfUsePage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/impressum" element={<ImpressumPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CartSheet />
            <ShopifyCartDrawer />
            <CartSyncMount />
            <NavigationTrackerMount />
            <CookieBanner />
            <AgeGate />
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
