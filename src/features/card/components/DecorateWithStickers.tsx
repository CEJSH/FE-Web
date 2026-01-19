"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Spacing from "@/shared/components/Spacing";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardFrameAtom,
  cardImageUrlAtom,
  cardSelectedFeedAtom,
  decoBottomSheetStateAtom,
} from "@/features/card/state/card";
import Flex from "@/shared/components/Flex";
import DecoStickerBottomSheet from "@/shared/components/BottomDrawer/DecoStickerBottomSheet";
import cropAndResizeImage from "@/shared/utils/cropAndResizeImage";
import { format } from "date-fns";
import FloatingButton from "@/shared/components/Button/FloatingButton";
import BottomButton from "@/shared/components/Button/BottomButton";
import PhotoSaveBottomSheet from "@/shared/components/BottomDrawer/PhotoSaveBottomSheet";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import { openSettingsMobile, saveImageMobile } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types/events";
import { lightyToast } from "@/shared/utils/toast";
import Modal from "@/shared/components/Modal/Modal";
import { logger } from "@/shared/utils/logger";
import { useHtml2CanvasCapture } from "@/shared/hooks/useHtml2CanvasCapture";
import { useFabricStickerCanvas } from "@/shared/hooks/useFabricStickerCanvas";
import useFeedDetail from "@/features/feed/components/hooks/useFeedDetail";

const CARD_WIDTH = 282;
const CARD_HEIGHT = 372;
const CROP_WIDTH = 230;
const CROP_HEIGHT = 250;

export default function DecorateWithStickers() {
  const [decoBottomSheetState, setDecoBottomSheetState] = useRecoilState(
    decoBottomSheetStateAtom
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageBottomSheetOpen, setImageBottomSheetOpen] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const selectedFrame = useRecoilValue(cardFrameAtom);
  const cardImgUrl = useRecoilValue(cardImageUrlAtom);
  const frameUrl = frames[selectedFrame] || "";
  const [deco, setDeco] = useState<boolean>(false);
  const selectedFeedId = useRecoilValue(cardSelectedFeedAtom);
  const { data: selectedFeed } = useFeedDetail({ id: selectedFeedId });
  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isReactNativeWebView } = useReactNativeWebView();

  const selectedFeedInfo = useMemo(() => {
    if (!selectedFeed) return null;
    return {
      imageUrl: selectedFeed.images?.[0] ?? "",
      name: selectedFeed.gathering?.name ?? "",
      content: selectedFeed.content ?? "",
      date:
        selectedFeed.gathering?.gatheringDate ?? selectedFeed.createdAt ?? "",
    };
  }, [selectedFeed]);

  const getCaptureTarget = useCallback(() => previewRef.current, []);

  const {
    dataUrl: capturedCardUrl,
    isCapturing,
    error: captureError,
    capture: captureCard,
    reset: resetCapture,
  } = useHtml2CanvasCapture(getCaptureTarget, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
  });

  const {
    isReady: isFabricReady,
    setBackgroundFromDataUrl,
    addSticker,
    exportPng,
    dispose,
  } = useFabricStickerCanvas({
    canvasRef,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  });

  useEffect(() => {
    if (!deco) {
      dispose();
      resetCapture();
    }
  }, [deco, dispose, resetCapture]);

  useEffect(() => {
    if (!deco || !capturedCardUrl) return;
    setBackgroundFromDataUrl(capturedCardUrl).catch((e) => {
      logger.error("setBackgroundFromDataUrl failed", e);
      lightyToast.error("이미지 불러오기에 실패했어요");
    });
  }, [capturedCardUrl, deco, setBackgroundFromDataUrl]);

  const handleStartDecorate = useCallback(async () => {
    const url = await captureCard();
    if (!url) {
      lightyToast.error("이미지 캡처에 실패했어요");
      return;
    }
    setDeco(true);
  }, [captureCard]);

  const handleAddSticker = useCallback(
    async (path: string) => {
      try {
        await addSticker(path);
      } catch (e) {
        logger.error("addSticker failed", e);
        lightyToast.error("스티커 추가에 실패했어요");
      }
    },
    [addSticker]
  );

  const handleExport = () => {
    const uri = exportPng(2);
    if (!uri) {
      lightyToast.error("이미지 생성에 실패했어요");
      return;
    }

    if (isReactNativeWebView) {
      saveImageMobile(uri);
      return;
    }
    setImageUri(uri);
    setImageBottomSheetOpen(true);
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; token: string } = JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.SAVE_IMAGE_SUCCESS) {
        lightyToast.success("포토 카드 저장 완료");
      }
      if (message.type === WEBVIEW_EVENT.SAVE_IMAGE_PERMISSION_DENIED) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const applyCrop = async () => {
      try {
        if (!selectedFeedInfo?.imageUrl) {
          setCroppedImage(null);
          return;
        }
        const croppedImageUrl = await cropAndResizeImage(
          selectedFeedInfo.imageUrl,
          CROP_WIDTH,
          CROP_HEIGHT
        );
        setCroppedImage(croppedImageUrl);
      } catch (err) {
        logger.error("cropAndResizeImage failed", err);
      }
    };

    applyCrop();
  }, [selectedFeedInfo?.imageUrl]);

  return (
    <div className="h-dvh overflow-y-scroll no-scrollbar">
      {!deco && (
        <Flex
          className="min-h-dvh pt-safe-top pb-12"
          direction="column"
          justify="space-between"
        >
          <div className="pt-[76px]">
            <Flex direction="column" className="gap-3 px-6">
              <span className="text-T2">해당 프레임을 선택할까요?</span>
              <span className="text-B3 text-grayscale-500">
                꾸미기 시작하면 프레임을 바꿀 수 없어요.
              </span>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align="center"
              className={styles.cardContainer}
            >
              <div
                ref={previewRef}
                id="card"
                className="relative rounded-[20px] w-full"
              >
                <img
                  alt="frame"
                  height={CARD_HEIGHT}
                  width={CARD_WIDTH}
                  className={styles.frame}
                  crossOrigin="anonymous"
                  src={frames[selectedFrame] || "/placeholder.svg"}
                />
                <div className={styles.cardWrapper}>
                  <div className={styles.imageWrapper}>
                    {croppedImage ? (
                      <img
                        src={croppedImage || "/placeholder.svg"}
                        alt="Cropped Image"
                        width={CROP_WIDTH}
                        height={218}
                      />
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#AEAEAE",
                          height: 218,
                          width: CROP_WIDTH,
                        }}
                      />
                    )}
                  </div>
                  <Flex direction="column" className="px-5 py-1 pb-5 h-[100px]">
                    <span className={styles.textWrapper}>
                      {selectedFeedInfo?.name ?? ""}
                    </span>
                    <Spacing size={8} />
                    {selectedFeedInfo?.content && (
                      <span className="text-C5">
                        {selectedFeedInfo.content.length >= 40
                          ? selectedFeedInfo.content.slice(0, 40)
                          : selectedFeedInfo.content}
                      </span>
                    )}
                    <Spacing size={12} />
                    <span className={styles.dateWrapper}>
                      {selectedFeedInfo?.date
                        ? format(
                            selectedFeedInfo.date.slice(0, 10),
                            "yyyy.MM.dd"
                          )
                        : ""}
                    </span>
                  </Flex>
                </div>
              </div>
            </Flex>
          </div>
          <div className="mb-safe-bottom">
            <BottomButton
              disabled={selectedFrame == null || isCapturing}
              onClick={handleStartDecorate}
              label={isCapturing ? "이미지 생성중..." : "꾸미기 시작"}
            />
            {captureError && (
              <div className="px-6 pt-3 text-C5 text-red-500">
                이미지 생성에 실패했어요. 다시 시도해주세요.
              </div>
            )}
          </div>
        </Flex>
      )}
      {/* 이 부분이 deco가 false일 때도 렌더링 돼서 아랫 부분에 스크롤 생기고 있었어요. */}
      <Flex
        direction="column"
        justify="space-between"
        className="min-h-dvh pt-safe-top pb-12 w-full"
        style={{ display: deco ? "flex" : "none" }}
      >
        <Flex
          className="w-full px-6 pt-[76px]"
          direction="column"
          align="center"
        >
          <span className="text-B4 text-grayscale-500 w-full">
            점선 영역이 이미지 영역이에요!
          </span>
          <Spacing size={32} />
          <div
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            className="relative"
          >
            {capturedCardUrl && (
              <img
                src={capturedCardUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-[20px] pointer-events-none"
              />
            )}
            <canvas
              ref={canvasRef}
              id="canvas"
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                backgroundImage: capturedCardUrl
                  ? "none"
                  : `url(${cardImgUrl || frameUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
          </div>
	        </Flex>
	        <div className="relative mx-auto max-w-[430px] w-full mb-safe-bottom">
	          <FloatingButton tooltip />
	          <BottomButton
            label={"이미지 저장"}
            onClick={handleExport}
            disabled={!isFabricReady}
          />
        </div>
      </Flex>
      {decoBottomSheetState ? (
        <DecoStickerBottomSheet
          handleSticker={handleAddSticker}
          open={decoBottomSheetState}
          onClose={() => setDecoBottomSheetState(false)}
        />
      ) : null}
      {imageBottomSheetOpen && imageUri !== "" && (
        <PhotoSaveBottomSheet
          onClose={() => setImageBottomSheetOpen(false)}
          src={imageUri}
        />
      )}

      {isModalOpen && (
        <Modal
          action={() => openSettingsMobile()}
          onClose={() => setIsModalOpen(false)}
          content="라이티의 사진 권한을 허용해주세요"
          left="닫기"
          right="설정"
        />
      )}
    </div>
  );
}

const styles = {
  frame: "rounded-[20px] w-[282px] h-[372px]",
  button:
    "absolute z-10 py-[10px] px-3 text-C2 bg-grayscale-900 rounded-[10px] cursor-pointer text-base-white",
  saveButton:
    "w-[120px] px-3 py-[6px] rounded-xl border border-[#D8D8D8] text-[#D8D8D8] bg-base-white text-B4 cursor-pointer",
  cardContainer:
    "relative rounded-[20px] w-[282px] h-[453px] self-center mx-auto",
  cardWrapper:
    "absolute top-[27px] left-[26.5px] flex flex-col bg-base-white rounded-xl w-[230px] h-[318px]",
  imageWrapper:
    "w-[230px] h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
  image: "w-[230px] h-[220px]",
  textWrapper: "text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
const frames = [
  "https://cdn.lighty.today/frame1.jpeg",
  "https://cdn.lighty.today/frame2.jpeg",
  "https://cdn.lighty.today/frame3.jpeg",
  "https://cdn.lighty.today/frame4.jpeg",
  "https://cdn.lighty.today/frame5.jpeg",
  "https://cdn.lighty.today/frame6.jpeg",
  "https://cdn.lighty.today/frame7.jpeg",
  "https://cdn.lighty.today/frame8.png",
  "https://cdn.lighty.today/frame9.png",
  "https://cdn.lighty.today/frame10.png",
];
