import { scrollAtom, scrollProgressAtom } from "@/shared/state/scroll";
import { useSetRecoilState } from "recoil";
import { useState, useEffect, useCallback, useRef } from "react";

export default function useScroll(
  scrollElementId?: string,
  threshold: number = 10
) {
  const setIsVisible = useSetRecoilState(scrollAtom);
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const prevScrollPosRef = useRef(0);

  const getScrollElement = useCallback(
    () => (scrollElementId ? document.getElementById(scrollElementId) : window),
    [scrollElementId]
  );

  const calculateScrollState = useCallback(() => {
    const scrollElement = getScrollElement();
    if (!scrollElement) return;

    const currentScrollPos =
      scrollElement instanceof HTMLElement
        ? scrollElement.scrollTop
        : window.scrollY;

    const maxScrollHeight =
      scrollElement instanceof HTMLElement
        ? scrollElement.scrollHeight - scrollElement.clientHeight
        : document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

    // Calculate scroll progress
    if (maxScrollHeight > 0) {
      setScrollProgress(Math.min(currentScrollPos / maxScrollHeight, 1));
    }

    // Calculate scroll direction and changes
    const scrollDifference = Math.abs(
      currentScrollPos - prevScrollPosRef.current
    );

    if (scrollDifference > threshold) {
      const isScrollingDown = currentScrollPos > prevScrollPosRef.current;
      setIsVisible(!isScrollingDown);
      prevScrollPosRef.current = currentScrollPos;
    }

    setIsPastThreshold(currentScrollPos > threshold);
  }, [getScrollElement, threshold, setIsVisible, setScrollProgress]);

  useEffect(() => {
    const scrollElement = getScrollElement();
    if (!scrollElement) return;

    // Use ResizeObserver to detect size changes that might affect scroll calculations
    const resizeObserver = new ResizeObserver(calculateScrollState);
    if (scrollElement instanceof HTMLElement) {
      resizeObserver.observe(scrollElement);
    } else {
      resizeObserver.observe(document.documentElement);
    }

    // Initial calculation
    calculateScrollState();

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", calculateScrollState);
    window.addEventListener("focus", calculateScrollState);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", calculateScrollState);
      window.removeEventListener("focus", calculateScrollState);
      resizeObserver.disconnect();
    };
  }, [calculateScrollState, getScrollElement]);

  return { isPastThreshold };
}
