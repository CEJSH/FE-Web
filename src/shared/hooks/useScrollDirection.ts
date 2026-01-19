import { useState, useEffect, type RefObject } from "react";

type ScrollDirection = "up" | "down" | null;

export function useScrollDirection<T extends HTMLElement>({
  elementRef,
  threshold = 144,
  selectedTab,
}: {
  elementRef: RefObject<T>;
  threshold?: number;
  selectedTab: "1" | "2";
}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState<"1" | "2">(selectedTab);

  useEffect(() => {
    const element = elementRef.current;
    setTab(selectedTab);
    if (!element) return;

    if (selectedTab !== tab) {
      setTab(selectedTab);
      setVisible(true);
    }

    const handleScroll = () => {
      const currentScrollTop = element.scrollTop;

      if (currentScrollTop < threshold) {
        setVisible(true);
        setScrollDirection(null);
        setPrevScrollTop(currentScrollTop);
        return;
      }

      if (currentScrollTop > prevScrollTop) {
        if (scrollDirection !== "down") {
          setScrollDirection("down");
          if (currentScrollTop >= threshold) {
            setVisible(false);
          }
        }
      } else {
        if (scrollDirection !== "up") {
          setScrollDirection("up");
          setVisible(true);
        }
      }

      setPrevScrollTop(currentScrollTop);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [
    elementRef.current,
    prevScrollTop,
    scrollDirection,
    threshold,
    selectedTab,
  ]);

  return { scrollDirection, visible };
}
