import { postMessage } from "@/webview/postMessage";

export const googleLoginMobile = () => postMessage("GOOGLE_LOGIN");

export const kakaoLoginMobile = () => postMessage("KAKAO_LOGIN");

export const appleLoginMobile = () => postMessage("APPLE_LOGIN");

export const saveImageMobile = (uri: string) => postMessage("SAVE_IMAGE", uri);

export const openSettingsMobile = () => postMessage("OPEN_SETTINGS");

export const requestNotificationPermission = () =>
  postMessage("NOTIFICATION_PERMISSION_REQUEST");

export const requestCameraPermission = () =>
  postMessage("CAMERA_PERMISSION_REQUEST");

export const requestOpenCamera = () => postMessage("OPEN_CAMERA");
