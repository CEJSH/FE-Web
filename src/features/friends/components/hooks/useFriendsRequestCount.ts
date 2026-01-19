import { getFriendsRequestTotalCount } from "@/features/friends/api/friends";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useFriendsRequestTotalCount() {
  return useQuery({
    queryKey: queryKeys.friends.requests.count(),
    queryFn: () => getFriendsRequestTotalCount(),
    refetchOnWindowFocus: "always",
  });
}
