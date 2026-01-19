"use client";
import ToggleButton from "@/shared/components/Button/ToggleButton";
import Flex from "@/shared/components/Flex";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import Modal from "@/shared/components/Modal/Modal";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import Spacing from "@/shared/components/Spacing";
import { patchNotificationToken } from "@/features/users/api/users";
import { requestNotificationPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types/events";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NoticeSettingPage() {
  const [isOn, setIsOn] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isReactNativeWebView } = useReactNativeWebView();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    requestNotificationPermission();

    const handleAppFocus = () => {
      if (isReactNativeWebView) {
        requestNotificationPermission();
      }
    };

    window.addEventListener("focus", handleAppFocus);
    return () => window.removeEventListener("focus", handleAppFocus);
  }, [isReactNativeWebView]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; notificationToken: string | null } =
        JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.AGREE_NOTIFICATION_PERMISSION) {
        setIsOn(!!message.notificationToken);
        if (message.notificationToken) {
          patchNotificationToken({ token: message.notificationToken });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-dvh pt-safe-top">
      <HeaderWithBtn
        headerLabel="알림 설정"
        onClickBackBtn={() => router.back()}
      />
      <Spacing size={48} />
      <Flex direction="column" className="pt-3">
        <SettingItem isOn={isOn} setIsOn={openModal} />
      </Flex>

      {isModalOpen && (
        <Modal
          content="'설정 > 앱 > Lighty' 에서 알림 권한을 변경해주세요"
          left="닫기"
          action={closeModal}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

function SettingItem({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Flex className="p-5" justify="space-between" align="center">
      <Flex direction="column" className="gap-1">
        <span className="text-T4">서비스 소식 알림</span>
        <span className="text-B4 text-[#A0A1A3]">
          초대장, 친구 신청, 그룹 초대 알림
        </span>
      </Flex>
      <ToggleButton
        isOn={isOn}
        setIsOn={setIsOn}
        ariaLabel="서비스 소식 알림"
      />
    </Flex>
  );
}
