import { useAuth } from "@/components/shared/providers/AuthProvider";
import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "@/remote/shared";

const { setToken } = useAuth();

export async function refreshAccessToken() {
  const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  const baseUrl = API_CONFIG.getBaseUrl();
  if (deviceId === null) {
    throw new Error("디바이스 아이디가 없습니다.");
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

    const data: { accessToken: string } = await response.json();
    const { accessToken } = data;

    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
      localStorage.setItem(
        STORAGE_KEYS.EXPIRY_TIME,
        String(Date.now() + 900 * 1000)
      );
      setToken(accessToken);

      return accessToken;
    } else {
      throw new Error(`token is ${accessToken}}`);
    }
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw new Error(
      error instanceof Error ? error.message : `${String(error)}42줄`
    );
  }
}
