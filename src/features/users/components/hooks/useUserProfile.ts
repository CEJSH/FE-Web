import { getUserProfile } from "@/features/users/api/users";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useUserProfile({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: () => getUserProfile(),
    enabled,
  });
}
