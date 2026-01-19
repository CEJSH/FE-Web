import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { API_CONFIG } from "@/shared/api/shared";
import { clearAuthStorage } from "./authStorage";
import { logger } from "@/shared/utils/logger";

export async function refreshAccessToken(
  setToken?: (token: string | null) => void
) {
  const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  const baseUrl = API_CONFIG.getBaseUrl();

  if (deviceId === null) {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    return null;
  }

  try {
    const targetUrl = `${baseUrl}/auth/token`;
    const response = await fetch(targetUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Device-Id": deviceId,
      },
    });
    if (!response.ok) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 500
      ) {
        if (window.location.pathname !== "/") {
          clearAuthStorage();
          window.location.href = "/";
          logger.warn(
            `토큰 갱신에 실패했습니다. at refreshing token ${response.status} ${window.location.href}`
          );
        }
      } else {
        logger.warn(`토큰 갱신에 실패했습니다. ${response.status}`);
      }
      return null;
    }

    const data: { accessToken: string } = await response.json();
    const { accessToken } = data;

    if (accessToken) {
      if (setToken) setToken(data.accessToken);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);

      return accessToken;
    }
    return null;
  } catch (error) {
    logger.error("토큰 갱신 실패:", error);
    return null;
  }
}
