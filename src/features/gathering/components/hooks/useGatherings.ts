import { getGatherings } from "@/features/gathering/api/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
import { queryKeys } from "@/lib/queryKeys";

/** 첫 커서는 minDate */
export default function useGatherings({
  limit,
  minDate,
  maxDate,
}: {
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  const defaultCursor = { createdAt: maxDate, id: uuid };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.gathering.list(minDate, maxDate),
    queryFn: ({ pageParam: cursor }) =>
      getGatherings({
        cursor: cursor,
        limit,
        minDate,
        maxDate,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ gatherings }) => gatherings).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
