import { getFeedComments } from "@/features/feed/api/feed-comment";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useFeedComments({ feedId }: { feedId: string }) {
  return useQuery({
    queryKey: queryKeys.feed.comments(feedId),
    queryFn: () => getFeedComments({ feedId }),
    refetchOnWindowFocus: "always",
    staleTime: 60 * 1000,
    enabled: feedId !== "",
  });
}
