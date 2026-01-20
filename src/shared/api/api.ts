import axios, { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "./shared";
import { refreshAccessToken } from "@/shared/utils/tokenManager";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import {
  saveAuthToStorage,
  clearAuthStorage,
  updateAuthToken,
} from "@/shared/utils/authStorage";
import { logger } from "@/shared/utils/logger";

let refreshingPromise: Promise<string | null> | null = null;

type RetriableRequestConfig = NonNullable<AxiosError["config"]> & {
  _retry?: boolean;
};

const parseStoredUserInfo = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as {
      accountId?: string;
      profileImageUrl?: string | null;
    };
    if (!parsed?.accountId) return null;
    return {
      accountId: parsed.accountId,
      profileImageUrl: parsed.profileImageUrl ?? null,
    };
  } catch {
    return null;
  }
};

type CreateApiClientOptions = {
  refreshFn?: typeof refreshAccessToken;
  baseUrl?: string;
};

export const createApiClient = (
  options: CreateApiClientOptions = {}
): AxiosInstance => {
  const refreshFn = options.refreshFn ?? refreshAccessToken;
  const apiClient = axios.create({
    baseURL: options.baseUrl ?? API_CONFIG.getBaseUrl(),
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined;
      if (!originalRequest) return Promise.reject(error);

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (!refreshingPromise) {
            refreshingPromise = (async () => {
              try {
                const newToken = await refreshFn();
                if (newToken) {
                  const storedUserInfo = parseStoredUserInfo();
                  if (storedUserInfo) {
                    saveAuthToStorage(newToken, storedUserInfo);
                  } else {
                    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
                    updateAuthToken(newToken);
                  }
                  return newToken;
                } else {
                  return null;
                }
              } catch (refreshError) {
                logger.error("Token refresh failed:", refreshError);
                clearAuthStorage();
                return null;
              } finally {
                refreshingPromise = null;
              }
            })();
          }

          const token = await refreshingPromise;
          if (token) {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          }

          return Promise.reject(error);
        } catch (refreshError) {
          logger.error("Refresh process failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const apiClient = createApiClient();
