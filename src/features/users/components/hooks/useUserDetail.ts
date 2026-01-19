import { getUserDetail } from "@/features/users/api/users";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useUserDetail() {
  return useQuery({
    queryKey: queryKeys.user.detail(),
    queryFn: () => getUserDetail(),
  });
}
