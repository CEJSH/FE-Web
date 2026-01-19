import type * as lighty from "lighty-type";
import {
  patchProfileImageWithToken,
  postProfileImageWithToken,
} from "@/features/my/api/profile";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { API_CONFIG } from "@/shared/api/shared";
import { RegisterRequestType } from "@/shared/components/AddPhoto";
import { Providers } from "@/shared/constants/oAuthButtons";
import { KakaoAuthResponse } from "@/models/user";
import { v4 as uuidv4 } from "uuid";
import { apiClient } from "@/shared/api/api";

export const storeAuthData = (accessToken: string, userInfo: object) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
};

export async function postLogin({
  accessToken,
  provider,
  deviceId,
}: lighty.LoginRequest & { provider: Providers; deviceId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/auth/${provider}/login`;

  const response = await fetch(targetUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Device-Id": deviceId,
    },
    body: JSON.stringify({ accessToken }),
  });

  let data: lighty.LoginResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error("서버 응답을 파싱하는 데 실패했습니다.");
  }

  return { data, response };
}

export async function registerUser(RegisterRequest: RegisterRequestType) {
  if (!RegisterRequest.accountId || !RegisterRequest.name) {
    throw new Error("이름과 아이디가 유효하지 않습니다");
  }

  try {
    const baseUrl = API_CONFIG.getBaseUrl();

    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);

    if (deviceId == null) {
      deviceId = uuidv4();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Device-Id": deviceId },
      body: JSON.stringify({
        ...RegisterRequest,
        profileImageUrl: null,
      }),
    });

    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다");
    }

    const data: lighty.RegisterResponse = await response.json();

    let profileImageUrl: string | null = null;
    if (RegisterRequest.profileImageUrl) {
      const uploadResult = await postProfileImageWithToken({
        token: data.accessToken,
        file: RegisterRequest.profileImageUrl as File,
      });
      profileImageUrl = uploadResult?.imageUrl;
      if (profileImageUrl)
        await patchProfileImageWithToken({
          profileImageUrl,
          token: data.accessToken,
        });
    }
    storeAuthData(data.accessToken, {
      accountId: data.accountId,
      ...(profileImageUrl && { profileImageUrl }),
    });

    return { message: "회원가입을 축하합니다" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getKakaoToken({
  client_id,
  redirect_uri,
  auth_code,
}: {
  client_id: string;
  redirect_uri: string;
  auth_code: string;
}): Promise<KakaoAuthResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id,
    redirect_uri,
    code: auth_code,
  });

  const targetUrl = "https://kauth.kakao.com/oauth/token";

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage =
        errorBody?.error_description ||
        `카카오 인증 실패 (HTTP ${response.status})`;
      throw new Error(errorMessage);
    }

    const res: KakaoAuthResponse = await response.json();
    return res;
  } catch (err) {
    throw new Error(`카카오 토큰 요청 중 오류 발생: ${(err as Error).message}`);
  }
}

/** 회원 정보 조회 */
export async function getUserAuth() {
  const { data } = await apiClient.get<lighty.UserProfileResponse>(
    "/users/profile"
  );
  return data;
}

export async function getLogout(deviceId: string) {
  const response = await apiClient.delete("/auth/logout", {
    headers: {
      "Device-Id": deviceId,
    },
    withCredentials: true,
  });

  if (response.status === 204) {
    return "로그아웃";
  }
}
