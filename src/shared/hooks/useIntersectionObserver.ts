import { isIntersectingAtom } from "@/shared/state/scroll";
import { useEffect, type RefObject } from "react";
import { useRecoilState } from "recoil";

interface UseIntersectionObserverProps {
  elementRef: RefObject<Element>;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver({
  elementRef,
  threshold = 0,
  root = null,
  rootMargin = "0%",
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] =
    useRecoilState(isIntersectingAtom);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
}
