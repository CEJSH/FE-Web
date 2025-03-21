import { getFeedComments } from "@/remote/feed-comment";
import { useQuery } from "@tanstack/react-query";

export default function useFeedComments({ feedId }: { feedId: string }) {
  return useQuery({
    queryKey: ["get/comments", { feedId }],
    queryFn: () => getFeedComments({ feedId }),
    refetchOnWindowFocus: "always",
    staleTime: 60 * 1000,
    enabled: feedId !== "",
  });
}
