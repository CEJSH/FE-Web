import { getFeedDetail } from "@/features/feed/api/feed";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useFeedDetail({ id }: { id: string }) {
  return useQuery({
    queryKey: queryKeys.feed.detail(id),
    queryFn: () => getFeedDetail({ feedId: id }),
    refetchOnWindowFocus: true,
    enabled: !!id,
  });
}
