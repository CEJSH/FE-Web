import STORAGE_KEYS from "@/shared/constants/storageKeys";

const parseStoredUserInfo = (raw: string | null) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getStoredAuth = async () => {
  if (typeof window === "undefined") return null;

  await new Promise((resolve) => setTimeout(resolve, 300));

  for (let i = 0; i < 3; i++) {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      const userInfo = parseStoredUserInfo(
        localStorage.getItem(STORAGE_KEYS.USER_INFO)
      );
      return {
        token,
        userInfo,
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return null;
};

export const saveAuthToStorage = (
  token: string,
  userInfo: { accountId: string; profileImageUrl: string | null }
) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("lighty:auth-changed"));
  }
};

export const updateAuthToken = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("lighty:auth-changed"));
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  document.cookie =
    "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("lighty:auth-changed"));
  }
};
