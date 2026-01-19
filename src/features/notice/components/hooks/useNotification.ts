import { getNotification } from "@/features/notice/api/notification";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
import { queryKeys } from "@/lib/queryKeys";

export default function useNotification() {
  const defaultCursor = { createdAt: new Date().toISOString(), id: uuid };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.notification.list(),
    queryFn: ({ pageParam: cursor }) => getNotification({ cursor, limit: 9 }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: defaultCursor,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const groups = data?.pages.map(({ notifications }) => notifications).flat();
  return { data: groups, loadMore, isFetching, hasNextPage };
}
