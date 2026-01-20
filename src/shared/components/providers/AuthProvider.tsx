"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { UserInfo } from "@/models/user";
import type * as lighty from "lighty-type";
import { getUserAuth } from "@/features/auth/api/auth";
import useUserProfile from "@/features/users/components/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import {
  clearAuthStorage,
  getStoredAuth,
  saveAuthToStorage,
} from "@/shared/utils/authStorage";
import {
  createSyncFromStorageHandler,
  initializeAuthState,
  readStoredUserInfo,
} from "./authHelpers";

export type UserInfoMini = Pick<UserInfo, "accountId" | "profileImageUrl">;

interface AuthContextType {
  userInfo: UserInfoMini | null;
  login: (userInfo: lighty.LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  updateUserInfo: () => Promise<void>;
  userDeleted: boolean;
  setUserDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoMini | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const { data: userProfile } = useUserProfile({ enabled: !!token });
  const queryClient = useQueryClient();
  const prevTokenRef = useRef<string | null>(null);

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setUserInfo(null);
  }, []);

  const readStoredUserInfoCb = useCallback((): UserInfoMini | null => {
    return readStoredUserInfo();
  }, []);

  const updateUserInfo = useCallback(async () => {
    if (!token) {
      logout();
      return;
    }
    setIsLoading(true);
    try {
      const user = await getUserAuth();
      if (!user) {
        logout();
        return;
      }
      const newUserInfo = {
        accountId: user.accountId,
        profileImageUrl: user.profileImageUrl,
      };
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newUserInfo));
      setUserInfo(newUserInfo);
    } catch (err) {
      console.error("updateUserInfo 실패:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout, token]);

  const login = useCallback((loginInfo: lighty.LoginResponse) => {
    const { accessToken, accountId, profileImageUrl } = loginInfo;
    const userInfoData = { accountId, profileImageUrl };
    saveAuthToStorage(accessToken, userInfoData);
    setToken(accessToken);
    setUserInfo(userInfoData);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = readStoredUserInfoCb();
      try {
        await initializeAuthState({
          storedToken,
          storedUserInfo: storedUser,
          getStoredAuth,
          setToken,
          setUserInfo,
          setIsInitialized,
          signalCancelled: () => cancelled,
        });
      } catch (err) {
        console.error("Auth 초기화 실패:", err);
        if (!cancelled) setIsInitialized(true);
      }
    };

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [readStoredUserInfoCb]);

  useEffect(() => {
    if (prevTokenRef.current && !token) {
      queryClient.removeQueries({ queryKey: queryKeys.root() });
    }
    prevTokenRef.current = token;
  }, [queryClient, token]);

  useEffect(() => {
    const syncFromStorage = createSyncFromStorageHandler(
      setToken,
      setUserInfo,
      readStoredUserInfoCb
    );

    window.addEventListener("lighty:auth-changed", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener("lighty:auth-changed", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, [readStoredUserInfoCb]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!token) return;
    if (userInfo?.accountId) return;

    void updateUserInfo();
  }, [isInitialized, token, updateUserInfo, userInfo?.accountId]);

  useEffect(() => {
    if (
      userProfile &&
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
        user_id: userProfile.id,
      });
    }
  }, [userProfile]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
        isInitialized,
        updateUserInfo,
        userDeleted,
        setUserDeleted,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
