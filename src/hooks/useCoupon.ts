import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type CouponData = {
  code: string;
  discount_type: string;
  discount_value: number;
  min_order_value: number;
};

export const useCoupon = () => {
  const [coupon, setCoupon] = useState<CouponData | null>(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = async (code: string, subtotal: number) => {
    if (!code.trim()) {
      toast.error("Enter a coupon code first");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("coupons")
      .select("code, discount_type, discount_value, min_order_value, max_uses, current_uses, expires_at")
      .eq("code", code.trim().toUpperCase())
      .eq("active", true)
      .maybeSingle();

    setLoading(false);

    if (error || !data) {
      toast.error("Invalid coupon code 😔");
      return;
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      toast.error("This coupon has expired");
      return;
    }

    if (data.max_uses && data.current_uses >= data.max_uses) {
      toast.error("This coupon has reached its usage limit");
      return;
    }

    if (subtotal < (data.min_order_value || 0)) {
      toast.error(`Minimum order of €${data.min_order_value} required for this coupon`);
      return;
    }

    setCoupon({
      code: data.code,
      discount_type: data.discount_type,
      discount_value: data.discount_value,
      min_order_value: data.min_order_value || 0,
    });
    toast.success(`Coupon ${data.code} applied! 🎉`);
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    toast("Coupon removed");
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!coupon) return 0;
    if (coupon.discount_type === "percentage") {
      return Math.round((subtotal * coupon.discount_value) / 100 * 100) / 100;
    }
    return Math.min(coupon.discount_value, subtotal);
  };

  return { coupon, couponCode, setCouponCode, loading, applyCoupon, removeCoupon, calculateDiscount };
};
