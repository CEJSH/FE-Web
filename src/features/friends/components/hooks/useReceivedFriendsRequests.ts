import { getReceivedFriendRequestsList } from "@/features/friends/api/friends";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useReceivedFriendsRequests({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: queryKeys.friends.requests.received({ name, accountId, limit }),
    queryFn: () => {
      return getReceivedFriendRequestsList({ name, accountId, limit });
    },
    staleTime: 5 * 60 * 1000,
  });
}
