import { getSentFriendRequestsList } from "@/features/friends/api/friends";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useSentFriendsRequests({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: queryKeys.friends.requests.sent({ name, accountId, limit }),
    queryFn: () => {
      return getSentFriendRequestsList({ name, accountId, limit });
    },
    staleTime: 5 * 60 * 1000,
  });
}
