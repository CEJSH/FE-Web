import { postMessage } from "@/webview/postMessage";

export const googleLoginMobile = () => postMessage("GOOGLE_LOGIN");

export const kakaoLoginMobile = () => postMessage("KAKAO_LOGIN");

export const appleLoginMobile = () => postMessage("APPLE_LOGIN");

export const saveImageMobile = (uri: string) => postMessage("SAVE_IMAGE", uri);

export const openSettingsMobile = () => postMessage("OPEN_SETTINGS");

export const openPrivacyPolicyMobile = () => postMessage("OPEN_PRIVACY_POLICY");

export const openTermsMobile = () => postMessage("OPEN_TERMS");

export const openAskMobile = () => postMessage("OPEN_ASK");

export const openSuggestMobile = () => postMessage("OPEN_SUGGEST");

export const requestNotificationPermission = () =>
  postMessage("NOTIFICATION_PERMISSION_REQUEST");

export const requestCameraPermission = () =>
  postMessage("CAMERA_PERMISSION_REQUEST");

export const requestAlbumPermission = () =>
  postMessage("REQUEST_ALBUM_PERMISSION");
