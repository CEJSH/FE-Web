import { maxDate, minDate } from "@/shared/constants/time";
import type * as lighty from "lighty-type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { getGatheringsEnded } from "@/features/gathering/api/gathering";
import { queryKeys } from "@/lib/queryKeys";

const uuid = uuidv4();

/** createdAt = 현재날짜 */
export default function useGatheringEnded({ limit }: { limit: number }) {
  const cursor = { createdAt: maxDate(), id: uuid };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.gathering.ended(),
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.EndedGatheringsListResponse> => {
      return getGatheringsEnded({
        cursor,
        limit: limit ? limit : 8,
        minDate: minDate(),
        maxDate: maxDate(),
      });
    },
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
