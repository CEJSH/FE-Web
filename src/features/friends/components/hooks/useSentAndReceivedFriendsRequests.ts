import { useQuery } from "@tanstack/react-query";
import {
  getSentFriendRequestsList,
  getReceivedFriendRequestsList,
} from "@/features/friends/api/friends";
import { queryKeys } from "@/lib/queryKeys";

export default function useSentAndReceivedFriendsRequests({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: queryKeys.friends.requests.sentAndReceived({ name, accountId, limit }),
    queryFn: async () => {
      const [sentResponse, receivedResponse] = await Promise.all([
        getSentFriendRequestsList({ name, accountId, limit }),
        getReceivedFriendRequestsList({ name, accountId, limit }),
      ]);

      return {
        sent: sentResponse,
        received: receivedResponse,
      };
    },
  });
}
