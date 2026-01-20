import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { API_CONFIG } from "@/shared/api/shared";
import { clearAuthStorage } from "./authStorage";
import { logger } from "@/shared/utils/logger";
import { lightyToast } from "@/shared/utils/toast";

export async function refreshAccessToken(
  setToken?: (token: string | null) => void
) {
  const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  const baseUrl = API_CONFIG.getBaseUrl();

  if (deviceId === null) {
    clearAuthStorage();
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
      if (response.status === 401 || response.status === 403) {
        if (window.location.pathname !== "/") {
          lightyToast.error("세션이 만료되었어요. 다시 로그인해주세요.");
          clearAuthStorage();
          logger.warn(
            `토큰 갱신에 실패했습니다. at refreshing token ${response.status}`
          );
        }
        return null;
      }

      logger.warn(`토큰 갱신에 실패했습니다. ${response.status}`);
      return null;
    }

    let data: { accessToken: string } | null = null;
    try {
      data = await response.json();
    } catch (error) {
      logger.warn("토큰 갱신 응답 파싱 실패", error);
      return null;
    }
    const accessToken = data?.accessToken;
    if (!accessToken) return null;

    if (setToken) setToken(accessToken);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);

    return accessToken;
  } catch (error) {
    logger.error("토큰 갱신 실패:", error);
    return null;
  }
}
