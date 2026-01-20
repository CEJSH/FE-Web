import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import STORAGE_KEYS from "@/shared/constants/storageKeys";
import {
  getStoredAuth,
  saveAuthToStorage,
  updateAuthToken,
} from "@/shared/utils/authStorage";

describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("returns null after retrying when no token exists", async () => {
    const resultPromise = getStoredAuth();

    await vi.runAllTimersAsync();
    const result = await resultPromise;

    expect(result).toBeNull();
  });

  it("resolves with stored token and user info", async () => {
    saveAuthToStorage("token-abc", {
      accountId: "acc1",
      profileImageUrl: "img",
    });

    const resultPromise = getStoredAuth();

    vi.runAllTimers();
    const result = await resultPromise;

    expect(result).toEqual({
      token: "token-abc",
      userInfo: { accountId: "acc1", profileImageUrl: "img" },
    });
  });

  it("updateAuthToken overwrites token and notifies listeners", () => {
    const listener = vi.fn();
    window.addEventListener("lighty:auth-changed", listener);

    updateAuthToken("token-new");

    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBe("token-new");
    expect(listener).toHaveBeenCalled();

    window.removeEventListener("lighty:auth-changed", listener);
  });
});
