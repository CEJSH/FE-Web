import { getIdAvailability } from "@/features/users/api/users";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useIdAvailability({
  accountId,
}: {
  accountId: string;
}) {
  return useQuery({
    queryKey: queryKeys.user.idAvailability(accountId),
    queryFn: () => getIdAvailability({ accountId }),
    enabled: accountId.length > 3,
    staleTime: 600 * 1000,
  });
}
