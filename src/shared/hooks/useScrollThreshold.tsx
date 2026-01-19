import { RefObject, useEffect, useState } from "react";

export function useAnyScrollThreshold(
  containerRef?: RefObject<HTMLDivElement>,
  threshold = 50
) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const target = containerRef?.current || window;

    const handleScroll = () => {
      let scrollTop;

      if (target === window) {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      } else {
        scrollTop = (target as HTMLElement).scrollTop;
      }

      // console.log("스크롤 위치:", scrollTop); // 디버깅용
      setIsPastThreshold(scrollTop > threshold);
    };

    handleScroll();

    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => target.removeEventListener("scroll", handleScroll);
  }, [containerRef, threshold]);

  return isPastThreshold;
}
