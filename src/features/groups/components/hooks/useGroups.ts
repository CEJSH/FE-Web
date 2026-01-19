import { getGroups } from "@/features/groups/api/group";
import { lightyToast } from "@/shared/utils/toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { queryKeys } from "@/lib/queryKeys";

export default function useGroup({ limit = 6 }: { limit?: number }) {
  const router = useRouter();
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: queryKeys.group.list(),
    queryFn: ({ pageParam: cursor }) =>
      getGroups({
        cursor: cursor === null ? new Date().toISOString() : cursor,
        limit: limit ?? 7,
      }),
    retry: (failureCount, error) => {
      if (failureCount === 10) {
        return false;
      } else if (error) {
        lightyToast.error("그룹을 찾을 수 없어요.");
        router.back();
        return false;
      }
      return true;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
    staleTime: 5 * 60 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const groups = data?.pages.map(({ groups }) => groups).flat();
  return {
    data: groups,
    loadMore,
    isFetching,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  };
}
