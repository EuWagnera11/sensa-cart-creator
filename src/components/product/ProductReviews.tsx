import { Star, MessageSquare } from "lucide-react";

interface Props {
  handle: string;
}

/**
 * Reviews placeholder — empty state only.
 *
 * Per platform policy and consumer-protection laws (EU/BR), we never
 * display fabricated reviews, ratings, names or "verified buyer" badges.
 * To collect real reviews, install a Shopify review app (Judge.me, Loox,
 * Stamped, Yotpo) and integrate its widget here.
 */
const ProductReviews = ({ handle }: Props) => {
  return (
    <section id="reviews" className="mt-14 lg:mt-20">
      <div className="flex items-end justify-between gap-4 mb-6 border-b-[3px] border-dark pb-3">
        <h2 className="font-display font-black italic text-foreground" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
          Reviews
        </h2>
      </div>

      <div
        className="bg-cream border-[3px] border-dark rounded-sm p-8 lg:p-10 text-center"
        style={{ boxShadow: "5px 5px 0 hsl(var(--dark))" }}
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-parch border-[3px] border-dark mb-4">
          <MessageSquare size={22} className="text-foreground" />
        </div>

        <div className="inline-flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={18} className="text-dark/20" fill="currentColor" strokeWidth={0} />
          ))}
        </div>

        <h3 className="font-display font-black italic text-xl text-foreground mb-2">
          No reviews yet
        </h3>
        <p className="font-serif italic text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Be the first to share your experience. Verified reviews from real buyers will appear here.
        </p>
      </div>
    </section>
  );
};

export default ProductReviews;
