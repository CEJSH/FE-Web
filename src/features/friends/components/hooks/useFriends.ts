import { getFriends } from "@/features/friends/api/friends";
import { lightyToast } from "@/shared/utils/toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import type * as lighty from "lighty-type";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { queryKeys } from "@/lib/queryKeys";

function useFriends({ userId }: { userId?: string }) {
  const router = useRouter();
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.friends.list(userId ?? ""),
    queryFn: async ({ pageParam }): Promise<lighty.FriendListResponse> => {
      return getFriends({ ...pageParam, limit: 10 });
    },
    enabled: !!userId,
    retry: (failureCount, error) => {
      if (failureCount === 10) {
        return false;
      } else if (error) {
        lightyToast.error("친구를 찾을 수 없어요.");
        router.back();
        return false;
      }
      return true;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      name: "가",
      accountId: "aaaaa",
    },
    staleTime: 5 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ users }) => users).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}

export default useFriends;

export function useFriendsAll({ userId }: { userId: string }) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: queryKeys.friends.all(userId),
    queryFn: async ({ pageParam }): Promise<lighty.FriendListResponse> => {
      return getFriends({ ...pageParam, limit: 100 });
    },
    enabled: !!userId,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      name: "가",
      accountId: "aaaaa",
    },
    staleTime: 5 * 60 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ users }) => users).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
