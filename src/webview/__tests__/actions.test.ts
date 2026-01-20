import { describe, expect, it, vi } from "vitest";

import * as actions from "@/webview/actions";

const postMessageMock = vi.fn();

vi.mock("@/webview/postMessage", () => ({
  __esModule: true,
  postMessage: (...args: unknown[]) => postMessageMock(...args),
}));

describe("webview actions", () => {
  it("로그인 명령을 WebView로 전송한다", () => {
    actions.googleLoginMobile();
    actions.kakaoLoginMobile();
    actions.appleLoginMobile();

    expect(postMessageMock).toHaveBeenNthCalledWith(1, "GOOGLE_LOGIN");
    expect(postMessageMock).toHaveBeenNthCalledWith(2, "KAKAO_LOGIN");
    expect(postMessageMock).toHaveBeenNthCalledWith(3, "APPLE_LOGIN");
  });

  it("이미지 저장 명령 WebView로 전송한다", () => {
    actions.saveImageMobile("uri://image");
    expect(postMessageMock).toHaveBeenCalledWith("SAVE_IMAGE", "uri://image");
  });

  it("네비게이션 및 권한 요청 메시지를 WebView로 전송한다", () => {
    actions.openSettingsMobile();
    actions.openPrivacyPolicyMobile();
    actions.openTermsMobile();
    actions.openAskMobile();
    actions.openSuggestMobile();
    actions.requestNotificationPermission();
    actions.requestCameraPermission();
    actions.requestAlbumPermission();

    expect(postMessageMock).toHaveBeenCalledWith("OPEN_SETTINGS");
    expect(postMessageMock).toHaveBeenCalledWith("OPEN_PRIVACY_POLICY");
    expect(postMessageMock).toHaveBeenCalledWith("OPEN_TERMS");
    expect(postMessageMock).toHaveBeenCalledWith("OPEN_ASK");
    expect(postMessageMock).toHaveBeenCalledWith("OPEN_SUGGEST");
    expect(postMessageMock).toHaveBeenCalledWith(
      "NOTIFICATION_PERMISSION_REQUEST",
    );
    expect(postMessageMock).toHaveBeenCalledWith("CAMERA_PERMISSION_REQUEST");
    expect(postMessageMock).toHaveBeenCalledWith("REQUEST_ALBUM_PERMISSION");
  });
});
