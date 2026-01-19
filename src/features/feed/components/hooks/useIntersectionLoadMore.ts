import { useEffect } from "react";

interface UseIntersectionLoadMoreProps {
  inView: boolean;
  inViewMine?: boolean;
  loadMore: () => void;
  loadMoreMine?: () => void;
}

export function useIntersectionLoadMore({
  inView,
  inViewMine,
  loadMore,
  loadMoreMine,
}: UseIntersectionLoadMoreProps) {
  useEffect(() => {
    if (inView) loadMore();
    if (inViewMine && loadMoreMine) loadMoreMine();
  }, [inView, inViewMine, loadMore, loadMoreMine]);
}
