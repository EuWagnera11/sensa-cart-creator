import { useState, useCallback, useEffect, useRef, useMemo } from "react";

interface UseCarouselOptions {
  itemCount: number;
  autoPlayInterval?: number;
  visibleCount?: number;
}

interface CardStyle {
  transform: string;
  opacity: number;
  filter: string;
  zIndex: number;
  pointerEvents: "auto" | "none";
}

export function useCarousel({
  itemCount,
  autoPlayInterval = 4000,
  visibleCount = 5,
}: UseCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % itemCount) + itemCount) % itemCount);
  }, [itemCount]);

  // Auto-play
  useEffect(() => {
    if (itemCount <= 1) return;

    const tick = () => {
      if (!isPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % itemCount);
      }
    };

    intervalRef.current = setInterval(tick, autoPlayInterval);
    return () => clearInterval(intervalRef.current);
  }, [itemCount, autoPlayInterval]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // Circular distance
  const getDistance = useCallback(
    (index: number) => {
      const diff = index - activeIndex;
      const absDiff = Math.abs(diff);
      return Math.min(absDiff, itemCount - absDiff);
    },
    [activeIndex, itemCount],
  );

  // Signed circular offset (-N..0..+N)
  const getSignedOffset = useCallback(
    (index: number) => {
      let diff = index - activeIndex;
      if (diff > itemCount / 2) diff -= itemCount;
      if (diff < -itemCount / 2) diff += itemCount;
      return diff;
    },
    [activeIndex, itemCount],
  );

  const getCardStyle = useCallback(
    (index: number): CardStyle => {
      const dist = getDistance(index);
      const signed = getSignedOffset(index);
      const half = Math.floor(visibleCount / 2);

      if (dist > half) {
        return {
          transform: `translateX(${signed * 240}px) scale(0.6)`,
          opacity: 0,
          filter: "blur(4px)",
          zIndex: 0,
          pointerEvents: "none",
        };
      }

      if (dist === 0) {
        return {
          transform: "translateX(0px) scale(1)",
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 10,
          pointerEvents: "auto",
        };
      }

      if (dist === 1) {
        return {
          transform: `translateX(${signed * 220}px) scale(0.85)`,
          opacity: 0.7,
          filter: "blur(1px)",
          zIndex: 5,
          pointerEvents: "auto",
        };
      }

      // dist === 2+
      return {
        transform: `translateX(${signed * 400}px) scale(0.7)`,
        opacity: 0.35,
        filter: "blur(3px)",
        zIndex: 2,
        pointerEvents: "auto",
      };
    },
    [getDistance, getSignedOffset, visibleCount],
  );

  return {
    activeIndex,
    next,
    prev,
    goTo,
    pause,
    resume,
    getCardStyle,
    getDistance,
    getSignedOffset,
  };
}
