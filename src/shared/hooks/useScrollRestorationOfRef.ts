import { usePathname } from "next/navigation";
import { RefObject, useEffect, useCallback, useRef } from "react";

const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

export const useScrollRestorationOfRef = (
  key: string,
  ref: RefObject<HTMLElement>
) => {
  const pathname = usePathname();

  // 스크롤 여부 추적
  const isScrolling = useRef(false);

  // const logWithKey = useCallback(
  //   (message: string, value?: any) => {
  //     console.log(
  //       `[ScrollRestoration:${key}] ${message}`,
  //       value !== undefined ? value : ""
  //     );
  //   },
  //   [key]
  // );

  const saveScrollPosition = useCallback(() => {
    if (ref.current) {
      const scrollTop = ref.current.scrollTop;
      sessionStorage.setItem(key, String(scrollTop));
    }
  }, [key, ref]);

  const restoreScrollPosition = useCallback(() => {
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition && ref.current) {
      ref.current.scrollTop = Number(savedPosition);
    }
  }, [key, ref]);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const handleScrollStart = () => {
      isScrolling.current = true;
    };

    const handleScrollThrottled = throttle(() => {
      saveScrollPosition();
    }, 100);

    const handleScrollEnd = () => {
      isScrolling.current = false;
      saveScrollPosition();
    };

    const handleScroll = () => {
      if (!isScrolling.current) {
        handleScrollStart();
      }
      handleScrollThrottled();

      clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(handleScrollEnd, 150);
    };

    const scrollEndTimer = { current: setTimeout(() => {}, 0) };

    const handleTouchEnd = () => {
      saveScrollPosition();
    };

    const handleBlur = () => {
      saveScrollPosition();
    };

    currentRef.addEventListener("scroll", handleScroll, { passive: true });
    currentRef.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("blur", handleBlur);

    return () => {
      clearTimeout(scrollEndTimer.current);
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
        currentRef.removeEventListener("touchend", handleTouchEnd);
      }
      window.removeEventListener("blur", handleBlur);
    };
  }, [ref, saveScrollPosition]);

  // 페이지 변경 시 스크롤 위치 복원
  useEffect(() => {
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 100);

    return () => {
      clearTimeout(timer);
      saveScrollPosition();
    };
  }, [pathname, saveScrollPosition, restoreScrollPosition]);

  // 페이지 이탈 시 스크롤 위치 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [saveScrollPosition]);

  return { saveScrollPosition, restoreScrollPosition };
};
