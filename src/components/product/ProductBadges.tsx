import { useEffect, useState } from "react";
import { Check, Flame, X as XIcon } from "lucide-react";

interface StockProps {
  /** From Shopify: variant.quantityAvailable (Storefront API) — may be null if hidden */
  quantityAvailable?: number | null;
  availableForSale: boolean;
}

/**
 * Stock indicator — adds urgency without lying.
 * - Sold out → red
 * - quantity 1-3 → orange "Only N left"
 * - quantity 4+ → green "In stock"
 * - quantity null → green "In stock" (Shopify hides exact counts)
 */
export const StockIndicator = ({ quantityAvailable, availableForSale }: StockProps) => {
  if (!availableForSale) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 border border-primary rounded-sm">
        <XIcon size={12} className="text-primary" />
        <span className="font-display italic font-black text-[11px] uppercase tracking-wider text-primary">
          Sold out
        </span>
      </div>
    );
  }

  if (typeof quantityAvailable === "number" && quantityAvailable > 0 && quantityAvailable <= 3) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-accent border-[2px] border-dark rounded-sm">
        <Flame size={12} className="text-foreground" />
        <span className="font-display italic font-black text-[11px] uppercase tracking-wider text-foreground">
          Only {quantityAvailable} left
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-success/10 border border-success rounded-sm">
      <Check size={12} className="text-success" />
      <span className="font-display italic font-black text-[11px] uppercase tracking-wider text-success">
        In stock
      </span>
    </div>
  );
};

interface DiscountProps {
  price: number;
  compareAtPrice?: number | null;
}

/**
 * Discount badge — shown only when compareAtPrice > price.
 * Format: "-XX%" with sharp red background.
 */
export const DiscountBadge = ({ price, compareAtPrice }: DiscountProps) => {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  const pct = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  if (pct < 5) return null; // don't show trivial discounts
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 bg-primary text-cream border-[2px] border-dark rounded-sm font-display italic font-black text-xs uppercase tracking-wider"
      style={{ boxShadow: "2px 2px 0 hsl(var(--dark))" }}
    >
      -{pct}%
    </span>
  );
};

interface StickyCTAProps {
  visible: boolean;
  productTitle: string;
  price: string;
  available: boolean;
  qty: number;
  onIncQty: () => void;
  onDecQty: () => void;
  onAdd: () => void;
  isAddingToCart: boolean;
}

/**
 * Sticky bottom bar on mobile — appears after user scrolls past the main CTA.
 * Allows quick add without scrolling back up. Hidden on desktop.
 */
export const StickyMobileCTA = ({
  visible,
  productTitle,
  price,
  available,
  qty,
  onIncQty,
  onDecQty,
  onAdd,
  isAddingToCart,
}: StickyCTAProps) => {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Add to bag"
      className="fixed inset-x-0 bottom-0 z-[100] lg:hidden bg-cream border-t-[3px] border-dark"
      style={{ boxShadow: "0 -4px 0 hsl(var(--dark))" }}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-serif italic text-[11px] text-muted-foreground line-clamp-1">
            {productTitle}
          </p>
          <p className="font-display font-black text-lg text-foreground tabular-nums leading-tight">
            {price}
          </p>
        </div>
        <div className="flex items-center border-[2px] border-dark rounded-sm overflow-hidden">
          <button
            type="button"
            onClick={onDecQty}
            aria-label="Decrease quantity"
            className="px-2.5 py-1.5 bg-parch text-foreground font-bold text-sm hover:bg-accent transition-colors"
          >
            −
          </button>
          <span className="px-2.5 py-1.5 bg-cream font-display font-black text-sm min-w-[28px] text-center tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={onIncQty}
            aria-label="Increase quantity"
            className="px-2.5 py-1.5 bg-parch text-foreground font-bold text-sm hover:bg-accent transition-colors"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={!available || isAddingToCart}
          className="cta-primary px-4 py-2.5 text-xs disabled:opacity-50"
        >
          {available ? "Add" : "Sold out"}
        </button>
      </div>
    </div>
  );
};

interface ShareProps {
  productTitle: string;
  productUrl: string;
}

/**
 * Discreet share — WhatsApp, Email, Copy link. Message is generic
 * ("Check this out:") with no mention of adult/pleasure/sex.
 */
export const ShareButton = ({ productTitle, productUrl }: ShareProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generic share text — never mentions adult content
  const shareText = `Check this out: ${productTitle}`;
  const fullUrl = productUrl.startsWith("http") ? productUrl : `${window.location.origin}${productUrl}`;

  const onWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const onEmail = () => {
    const url = `mailto:?subject=${encodeURIComponent("Take a look at this")}&body=${encodeURIComponent(`${shareText}\n\n${fullUrl}`)}`;
    window.location.href = url;
    setOpen(false);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    setTimeout(() => document.addEventListener("click", handler), 0);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="inline-flex items-center gap-1.5 text-xs font-serif italic text-muted-foreground hover:text-foreground transition-colors underline decoration-dotted"
      >
        Share
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-50 bg-cream border-[2px] border-dark rounded-sm overflow-hidden min-w-[160px]"
          style={{ boxShadow: "4px 4px 0 hsl(var(--dark))" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onWhatsApp}
            className="flex items-center w-full px-3 py-2 font-serif italic text-sm text-foreground hover:bg-parch transition-colors border-b border-dark/10 text-left"
          >
            WhatsApp
          </button>
          <button
            type="button"
            onClick={onEmail}
            className="flex items-center w-full px-3 py-2 font-serif italic text-sm text-foreground hover:bg-parch transition-colors border-b border-dark/10 text-left"
          >
            Email
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="flex items-center w-full px-3 py-2 font-serif italic text-sm text-foreground hover:bg-parch transition-colors text-left"
          >
            {copied ? "✓ Copied!" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
};
