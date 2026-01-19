import { getFeedHidden } from "@/features/feed/api/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FeedResponse } from "@/models/feed";
import { queryKeys } from "@/lib/queryKeys";

const uuid = uuidv4();

export default function useFeedHidden({ limit }: { limit: number }) {
  const defaultCursor = {
    createdAt: new Date().toISOString(),
    id: uuid,
  };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.feed.hidden(),
    queryFn: async ({ pageParam }): Promise<FeedResponse> =>
      getFeedHidden({ cursor: pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
    throwOnError: true,
    staleTime: 3600 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ feeds }) => feeds).flat() || undefined;

  return { data: friends, loadMore, isFetching, hasNextPage };
}
