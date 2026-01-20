import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import STORAGE_KEYS from "@/shared/constants/storageKeys";
import { AuthProvider, useAuth } from "@/shared/components/providers/AuthProvider";

const getStoredAuthMock = vi.fn();
const clearAuthStorageMock = vi.fn(() => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
});
const saveAuthToStorageMock = vi.fn(
  (
    token: string,
    userInfo: { accountId: string; profileImageUrl: string | null }
  ) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
  }
);
const updateAuthTokenMock = vi.fn((token: string) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
});
const getUserAuthMock = vi.fn();

vi.mock("@/shared/utils/authStorage", () => ({
  __esModule: true,
  getStoredAuth: (...args: unknown[]) => getStoredAuthMock(...args),
  clearAuthStorage: (...args: unknown[]) => clearAuthStorageMock(...args),
  saveAuthToStorage: (...args: unknown[]) => saveAuthToStorageMock(...args),
  updateAuthToken: (...args: unknown[]) => updateAuthTokenMock(...args),
}));

vi.mock("@/features/auth/api/auth", () => ({
  getUserAuth: (...args: unknown[]) => getUserAuthMock(...args),
}));

vi.mock("@/features/users/components/hooks/useUserProfile", () => ({
  __esModule: true,
  default: () => ({ data: null }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
};

const Consumer = () => {
  const { userInfo, isAuthenticated, isInitialized, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="auth">{isAuthenticated ? "yes" : "no"}</div>
      <div data-testid="user">{userInfo?.accountId ?? "none"}</div>
      <div data-testid="initialized">{isInitialized ? "yes" : "no"}</div>
      <button
        type="button"
        onClick={() =>
          login({
            accessToken: "token-abc",
            accountId: "acc-1",
            profileImageUrl: "img",
          } as any)
        }
      >
        do-login
      </button>
      <button type="button" onClick={logout}>
        do-logout
      </button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    getStoredAuthMock.mockReset();
    clearAuthStorageMock.mockClear();
    saveAuthToStorageMock.mockClear();
    updateAuthTokenMock.mockClear();
    getUserAuthMock.mockReset();
  });

  it("login stores token and marks authenticated", async () => {
    renderWithProviders(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("do-login"));

    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBe("token-abc");
    expect(screen.getByTestId("auth").textContent).toBe("yes");
    expect(screen.getByTestId("user").textContent).toBe("acc-1");
    expect(saveAuthToStorageMock).toHaveBeenCalled();
  });

  it("logout clears storage and resets auth state", async () => {
    renderWithProviders(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText("do-login"));
    await userEvent.click(screen.getByText("do-logout"));

    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBeNull();
    expect(screen.getByTestId("auth").textContent).toBe("no");
    expect(clearAuthStorageMock).toHaveBeenCalled();
  });

  it("hydrates state from storage events", async () => {
    renderWithProviders(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "stored");
    localStorage.setItem(
      STORAGE_KEYS.USER_INFO,
      JSON.stringify({ accountId: "persisted", profileImageUrl: null })
    );

    await act(async () => {
      window.dispatchEvent(new Event("lighty:auth-changed"));
    });

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("persisted")
    );
    expect(screen.getByTestId("auth").textContent).toBe("yes");
  });

  it("initializes from async getStoredAuth when no token exists", async () => {
    getStoredAuthMock.mockResolvedValue({
      token: "fallback-token",
      userInfo: { accountId: "fallback", profileImageUrl: null },
    });

    renderWithProviders(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("initialized").textContent).toBe("yes")
    );
    expect(screen.getByTestId("auth").textContent).toBe("yes");
    expect(screen.getByTestId("user").textContent).toBe("fallback");
  });
});
