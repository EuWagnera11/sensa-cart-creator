import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/useWishlist";

interface Props {
  handle: string;
  productTitle?: string;
  /** Size variant: "sm" for cards, "lg" for PDP */
  size?: "sm" | "lg";
  /** Visual style: "ghost" (transparent) or "filled" (cream bg) */
  variant?: "ghost" | "filled";
  className?: string;
}

/**
 * Heart toggle button. Adds/removes a product from the wishlist.
 * - Optimistic update (no flash)
 * - Toast feedback on toggle
 * - Stops event propagation (use inside Links/Cards)
 * - Animation: scale-bounce on click
 */
const WishlistHeart = ({
  handle,
  productTitle,
  size = "sm",
  variant = "filled",
  className = "",
}: Props) => {
  const { has, toggle } = useWishlist();
  const [bumping, setBumping] = useState(false);

  const isInWishlist = has(handle);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBumping(true);
    setTimeout(() => setBumping(false), 250);
    const willAdd = !isInWishlist;
    await toggle(handle);
    if (willAdd) {
      toast.success(productTitle ? `Saved: ${productTitle.slice(0, 40)}` : "Added to wishlist 💝");
    } else {
      toast(productTitle ? `Removed: ${productTitle.slice(0, 40)}` : "Removed from wishlist");
    }
  };

  const dimensions = size === "sm" ? "w-8 h-8" : "w-11 h-11";
  const iconSize = size === "sm" ? 14 : 20;

  const bgStyles =
    variant === "filled"
      ? "bg-cream/95 border-[2px] border-dark hover:bg-cream shadow-[2px_2px_0_hsl(var(--dark))]"
      : "bg-transparent hover:bg-cream/30 border-[2px] border-transparent";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isInWishlist ? `Remove ${productTitle || "item"} from wishlist` : `Add ${productTitle || "item"} to wishlist`}
      aria-pressed={isInWishlist}
      className={`
        inline-flex items-center justify-center rounded-sm
        ${dimensions} ${bgStyles}
        transition-all duration-200
        ${bumping ? "scale-125" : "scale-100"}
        ${className}
      `}
    >
      <Heart
        size={iconSize}
        className={`transition-colors ${isInWishlist ? "text-primary fill-primary" : "text-foreground"}`}
        strokeWidth={2}
      />
    </button>
  );
};

export default WishlistHeart;
