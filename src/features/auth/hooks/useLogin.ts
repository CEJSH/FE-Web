import { Providers } from "@/shared/constants/oAuthButtons";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { postLogin, storeAuthData } from "@/features/auth/api/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const useLogin = () => {
  const router = useRouter();

  const login = useCallback(
    async ({
      accessToken,
      provider,
    }: {
      accessToken: string;
      provider: Providers;
    }) => {
      const deviceId = uuidv4();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);

      const { response, data } = await postLogin({
        accessToken,
        provider,
        deviceId,
      });

      if (response.ok) {
        storeAuthData(data.accessToken, {
          accountId: data.accountId,
          profileImageUrl: data.profileImageUrl,
        });
        router.push("/feed");
        return;
      }

      switch (response.status) {
        case 404:
          sessionStorage.setItem(STORAGE_KEYS.OAUTH_DATA, JSON.stringify(data));
          router.push("/signup");
          break;
        case 409:
          throw new Error("다른 플랫폼으로 가입된 계정입니다.");
        case 401:
          throw new Error("인증 토큰이 유효하지 않습니다.");
        case 500:
          throw new Error("서버 오류가 발생했습니다.");
        default:
          throw new Error("로그인 처리 중 문제가 발생했습니다.");
      }
    },
    [router]
  );

  return { login };
};
