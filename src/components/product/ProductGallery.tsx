import React, { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageItem {
  url: string;
  altText?: string | null;
}

interface Props {
  images: ImageItem[];
  productTitle: string;
}

/**
 * Product gallery with:
 * - Desktop: hover-zoom (magnifier lens, pan-by-mouse)
 * - Mobile: tap-to-open lightbox (swipe between images)
 * - Thumbnails strip (5 visible, +N if more)
 */
const ProductGallery = ({ images, productTitle }: Props) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square border-[3px] border-dark rounded-sm bg-surface flex items-center justify-center text-[8rem]">
        🛍️
      </div>
    );
  }

  const mainImg = images[activeIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden border-[3px] border-dark rounded-sm bg-surface cursor-zoom-in"
        style={{ boxShadow: "var(--shadow-brutal, 5px 5px 0 hsl(var(--dark)))" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setLightboxIdx(activeIdx)}
      >
        <img
          src={mainImg.url}
          alt={mainImg.altText || productTitle}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-200 ${
            hover ? "scale-[1.8]" : "scale-100"
          }`}
          style={
            hover
              ? { transformOrigin: `${pos.x}% ${pos.y}%` }
              : undefined
          }
        />

        {/* Zoom hint (mobile-only via screen size) */}
        <div className="absolute bottom-3 right-3 lg:hidden bg-cream border-[2px] border-dark rounded-sm px-2 py-1 inline-flex items-center gap-1.5">
          <ZoomIn size={12} className="text-foreground" />
          <span className="font-display italic font-black text-[10px] uppercase tracking-wider text-foreground">
            Tap to zoom
          </span>
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-dark text-cream rounded-sm px-2 py-1 font-display italic font-black text-[10px] tabular-nums">
            {activeIdx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square overflow-hidden border-[2px] rounded-sm transition-all bg-surface ${
                i === activeIdx
                  ? "border-primary shadow-[2px_2px_0_hsl(var(--primary))]"
                  : "border-dark/20 hover:border-dark/50"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {i === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
                  <span className="font-display italic font-black text-cream text-xs">
                    +{images.length - 5}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIdx={lightboxIdx}
          title={productTitle}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </div>
  );
};

// ===== Lightbox sub-component =====
const Lightbox = ({
  images,
  startIdx,
  title,
  onClose,
}: {
  images: ImageItem[];
  startIdx: number;
  title: string;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIdx);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  // Keyboard nav
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — image ${idx + 1} of ${images.length}`}
      className="fixed inset-0 z-[9999] bg-dark/95 flex items-center justify-center px-4"
      onClick={onClose}
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        setTouchStartX(null);
      }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-cream hover:text-primary transition-colors z-10"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cream hover:text-primary transition-colors z-10"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[idx].url}
        alt={images[idx].altText || title}
        className="max-w-[92vw] max-h-[88vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-cream hover:text-primary transition-colors z-10"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-cream/95 border-[2px] border-dark rounded-sm px-3 py-1 font-display italic font-black text-xs text-foreground tabular-nums">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
};


export default ProductGallery;
