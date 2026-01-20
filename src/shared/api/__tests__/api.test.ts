import { beforeEach, describe, expect, it, vi } from "vitest";

import { createApiClient } from "@/shared/api/api";
import STORAGE_KEYS from "@/shared/constants/storageKeys";

type AxiosCreateMock = ReturnType<typeof vi.fn> & {
  interceptors: {
    request: { use: ReturnType<typeof vi.fn> };
    response: { use: (_success: unknown, error: any) => void };
  };
};

type MockErrorConfig = {
  headers: Record<string, unknown>;
  url: string;
  _retry?: boolean;
};

let responseErrorHandler: ((error: any) => Promise<unknown>) | undefined;
let apiCallMock: AxiosCreateMock | undefined;

vi.mock("@/shared/api/shared", () => ({
  API_CONFIG: { getBaseUrl: () => "https://api.test" },
}));

vi.mock("axios", () => {
  const create = vi.fn(() => {
    const mock = vi.fn((config) => Promise.resolve({ data: "ok", config }));
    apiCallMock = Object.assign(mock, {
      interceptors: {
        request: { use: vi.fn() },
        response: {
          use: (_success: unknown, error: any) => {
            responseErrorHandler = error;
          },
        },
      },
    }) as AxiosCreateMock;
    return apiCallMock;
  });

  class AxiosError extends Error {
    config?: unknown;
    response?: unknown;
    constructor(message: string, config?: unknown, response?: unknown) {
      super(message);
      this.config = config;
      this.response = response;
    }
  }

  return {
    __esModule: true,
    default: { create },
    AxiosError,
  };
});

describe("api interceptor refresh", () => {
  beforeEach(() => {
    localStorage.clear();
    responseErrorHandler = undefined;
    apiCallMock?.mockClear();
  });

  it("토큰 새로 받고 1회 재시도 + Authorization 주입", async () => {
    const refreshFn = vi.fn().mockResolvedValue("new-token");
    createApiClient({ refreshFn, baseUrl: "https://api.test" });

    const error = {
      config: { headers: {}, url: "/test" } as MockErrorConfig,
      response: { status: 401 },
    };

    if (!responseErrorHandler || !apiCallMock)
      throw new Error("handler missing");

    const result = await responseErrorHandler(error);

    expect(refreshFn).toHaveBeenCalled();
    expect(error.config._retry).toBe(true);
    expect(apiCallMock).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer new-token",
        }),
      }),
    );
    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBe("new-token");
    expect(result).toEqual({ data: "ok", config: error.config });
  });

  it("이미 retry 한 요청은 다시 시도하지 않는다", async () => {
    const refreshFn = vi.fn().mockResolvedValue("new-token");
    createApiClient({ refreshFn, baseUrl: "https://api.test" });

    const error = {
      config: { headers: {}, url: "/test", _retry: true } as MockErrorConfig,
      response: { status: 401 },
    };

    if (!responseErrorHandler) throw new Error("handler missing");

    await expect(responseErrorHandler(error)).rejects.toBe(error);
    expect(refreshFn).not.toHaveBeenCalled();
    expect(apiCallMock).not.toHaveBeenCalled();
  });
});
