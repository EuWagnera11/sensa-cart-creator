import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

const CartSheet = () => {
  const { items, itemCount, subtotal, shipping, total, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full max-w-md border-l-[3px] border-dark bg-background p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b-[3px] border-dark bg-surface px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-dark bg-accent text-foreground shadow-soft">
                <ShoppingBag size={18} />
              </div>
              <div>
                <SheetTitle className="font-display text-2xl italic font-black">Your Bag.</SheetTitle>
                <SheetDescription className="font-serif italic text-sm text-muted-foreground">
                  {itemCount} item{itemCount === 1 ? "" : "s"} with discreet intentions.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-dark bg-surface text-4xl shadow-soft">
                🛍️
              </div>
              <h3 className="font-display text-2xl italic font-black text-foreground">Quietly empty.</h3>
              <p className="mt-3 max-w-[260px] font-serif italic text-sm leading-7 text-muted-foreground">
                Add a few favorites and they will show up here with quantity controls and totals.
              </p>
              <button type="button" className="cta-primary mt-6" onClick={() => setIsOpen(false)}>
                Keep shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="surface-card rounded-[20px] p-4">
                    <div className="flex items-start gap-4">
                      <Link
                        to={`/category/${item.categorySlug}/product/${item.slug}`}
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[18px] border-[3px] border-dark bg-surface text-4xl no-underline shadow-soft"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.emoji}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/category/${item.categorySlug}/product/${item.slug}`}
                          className="font-display text-lg italic font-black text-foreground no-underline"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs uppercase tracking-[2px] text-muted-foreground">{item.collection}</p>
                        <p className="mt-2 font-display text-xl font-black text-primary">€{item.price.toFixed(2)}</p>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center overflow-hidden rounded-full border-[2px] border-dark bg-background">
                            <button
                              type="button"
                              className="px-3 py-2 text-foreground transition-colors hover:bg-surface"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[42px] text-center font-display text-sm font-bold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-2 text-foreground transition-colors hover:bg-surface"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border-[2px] border-dark/15 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SheetFooter className="border-t-[3px] border-dark bg-surface px-6 py-6 sm:flex-col sm:space-x-0">
                <div className="mb-4 space-y-3 text-foreground">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Subtotal</p>
                    <p className="font-display text-lg italic font-black">€{subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Shipping</p>
                    <p className="font-display text-lg italic font-black">{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Total</p>
                    <p className="font-display text-3xl italic font-black">€{total.toFixed(2)}</p>
                  </div>
                  <button type="button" className="cta-quiet" onClick={clearCart}>
                    Clear bag
                  </button>
                </div>

                <Link to="/cart" className="cta-primary w-full no-underline" onClick={() => setIsOpen(false)}>
                  View full cart
                </Link>
                <Link to="/checkout" className="cta-secondary mt-3 w-full no-underline text-center" onClick={() => setIsOpen(false)}>
                  Proceed to checkout
                </Link>
                <button type="button" className="cta-secondary mt-3 w-full" onClick={() => setIsOpen(false)}>
                  Continue shopping
                </button>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;