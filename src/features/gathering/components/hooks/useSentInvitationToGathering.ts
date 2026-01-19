import { getSentInvitationToGatheringList } from "@/features/gathering/api/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import type * as lighty from "lighty-type";
import { v4 as uuidv4 } from "uuid";
import { maxDate, minDate } from "@/shared/constants/time";
import { queryKeys } from "@/lib/queryKeys";

const uuid = uuidv4();

export default function useSentInvitationToGathering() {
  const defaultCursor = { createdAt: new Date().toISOString(), id: uuid };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.gathering.invitations.sent(),
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.SentGatheringInvitationListResponse> => {
      return getSentInvitationToGatheringList({
        cursor,
        limit: 5,
        minDate: minDate(),
        maxDate: maxDate(),
      });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
    staleTime: 5 * 60 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ invitations }) => invitations).flat();
  return { data: friends, loadMore, isFetching, hasNextPage };
}
