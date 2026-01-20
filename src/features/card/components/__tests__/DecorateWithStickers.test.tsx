import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { RecoilRoot } from "recoil";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DecorateWithStickers from "@/features/card/components/DecorateWithStickers";
import {
  cardFrameAtom,
  cardSelectedFeedAtom,
} from "@/features/card/state/card";
import { WEBVIEW_EVENT } from "@/webview/types/events";

const captureMock = vi.fn();
const resetCaptureMock = vi.fn();
const addStickerMock = vi.fn();
const exportPngMock = vi.fn();
const lightyToastSuccess = vi.fn();
const lightyToastError = vi.fn();
const saveImageMobileMock = vi.fn();
const openSettingsMobileMock = vi.fn();
const cropAndResizeImageMock = vi.fn();
const mockUseFeedDetail = vi.hoisted(() => vi.fn());
const setBackgroundFromDataUrlMock = vi.fn();

vi.mock("@/features/feed/components/hooks/useFeedDetail", () => ({
  __esModule: true,
  default: mockUseFeedDetail,
}));

vi.mock("@/shared/components/Spacing", () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="spacing">{children}</div>
  ),
}));

vi.mock("@/shared/components/Flex", () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/shared/components/Button/BottomButton", () => ({
  __esModule: true,
  default: (props: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.label}
    </button>
  ),
}));

vi.mock("@/shared/components/Modal/Modal", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => <div>{content}</div>,
}));

vi.mock("@/shared/hooks/useHtml2CanvasCapture", () => ({
  useHtml2CanvasCapture: () => ({
    dataUrl: "captured-url",
    isCapturing: false,
    error: null,
    capture: captureMock,
    reset: resetCaptureMock,
  }),
}));

vi.mock("@/shared/hooks/useFabricStickerCanvas", () => ({
  useFabricStickerCanvas: () => ({
    isReady: true,
    setBackgroundFromDataUrl: setBackgroundFromDataUrlMock,
    addSticker: addStickerMock,
    exportPng: exportPngMock,
    dispose: vi.fn(),
  }),
}));

vi.mock("@/features/navigation/components/FloatingButton", () => ({
  __esModule: true,
  default: () => <div>floating</div>,
}));

vi.mock("@/shared/components/BottomDrawer/DecoStickerBottomSheet", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="sticker-sheet" /> : null,
}));

vi.mock("@/shared/components/BottomDrawer/PhotoSaveBottomSheet", () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => (
    <div data-testid="save-sheet">{src}</div>
  ),
}));

vi.mock("@/shared/components/providers/ReactNativeWebViewProvider", () => ({
  useReactNativeWebView: () => ({ isReactNativeWebView: false }),
}));

vi.mock("@/webview/actions", () => ({
  saveImageMobile: (...args: unknown[]) => saveImageMobileMock(...args),
  openSettingsMobile: (...args: unknown[]) => openSettingsMobileMock(...args),
}));

vi.mock("@/shared/utils/toast", () => ({
  lightyToast: {
    success: (...args: unknown[]) => lightyToastSuccess(...args),
    error: (...args: unknown[]) => lightyToastError(...args),
  },
}));

vi.mock("@/shared/utils/cropAndResizeImage", () => ({
  __esModule: true,
  default: (...args: unknown[]) => cropAndResizeImageMock(...args),
}));

const renderWithRecoil = (atoms?: Record<string, unknown>) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        if (atoms?.frame !== undefined)
          set(cardFrameAtom, atoms.frame as number);
        if (atoms?.feedId) set(cardSelectedFeedAtom, atoms.feedId as string);
      }}
    >
      <DecorateWithStickers />
    </RecoilRoot>,
  );
};

describe("DecorateWithStickers", () => {
  beforeEach(() => {
    captureMock.mockReset();
    resetCaptureMock.mockReset();
    addStickerMock.mockReset();
    exportPngMock.mockReset();
    lightyToastSuccess.mockReset();
    lightyToastError.mockReset();
    saveImageMobileMock.mockReset();
    openSettingsMobileMock.mockReset();
    cropAndResizeImageMock.mockReset();
    setBackgroundFromDataUrlMock.mockReset();
    setBackgroundFromDataUrlMock.mockResolvedValue(undefined);
    cropAndResizeImageMock.mockResolvedValue("cropped-url");
    mockUseFeedDetail.mockReset();
    mockUseFeedDetail.mockReturnValue({ data: null });
    exportPngMock.mockReturnValue("data:image/png;base64,abc");
    captureMock.mockResolvedValue("captured");
  });

  it("꾸미기 시작 버튼을 누른 후 이미지 생성을 하면 꾸미기 화면이 나타난다", async () => {
    renderWithRecoil({ frame: 0, feedId: "fid" });
    await userEvent.click(screen.getByRole("button", { name: "꾸미기 시작" }));

    expect(captureMock).toHaveBeenCalled();
    expect(screen.getByText("이미지 저장")).toBeInTheDocument();
  });

  it("캡쳐하기가 실패하면 토스트 메시지를 보여준다", async () => {
    captureMock.mockResolvedValueOnce(null);
    renderWithRecoil({ frame: 0, feedId: "fid" });

    await userEvent.click(screen.getByRole("button", { name: "꾸미기 시작" }));

    expect(lightyToastError).toHaveBeenCalled();
  });

  it("RN웹뷰가 아닌 경우 이미지를 하단 시트로 내보낸다", async () => {
    renderWithRecoil({ frame: 0, feedId: "fid" });
    await userEvent.click(screen.getByRole("button", { name: "꾸미기 시작" }));

    exportPngMock.mockReturnValue("data:image/png;base64,exported");
    await userEvent.click(screen.getByRole("button", { name: "이미지 저장" }));

    expect(saveImageMobileMock).not.toHaveBeenCalled();
    expect(screen.getByTestId("save-sheet")).toHaveTextContent(
      "data:image/png",
    );
  });

  it("handles webview messages", async () => {
    renderWithRecoil({ frame: 0, feedId: "fid" });

    await act(async () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({ type: WEBVIEW_EVENT.SAVE_IMAGE_SUCCESS }),
        }),
      );
    });
    expect(lightyToastSuccess).toHaveBeenCalled();

    await act(async () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({
            type: WEBVIEW_EVENT.SAVE_IMAGE_PERMISSION_DENIED,
          }),
        }),
      );
    });

    await waitFor(() =>
      expect(
        screen.getByText("라이티의 사진 권한을 허용해주세요"),
      ).toBeInTheDocument(),
    );
  });

  it("crops feed image on load", async () => {
    mockUseFeedDetail.mockReturnValue({
      data: {
        images: ["https://img"],
        content: "hello",
        createdAt: "2024-01-01",
        gathering: { name: "g1", gatheringDate: "2024-01-02" },
      },
    });
    cropAndResizeImageMock.mockResolvedValue("cropped-url");

    renderWithRecoil({ frame: 0, feedId: "fid" });

    await waitFor(() =>
      expect(cropAndResizeImageMock).toHaveBeenCalledWith(
        "https://img",
        230,
        250,
      ),
    );
    expect(await screen.findByAltText("Cropped Image")).toHaveAttribute(
      "src",
      "cropped-url",
    );
  });
});
