import { useState, useEffect, useCallback, useRef, useMemo } from "react";

interface ScrollState {
  isVisible: boolean;
  scrollProgress: number;
  isPastThreshold: boolean;
}

export function useScrollNew(
  scrollElementId?: string,
  threshold = 10
): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isVisible: true,
    scrollProgress: 0,
    isPastThreshold: false,
  });
  const prevScrollPosRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const scrollElement = useMemo(() => {
    if (typeof window === "undefined") return null;
    return scrollElementId
      ? document.getElementById(scrollElementId)
      : document.documentElement;
  }, [scrollElementId]);

  const calculateScrollState = useCallback(() => {
    if (!scrollElement) return;

    const lastKnownScrollPosition = scrollElement.scrollTop;
    const maxScrollHeight =
      scrollElement.scrollHeight - scrollElement.clientHeight;

    const scrollProgress =
      maxScrollHeight > 0
        ? Math.min(lastKnownScrollPosition / maxScrollHeight, 1)
        : 0;

    const isScrollingDown = lastKnownScrollPosition > prevScrollPosRef.current;
    const scrollDifference = Math.abs(
      lastKnownScrollPosition - prevScrollPosRef.current
    );

    setScrollState((prevState) => {
      const newState = {
        isVisible:
          scrollDifference > threshold ? !isScrollingDown : prevState.isVisible,
        scrollProgress,
        isPastThreshold: lastKnownScrollPosition > threshold,
      };

      // Only update state if there's a change
      return JSON.stringify(newState) !== JSON.stringify(prevState)
        ? newState
        : prevState;
    });

    prevScrollPosRef.current = lastKnownScrollPosition;
  }, [scrollElement, threshold]);

  const debouncedCalculateScrollState = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(calculateScrollState);
  }, [calculateScrollState]);

  useEffect(() => {
    if (!scrollElement) return;

    // Initial calculation
    calculateScrollState();

    // Scroll event listener
    const handleScroll = debouncedCalculateScrollState;

    const targetElement = scrollElementId ? scrollElement : window;
    targetElement.addEventListener("scroll", handleScroll, { passive: true });

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        calculateScrollState();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", calculateScrollState);

    return () => {
      targetElement.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", calculateScrollState);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    scrollElement,
    scrollElementId,
    calculateScrollState,
    debouncedCalculateScrollState,
  ]);

  return scrollState;
}
