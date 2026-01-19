import { getKakaoToken } from "@/features/auth/api/auth";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export const useKakaoAuth = ({
  client_id,
  redirect_uri,
  auth_code,
}: {
  client_id?: string;
  redirect_uri?: string;
  auth_code: string;
}) => {
  return useQuery({
    queryKey: queryKeys.auth.kakaoToken(client_id, redirect_uri, auth_code),
    queryFn: () =>
      getKakaoToken({
        client_id: client_id ?? "",
        redirect_uri: redirect_uri ?? "",
        auth_code,
      }),
    enabled: !!auth_code?.trim(),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
};
