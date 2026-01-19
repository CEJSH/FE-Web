"use client";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import Button from "@/shared/components/Button/Button";
import clsx from "clsx";
import oAuthButtons, { Providers } from "@/shared/constants/oAuthButtons";
import { postLogin } from "@/features/auth/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import { lightyToast } from "@/shared/utils/toast";
import { useCallback, useEffect } from "react";
import { WEBVIEW_EVENT } from "@/webview/types/events";
import {
  appleLoginMobile,
  googleLoginMobile,
  kakaoLoginMobile,
} from "@/webview/actions";
import { v4 as uuidv4 } from "uuid";
import Tooltip from "@/shared/components/Tooltip/Tooltip";
import STORAGE_KEYS from "@/shared/constants/storageKeys";

const buildKakaoAuthUrl = (state: string) =>
  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&prompt=select_account&state=${state}`;

export default function LogIn() {
  const { login } = useAuth();
  const { isReactNativeWebView } = useReactNativeWebView();

  useEffect(() => {
    const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
      const uuid = uuidv4();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, uuid);
    }
  }, []);

  const handleLoginSuccess = useCallback(
    async (accessToken: string, provider: Providers) => {
      try {
        const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID) ?? "";

        const { data } = await postLogin({
          accessToken,
          provider,
          deviceId,
        });
        if (data) login(data);
      } catch (error) {
        console.error(error);
        lightyToast.error("로그인에 실패했어요");
      }
    },
    [login]
  );

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) =>
      handleLoginSuccess(credentialResponse.access_token, "google"),
    onError: () => lightyToast.error("로그인에 실패했어요"),
  });

  const loginHandler = (provider: Providers) => {
    if (provider === "google") {
      if (isReactNativeWebView && window.ReactNativeWebView) {
        googleLoginMobile();
      } else {
        googleLogin();
      }
    }
    if (provider === "kakao") {
      const state = uuidv4();
      sessionStorage.setItem(STORAGE_KEYS.KAKAO_STATE, state);
      if (isReactNativeWebView && window.ReactNativeWebView) {
        kakaoLoginMobile();
      } else {
        window.location.href = buildKakaoAuthUrl(state);
      }
    }
    if (provider === "apple" && isReactNativeWebView) {
      appleLoginMobile();
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      const trustedOrigin = window.location.origin;
      const isNativeMessage =
        event.origin === "null" || event.origin === "file://";
      if (
        event.origin &&
        event.origin !== trustedOrigin &&
        !(isReactNativeWebView && isNativeMessage)
      ) {
        return;
      }

      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      let message: { type?: string; token?: string };
      try {
        message = JSON.parse(data);
      } catch (error) {
        console.error("잘못된 로그인 메시지 포맷", error);
        return;
      }
      if (!message?.type || typeof message.token !== "string") return;

      if (message.type === WEBVIEW_EVENT.GOOGLE_LOGIN_SUCCESS) {
        handleLoginSuccess(message.token, "google");
      }
      if (message.type === WEBVIEW_EVENT.KAKAO_LOGIN_SUCCESS) {
        handleLoginSuccess(message.token, "kakao");
      }
      if (message.type === WEBVIEW_EVENT.APPLE_LOGIN_SUCCESS) {
        handleLoginSuccess(message.token, "apple");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleLoginSuccess, isReactNativeWebView]);

  return (
    <>
      <Tooltip
        direction="bottom"
        title="SNS로 간편하게 시작하기"
        color="#686868"
        closeButton={false}
        className="py-2 !px-3 rounded-lg"
      />
      {oAuthButtons.map(({ color, provider, label, icon }, idx) => (
        <Button
          key={idx}
          className={clsx(styles.oAuthButton)}
          onClick={() => loginHandler(provider)}
          color={color}
        >
          <object width={24} height={24} className="rounded-full" data={icon} />
          <span className="w-[120px] text-center">{label}</span>
        </Button>
      ))}
    </>
  );
}
const styles = {
  oAuthButton:
    "w-full h-[50px] flex items-center justify-center gap-3 px-6 py-4 rounded-full hover:animate-shrink-grow-less",
};
