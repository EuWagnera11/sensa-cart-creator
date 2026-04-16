import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingBag, Tag, Trash2, Truck, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useCoupon } from "@/hooks/useCoupon";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, shipping, total, updateQuantity, removeItem, clearCart } = useCart();
  const { coupon, couponCode, setCouponCode, loading: couponLoading, applyCoupon, removeCoupon, calculateDiscount } = useCoupon();

  const discount = calculateDiscount(subtotal);
  const finalTotal = total - discount;

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      <section className="bg-parch paper-bg px-4 sm:px-6 py-8 sm:py-12 lg:px-12 lg:py-16 border-b-[3px] border-dark">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-display italic text-muted-foreground no-underline hover:text-primary transition-colors mb-4 sm:mb-6">
            <ArrowLeft size={16} /> Continue shopping
          </Link>
          <p className="section-kicker text-primary mb-3">Shopping Bag</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="font-display font-black italic text-foreground leading-none" style={{ fontSize: "clamp(1.8rem,4vw,4.5rem)" }}>
              Your quiet little cart.
            </h1>
            <div className="surface-card px-4 sm:px-5 py-3 sm:py-4 text-right">
              <div className="text-[0.68rem] uppercase tracking-[3px] text-muted-foreground">Items selected</div>
              <div className="font-display text-2xl sm:text-3xl italic font-black text-foreground">{itemCount}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background paper-bg px-4 sm:px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto grid gap-6 lg:gap-8 lg:grid-cols-[1.35fr_0.65fr] items-start">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="surface-card rounded-[28px] p-10 text-center">
                <div className="w-24 h-24 rounded-full border-[3px] border-dark bg-surface mx-auto mb-5 flex items-center justify-center text-5xl shadow-soft">🛍️</div>
                <h2 className="font-display font-black italic text-3xl text-foreground">Nothing here yet.</h2>
                <p className="font-serif italic text-muted-foreground max-w-[420px] mx-auto mt-4 leading-7">
                  Add a few favourites and this page becomes your full order review, with totals, shipping and checkout.
                </p>
                <Link to="/" className="cta-primary mt-6 no-underline">Browse products</Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="surface-card rounded-[20px] sm:rounded-[28px] p-4 sm:p-5 lg:p-6">
                  <div className="flex gap-4 lg:gap-6 flex-col sm:flex-row">
                    <Link to={`/category/${item.categorySlug}/product/${item.slug}`} className="w-full sm:w-[130px] lg:sm:w-[150px] h-[130px] sm:h-[150px] rounded-[18px] sm:rounded-[24px] border-[3px] border-dark bg-surface flex items-center justify-center text-[3.5rem] sm:text-[4rem] no-underline shadow-soft shrink-0">
                      {item.emoji}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="text-[0.68rem] uppercase tracking-[3px] text-muted-foreground mb-2">{item.collection}</p>
                          <Link to={`/category/${item.categorySlug}/product/${item.slug}`} className="font-display font-black italic text-2xl text-foreground no-underline leading-none">
                            {item.name}
                          </Link>
                          <p className="font-serif italic text-muted-foreground mt-3 max-w-[560px] leading-7">{item.description}</p>
                        </div>

                        <div className="text-left sm:text-right">
                          <div className="font-display font-black text-3xl text-primary">€{(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">€{item.price.toFixed(2)} each</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 flex-wrap mt-6">
                        <div className="flex items-center overflow-hidden rounded-full border-[3px] border-dark bg-background shadow-soft">
                          <button type="button" className="px-4 py-3 hover:bg-surface transition-colors" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={16} />
                          </button>
                          <span className="min-w-[56px] text-center font-display font-bold text-lg">{item.quantity}</span>
                          <button type="button" className="px-4 py-3 hover:bg-surface transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          <Link to={`/category/${item.categorySlug}/product/${item.slug}`} className="cta-quiet no-underline">View product</Link>
                          <button type="button" className="cta-quiet" onClick={() => removeItem(item.id)}>
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="surface-inverse rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-[3px] border-dark bg-accent text-foreground flex items-center justify-center shadow-soft">
                <ShoppingBag size={18} />
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[3px] text-white/55">Order summary</p>
                <h2 className="font-display font-black italic text-2xl text-white">Ready when you are.</h2>
              </div>
            </div>

            {/* Coupon section */}
            <div className="mb-5 pb-5 border-b border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={14} className="text-accent" />
                <span className="font-display italic text-sm text-white/70">Have a coupon?</span>
              </div>
              {coupon ? (
                <div className="flex items-center justify-between bg-accent/20 rounded-[12px] px-4 py-3">
                  <div>
                    <span className="font-display italic font-bold text-accent text-sm">{coupon.code}</span>
                    <span className="text-white/50 text-xs ml-2">
                      -{coupon.discount_type === "percentage" ? `${coupon.discount_value}%` : `€${coupon.discount_value}`}
                    </span>
                  </div>
                  <button type="button" onClick={removeCoupon} className="text-white/50 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="WELCOME10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-white/10 text-white placeholder:text-white/30 border-2 border-white/10 rounded-[12px] px-4 py-2.5 font-display italic text-sm outline-none focus:border-accent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => applyCoupon(couponCode, subtotal)}
                    disabled={couponLoading || items.length === 0}
                    className="bg-accent text-foreground font-display italic font-bold text-sm px-5 py-2.5 rounded-[12px] border-2 border-dark hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 border-b border-white/10 pb-5">
              <div className="flex items-center justify-between text-white/75">
                <span>Subtotal</span>
                <span className="font-display font-bold text-white">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-white/75">
                <span>Shipping</span>
                <span className="font-display font-bold text-white">{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-accent">
                  <span className="font-display italic">Discount</span>
                  <span className="font-display font-bold">-€{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-white text-xl">
                <span className="font-display italic">Total</span>
                <span className="font-display font-black text-accent text-3xl">€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid gap-3 mt-6">
              <button type="button" className="cta-primary w-full" disabled={items.length === 0} onClick={() => navigate("/checkout")}>
                Proceed to checkout
              </button>
              <button type="button" className="cta-secondary w-full text-white border-white/20 hover:text-foreground" disabled={items.length === 0} onClick={clearCart}>
                Clear bag
              </button>
            </div>

            <div className="grid gap-3 mt-6">
              {[
                { icon: <Truck size={16} />, text: shipping === 0 ? "Free shipping unlocked" : "Free shipping from €80" },
                { icon: <ShieldCheck size={16} />, text: "Discreet billing and packaging" },
              ].map((item) => (
                <div key={item.text} className="surface-card rounded-[18px] px-4 py-3 text-foreground flex items-center gap-3">
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CartPage;
