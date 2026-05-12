import { useEffect } from "react";
import { useShopifyCart } from "@/stores/shopifyCart";

export function useCartSync() {
  const syncCart = useShopifyCart((s) => s.syncCart);
  useEffect(() => {
    syncCart();
    const onVis = () => {
      if (document.visibilityState === "visible") syncCart();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [syncCart]);
}
