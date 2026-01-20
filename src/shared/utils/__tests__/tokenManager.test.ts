import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import STORAGE_KEYS from "@/shared/constants/storageKeys";
import * as authStorage from "@/shared/utils/authStorage";
import { refreshAccessToken } from "@/shared/utils/tokenManager";
import { lightyToast } from "@/shared/utils/toast";
import { logger } from "@/shared/utils/logger";

const originalFetch = global.fetch;
const originalLocation = window.location;

describe("refreshAccessToken", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_URL = "https://api.test";
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  });

  it("returns null and clears storage when deviceId is missing", async () => {
    const clearSpy = vi
      .spyOn(authStorage, "clearAuthStorage")
      .mockImplementation(() => {});

    const result = await refreshAccessToken();

    expect(clearSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("handles unauthorized response by notifying user and clearing auth", async () => {
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, "device-123");
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, pathname: "/feed" },
      writable: true,
    });

    vi.spyOn(logger, "warn").mockImplementation(() => {});
    const toastSpy = vi.spyOn(lightyToast, "error").mockImplementation(() => {});
    const clearSpy = vi
      .spyOn(authStorage, "clearAuthStorage")
      .mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    } as Response);

    const result = await refreshAccessToken();

    expect(result).toBeNull();
    expect(toastSpy).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
  });

  it("stores token and invokes setter on successful refresh", async () => {
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, "device-123");
    const setToken = vi.fn();
    const json = vi.fn().mockResolvedValue({ accessToken: "new-token" });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json,
    } as unknown as Response);

    const result = await refreshAccessToken(setToken);

    expect(result).toBe("new-token");
    expect(setToken).toHaveBeenCalledWith("new-token");
    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBe("new-token");
  });
});
