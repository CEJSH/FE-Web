import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "./debounceForScroll";
import { logger } from "@/shared/utils/logger";

interface InfiniteScrollType {
  isFetching: boolean;
  loadMore: () => void;
}

/**
 * 브라우저 전체 스크롤에 기반한 무한 스크롤 Hook
 */
const useInfiniteScroll = ({ isFetching, loadMore }: InfiniteScrollType) => {
  const [page, setPage] = useState(0);

  const checkScrollPosition = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const remainingScroll = documentHeight - (scrollTop + windowHeight);

    if (remainingScroll < 360 && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching]);

  const debouncedScroll = useDebounce(checkScrollPosition, 300);

  useEffect(() => {
    document.addEventListener("scroll", debouncedScroll);
    return () => {
      document.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  useEffect(() => {
    if (page > 0) {
      loadMore();
    }
  }, [page, loadMore]);
};

export default useInfiniteScroll;

interface InfiniteScrollRefProps {
  isFetching: boolean;
  loadMore: () => void;
  targetRef: RefObject<HTMLElement>;
  threshold?: number;
  selectedTab?: string;
}

/**
 * 특정 DOM 요소 기준 스크롤에 기반한 무한 스크롤 Hook
 */
export const useInfiniteScrollByRef = ({
  isFetching,
  loadMore,
  targetRef,
  threshold = 3000,
  selectedTab,
}: InfiniteScrollRefProps) => {
  const [page, setPage] = useState(0);
  const isLoadingRef = useRef(false);

  const checkScrollPosition = useCallback(() => {
    const element = targetRef.current;

    if (!element || isFetching || isLoadingRef.current) {
      logger.debug("스크롤 체크 중단:", {
        refExists: !!targetRef.current,
        isFetching,
        isLoading: isLoadingRef.current,
      });
      return;
    }

    const elementHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const remainingScroll = elementHeight - (scrollTop + clientHeight);

    // console.log("스크롤 위치 체크:", {
    //   elementHeight,
    //   scrollTop,
    //   clientHeight,
    //   remainingScroll,
    //   threshold,
    // });

    if (remainingScroll < threshold) {
      isLoadingRef.current = true;
      setPage((prev) => prev + 1);
    }
  }, [isFetching, targetRef, threshold]);

  const debouncedScroll = useDebounce(checkScrollPosition, 300);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    element.addEventListener("scroll", debouncedScroll);
    return () => {
      element.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll, targetRef]);

  useEffect(() => {
    if (page > 0 && !isFetching && isLoadingRef.current) {
      loadMore();
      isLoadingRef.current = false;
    }
  }, [page, loadMore, isFetching]);

  useEffect(() => {
    if (!isFetching) {
      isLoadingRef.current = false;
    }
  }, [isFetching]);

  useEffect(() => {
    setPage(0);
    isLoadingRef.current = false;
  }, [selectedTab]);
};
