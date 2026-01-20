import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { getStoredAuth as getStoredAuthFn } from "@/shared/utils/authStorage";
import { UserInfoMini } from "./AuthProvider";

export const parseStoredUserInfo = (raw: string | null): UserInfoMini | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<UserInfoMini> | null;
    if (!parsed?.accountId) return null;
    return {
      accountId: parsed.accountId,
      profileImageUrl: parsed.profileImageUrl ?? null,
    };
  } catch {
    return null;
  }
};

export const readStoredUserInfo = (): UserInfoMini | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  return parseStoredUserInfo(raw);
};

export type InitializeAuthStateParams = {
  storedToken?: string | null;
  storedUserInfo?: UserInfoMini | null;
  getStoredAuth?: typeof getStoredAuthFn;
  setToken: (token: string | null) => void;
  setUserInfo: (info: UserInfoMini | null) => void;
  setIsInitialized: (flag: boolean) => void;
  signalCancelled?: () => boolean;
};

export const initializeAuthState = async ({
  storedToken,
  storedUserInfo,
  getStoredAuth = getStoredAuthFn,
  setToken,
  setUserInfo,
  setIsInitialized,
  signalCancelled,
}: InitializeAuthStateParams) => {
  if (storedToken) {
    setToken(storedToken);
    setUserInfo(storedUserInfo ?? null);
    setIsInitialized(true);
    return;
  }

  try {
    const storedAuth = await getStoredAuth();
    if (signalCancelled?.()) return;
    if (!storedAuth?.token) return;
    setToken(storedAuth.token);
    if (storedAuth.userInfo) {
      setUserInfo(storedAuth.userInfo);
    }
  } finally {
    if (!signalCancelled?.()) {
      setIsInitialized(true);
    }
  }
};

export const createSyncFromStorageHandler = (
  setToken: (token: string | null) => void,
  setUserInfo: (info: UserInfoMini | null) => void,
  reader: () => UserInfoMini | null
) => {
  return () => {
    setToken(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
    setUserInfo(reader());
  };
};
