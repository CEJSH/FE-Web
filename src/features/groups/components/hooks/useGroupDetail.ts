import { getGroup } from "@/features/groups/api/group";
import { lightyToast } from "@/shared/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/lib/queryKeys";

export const useGroupDetail = (id: string) => {
  const router = useRouter();

  return useQuery({
    queryKey: queryKeys.group.detail(id),
    queryFn: () => getGroup(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (failureCount === 7) {
        return false;
      } else if (error) {
        lightyToast.error("그룹을 찾을 수 없어요 다시 시도해 주세요");
        router.back();
        return false;
      }
      return true;
    },
  });
};
