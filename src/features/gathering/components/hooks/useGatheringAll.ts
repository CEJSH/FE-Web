import { useInfiniteQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import type * as lighty from "lighty-type";
import { getGatheringAll } from "@/features/gathering/api/gathering";
import { useCallback } from "react";
import { maxDate, minDate } from "@/shared/constants/time";
import { queryKeys } from "@/lib/queryKeys";

const uuid = uuidv4();

export default function useGatheringAll() {
  const cursor = { createdAt: minDate(), id: uuid };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.gathering.all(),
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.GatheringListResponse> =>
      await getGatheringAll({
        cursor,
        minDate: minDate(),
        maxDate: maxDate(),
        limit: 300,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const gatherings = data?.pages.map(({ gatherings }) => gatherings).flat();

  return { data: gatherings, loadMore, isFetching, hasNextPage };
}
