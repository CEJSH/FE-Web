"use client";
import SettingsMenu from "@/features/my/components/SettingsMenu";
import MyMainInfo from "@/features/my/components/MyMainInfo";
import UserProfile from "@/features/my/components/UserProfile";
import Spacing from "@/shared/components/Spacing";
import clsx from "clsx";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "@/shared/layout/Header/Header";
import useUserDetail from "@/features/users/components/hooks/useUserDetail";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import {
  openAskMobile,
  openPrivacyPolicyMobile,
  openSuggestMobile,
  openTermsMobile,
} from "@/webview/actions";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import { getLogout } from "@/features/auth/api/auth";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { WEBVIEW_EVENT } from "@/webview/types/events";
import { logger } from "@/shared/utils/logger";
import { deleteUser } from "@/features/users/api/users";
import { useAnyScrollThreshold } from "@/shared/hooks/useScrollThreshold";

const MyHeader = React.memo(({ shadow }: { shadow: boolean }) => {
  return (
    <div
      className={clsx(styles.headerWrapper, shadow && "shadow-bottom", "z-20")}
    >
      <Header headerLabel="My" />
    </div>
  );
});

MyHeader.displayName = "MyHeader";

export default function MyPage() {
  const [profileInfo, setProfileInfo] = useState<
    { profileImageUrl: string; accountId: string } | undefined
  >(undefined);
  const { data: user } = useUserDetail();
  const { logout } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const isPast = useAnyScrollThreshold(containerRef);
  const { isReactNativeWebView } = useReactNativeWebView();

  const openTermsPage = () => {
    if (isReactNativeWebView) {
      openTermsMobile();
    }
  };

  const openPrivacyPolicyPage = () => {
    if (isReactNativeWebView) {
      openPrivacyPolicyMobile();
    }
  };

  const openAskPage = () => {
    if (isReactNativeWebView) {
      openAskMobile();
    }
  };

  const openSuggestPage = () => {
    if (isReactNativeWebView) {
      openSuggestMobile();
    }
  };

  const handleLogout = useCallback(async () => {
    const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    try {
      if (deviceId) {
        await getLogout(deviceId);
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    } finally {
      logout();
    }
  }, [logout]);

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
      let message: {
        type?: string;
        token?: string;
        authorizationCode?: string;
      };
      try {
        message = JSON.parse(data);
      } catch (error) {
        console.error("잘못된 메시지 포맷", error);
        return;
      }
      if (!message?.type) return;

      if (message.type === WEBVIEW_EVENT.APPLE_LOGIN_SUCCESS) {
        if (
          "authorizationCode" in message &&
          typeof message.authorizationCode === "string"
        ) {
          try {
            const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
            if (deviceId) {
              const deleted = await deleteUser({
                authorizationCode: message.authorizationCode,
              });
              if (deleted) {
                logout();
              }
            }
          } catch (error: unknown) {
            logger.error("Account deletion failed", error);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isReactNativeWebView, logout]);

  useEffect(() => {
    const initializeProfileInfo = () => {
      if (user && user.profileImageUrl) {
        return {
          profileImageUrl: user.profileImageUrl,
          accountId: user.accountId,
        };
      } else return undefined;
    };
    setProfileInfo((prev) => prev || initializeProfileInfo());
  }, [user]);

  if (!user) return null;

  return (
    <div
      className="h-dvh overflow-y-scroll no-scrollbar w-full pt-safe-top"
      ref={containerRef}
    >
      <MyHeader shadow={isPast} />
      <div>
        <main className="pt-[68px]">
          <Suspense fallback={<DotSpinner />}>
            <UserProfile
              userProfileImage={profileInfo?.profileImageUrl}
              userAccountId={profileInfo?.accountId}
              userName={user.name}
            />
            <Spacing size={12} />
            <MyMainInfo
              groupCount={user.groupCount}
              feedCount={user.feedCount}
              friendsCount={user.friendCount}
            />
          </Suspense>
          <Spacing size={16} />
          <SettingsMenu
            logout={handleLogout}
            user={user}
            openAskPageFn={openAskPage}
            openSuggestPageFn={openSuggestPage}
          />
          <footer className={styles.termsWrapper}>
            <button
              type="button"
              onClick={openTermsPage}
              className={clsx(
                "mr-[13px] bg-transparent border-0 p-0",
                styles.letter
              )}
            >
              <ins>이용약관</ins>
            </button>
            <button
              type="button"
              onClick={openPrivacyPolicyPage}
              className={clsx("bg-transparent border-0 p-0", styles.letter)}
            >
              <ins>개인 정보 처리방침</ins>
            </button>
          </footer>
          <Spacing size={120} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  headerWrapper:
    "z-20 h-12 fixed max-w-[430px] mx-auto w-full transition-shadow duration-300",
  letter: "cursor-pointer",
  termsWrapper: "w-full py-2 px-5 text-C5 text-grayscale-300",
};
