"use client";

import { useKakaoAuth } from "@/features/auth/hooks/useKakaoQuery";
import { useEffect, useState } from "react";
import type { KakaoAuthResponse } from "@/models/user";
import { useSearchParams } from "next/navigation";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { lightyToast } from "@/shared/utils/toast";
import STORAGE_KEYS from "@/shared/constants/storageKeys";

export default function Page() {
  const searchParams = useSearchParams();
  const { login } = useLogin();
  const [authCode, setAuthCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: tokenInfo, error: authError } = useKakaoAuth({
    auth_code: authCode,
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  });

  // 1 URL에서 인증 코드 추출
  useEffect(() => {
    extractAuthCodeFromUrl();
  }, []);

  // 2 인증 후 응답 처리
  useEffect(() => {
    if (authError) {
      handleAuthError();
    } else if (tokenInfo) {
      handleLogin(tokenInfo);
    }
  }, [authError, tokenInfo]);

  const extractAuthCodeFromUrl = () => {
    const code = searchParams?.get("code");
    const returnedState = searchParams?.get("state");
    const storedState = sessionStorage.getItem(STORAGE_KEYS.KAKAO_STATE);

    if (!code) {
      sessionStorage.removeItem(STORAGE_KEYS.KAKAO_STATE);
      setError("URL에서 인증 코드를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }
    if (!returnedState || !storedState || returnedState !== storedState) {
      sessionStorage.removeItem(STORAGE_KEYS.KAKAO_STATE);
      setError("유효하지 않은 인증 요청입니다.");
      setIsLoading(false);
      return;
    }

    sessionStorage.removeItem(STORAGE_KEYS.KAKAO_STATE);
    setAuthCode(code);
  };

  const handleAuthError = () => {
    setError("카카오 인증 중 오류가 발생했습니다.");
    setIsLoading(false);
  };

  const handleLogin = async (tokenInfo: KakaoAuthResponse) => {
    try {
      await login({
        accessToken: tokenInfo.access_token,
        provider: "kakao",
      });
    } catch (e) {
      lightyToast.error((e as Error).message);
      setError("로그인 요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-base-white text-center pt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-base-white text-center pt-5">Error: {error}</div>
    );
  }

  return (
    <div className="text-base-white text-center pt-5">
      인증에 성공했습니다. 리디렉션 중입니다...
    </div>
  );
}
