import { getGatheringDetail } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useGatheringDetail({
  gatheringId,
  enabled,
}: {
  gatheringId: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["gathering/detail", gatheringId],
    queryFn: () => getGatheringDetail({ gatheringId }),
    enabled,
    refetchInterval: 3600 * 1000,
    staleTime: 3600 * 24000,
  });
}
