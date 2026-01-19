import React, { RefObject, useEffect, useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Text from "../Text";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import PhotoIcon from "../Icon/PhotoIcon";
import CameraIcon from "../Icon/CameraIcon";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import { useReactNativeWebView } from "../providers/ReactNativeWebViewProvider";
import { requestCameraPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types/events";
import Modal from "../Modal/Modal";

export default function PhotoSelectBottomSheet({
  onClose,
  fileInputRef,
  cameraInputRef,
  handleImageUpload,
}: {
  onClose: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  cameraInputRef: RefObject<HTMLInputElement>;
  handleImageUpload: (e: any) => void;
}) {
  const handleClose = () => {
    onClose();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isReactNativeWebView } = useReactNativeWebView();

  const closeModal = () => setIsModalOpen(false);

  const onClickCamera = () => {
    if (isReactNativeWebView) {
      requestCameraPermission();
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; token: string } = JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.CAMERA_OPEN) {
        cameraInputRef.current?.click();
      }
      if (message.type === WEBVIEW_EVENT.CAMERA_PERMISSION_DENIED) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <BottomSheetWrapper onClose={handleClose}>
      <Flex direction="column" className="px-6 pb-safe-bottom">
        <Text className="text-T3">이미지 추가</Text>
        <Spacing size={12} />
        <label className={styles.buttonWrapper}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          />
          <div className={styles.iconWrapper}>
            <PhotoIcon width="18" height="18" color="white" />
          </div>
          <Flex className={styles.descriptionContainer}>
            <Flex direction="column" className={styles.textWrapper}>
              <span className="text-T5">앨범에서 선택하기</span>
            </Flex>
            <ArrowRightIcon />
          </Flex>
        </label>
        {isReactNativeWebView && (
          <>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
              multiple
            />
            <Flex
              className="gap-3 py-4 w-full active:bg-grayscale-100 transition duration-75"
              onClick={onClickCamera}
            >
              <div className={styles.iconWrapper}>
                <CameraIcon />
              </div>
              <Flex className={styles.descriptionContainer}>
                <Flex direction="column" className={styles.textWrapper}>
                  <span className="text-T5">카메라로 촬영하기</span>
                </Flex>
                <ArrowRightIcon />
              </Flex>
            </Flex>
          </>
        )}
        {isModalOpen && (
          <Modal
            content="'설정 > 앱 > Lighty' 에서 카메라 권한을 허용해주세요"
            left="닫기"
            action={closeModal}
            onClose={closeModal}
          />
        )}
      </Flex>
    </BottomSheetWrapper>
  );
}

const styles = {
  buttonWrapper:
    "flex gap-3 py-4 w-full active:bg-grayscale-100 transition duration-75",
  iconWrapper:
    "bg-grayscale-900 w-10 h-10 flex justify-center items-center rounded-full cursor-default",
  descriptionContainer: "gap-3 flex-grow cursor-pointer items-center",
  textWrapper: "gap-1 flex-grow items-start",
};
