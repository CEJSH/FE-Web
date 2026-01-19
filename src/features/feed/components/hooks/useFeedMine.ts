import { getFeedMine } from "@/features/feed/api/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useMemo } from "react";
import { FeedResponse } from "@/models/feed";
import { queryKeys } from "@/lib/queryKeys";

const uuid = uuidv4();
export default function useFeedMine({
  order,
  minDate,
  maxDate,
  limit,
  enabled = true,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
  enabled?: boolean;
}) {
  const defaultCursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.feed.mine(),
    queryFn: async ({ pageParam: cursor }): Promise<FeedResponse> =>
      getFeedMine({ cursor, order, minDate, maxDate, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
    staleTime: 60 * 1000,
    enabled,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = useMemo(
    () => data?.pages.flatMap(({ feeds }) => feeds) ?? undefined,
    [data]
  );
  return { data: friends, loadMore, isFetching, hasNextPage };
}
