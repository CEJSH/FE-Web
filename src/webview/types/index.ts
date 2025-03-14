export const WEBVIEW_EVENT = {
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  KAKAO_LOGIN: "KAKAO_LOGIN",
  APPLE_LOGIN: "APPLE_LOGIN",
  NOTIFICATION_PERMISSION_REQUEST: "NOTIFICATION_PERMISSION_REQUEST",
  CAMERA_PERMISSION_REQUEST: "CAMERA_PERMISSION_REQUEST",
  SAVE_IMAGE: "SAVE_IMAGE",
  OPEN_SETTINGS: "OPEN_SETTINGS",

  AGREE_NOTIFICATION_PERMISSION: "AGREE_NOTIFICATION_PERMISSION",
  GOOGLE_LOGIN_SUCCESS: "GOOGLE_LOGIN_SUCCESS",
  KAKAO_LOGIN_SUCCESS: "KAKAO_LOGIN_SUCCESS",
  APPLE_LOGIN_SUCCESS: "APPLE_LOGIN_SUCCESS",
  SAVE_IMAGE_SUCCESS: "SAVE_IMAGE_SUCCESS",
  SAVE_IMAGE_PERMISSION_DENIED: "SAVE_IMAGE_PERMISSION_DENIED",
};

export type EventName = keyof typeof WEBVIEW_EVENT;
