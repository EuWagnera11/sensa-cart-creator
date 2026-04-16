import { type FormEvent, useState } from "react";
import { ArrowLeft, BadgeCheck, CreditCard, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      toast.error("Your bag is empty.");
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      toast.success("Order placed ✨", {
        description: "Demo checkout completed successfully.",
      });
      navigate("/");
    }, 800);
  };

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      <section className="bg-parch paper-bg px-4 sm:px-6 py-8 sm:py-12 lg:px-12 lg:py-16 border-b-[3px] border-dark">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-display italic text-muted-foreground no-underline hover:text-primary transition-colors mb-4 sm:mb-6">
            <ArrowLeft size={16} /> Back to cart
          </Link>
          <p className="section-kicker text-primary mb-3">Checkout</p>
          <h1 className="font-display font-black italic text-foreground leading-none" style={{ fontSize: "clamp(1.8rem,4vw,4.5rem)" }}>
            Fast, discreet and nearly done.
          </h1>
        </div>
      </section>

      <section className="bg-background paper-bg px-4 sm:px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto grid gap-6 lg:gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <form className="surface-card rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div>
                <h2 className="font-display font-black italic text-2xl text-foreground">Delivery details</h2>
                <p className="text-sm text-muted-foreground mt-2">This is a demo checkout flow ready to be connected to payments later.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "First name", type: "text", autoComplete: "given-name" },
                  { label: "Last name", type: "text", autoComplete: "family-name" },
                  { label: "Email", type: "email", autoComplete: "email" },
                  { label: "Phone", type: "tel", autoComplete: "tel" },
                ].map((field) => (
                  <label key={field.label} className="block">
                    <span className="text-sm font-display italic text-foreground block mb-2">{field.label}</span>
                    <input required type={field.type} autoComplete={field.autoComplete} className="w-full rounded-[16px] border-[3px] border-dark/10 bg-background px-4 py-3 outline-none focus:border-primary transition-colors" />
                  </label>
                ))}
              </div>

              <label className="block">
                <span className="text-sm font-display italic text-foreground block mb-2">Address</span>
                <input required autoComplete="street-address" className="w-full rounded-[16px] border-[3px] border-dark/10 bg-background px-4 py-3 outline-none focus:border-primary transition-colors" />
              </label>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Postal code", autoComplete: "postal-code" },
                  { label: "City", autoComplete: "address-level2" },
                  { label: "Country", autoComplete: "country-name" },
                ].map((field) => (
                  <label key={field.label} className="block">
                    <span className="text-sm font-display italic text-foreground block mb-2">{field.label}</span>
                    <input required autoComplete={field.autoComplete} className="w-full rounded-[16px] border-[3px] border-dark/10 bg-background px-4 py-3 outline-none focus:border-primary transition-colors" />
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-display font-black italic text-xl text-foreground mb-3">Payment</h3>
                <div className="surface-panel rounded-[20px] px-5 py-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full border-[3px] border-dark bg-accent text-foreground flex items-center justify-center shadow-soft">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <div className="font-display italic text-foreground">Card payment (demo)</div>
                    <div className="text-sm text-muted-foreground">No real charge will be made in this preview.</div>
                  </div>
                </div>
              </div>

              <button type="submit" className="cta-primary w-full" disabled={isSubmitting || items.length === 0}>
                {isSubmitting ? "Processing..." : `Place order — €${total.toFixed(2)}`}
              </button>
            </div>
          </form>

          <aside className="surface-inverse rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 lg:sticky lg:top-28">
            <h2 className="font-display font-black italic text-xl sm:text-2xl text-white">Order summary</h2>
            <div className="space-y-4 mt-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-[16px] border-[3px] border-dark bg-surface text-2xl flex items-center justify-center shrink-0">
                      {item.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display italic text-white truncate">{item.name}</div>
                      <div className="text-sm text-white/55">Qty {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-display font-bold text-white">€{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between text-white/70"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-white/70"><span>Shipping</span><span>{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</span></div>
              <div className="flex items-center justify-between text-white text-xl"><span className="font-display italic">Total</span><span className="font-display font-black text-accent text-3xl">€{total.toFixed(2)}</span></div>
            </div>

            <div className="grid gap-3 mt-6">
              {[
                { icon: <ShieldCheck size={16} />, text: "Discreet packaging and billing" },
                { icon: <BadgeCheck size={16} />, text: "Secure checkout flow ready for payments" },
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

export default CheckoutPage;