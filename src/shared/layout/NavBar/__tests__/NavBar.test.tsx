import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { RecoilRoot } from "recoil";
import { describe, expect, it, vi } from "vitest";

import NavBar from "@/shared/layout/NavBar";
import NAV_ITEMS from "@/shared/constants/navBar";

vi.mock("@/shared/components/Icon/FeedIcon", () => ({
  __esModule: true,
  default: () => <span>feed-icon</span>,
}));
vi.mock("@/shared/components/Icon/CalendarIcon", () => ({
  __esModule: true,
  default: () => <span>calendar-icon</span>,
}));
vi.mock("@/shared/components/Icon/LightyLogoForNavBar", () => ({
  __esModule: true,
  default: () => <span>logo-icon</span>,
}));
vi.mock("@/shared/components/Icon/UserIcon", () => ({
  __esModule: true,
  default: () => <span>user-icon</span>,
}));
vi.mock("@/shared/components/OptimizedImage", () => ({
  __esModule: true,
  default: (props: { alt?: string }) => <img alt={props.alt} />,
}));

const useUserProfileMock = vi.hoisted(() => vi.fn());
const useActiveNavigationMock = vi.hoisted(() => vi.fn());
const useReactNativeWebViewMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/users/components/hooks/useUserProfile", () => ({
  __esModule: true,
  default: useUserProfileMock,
}));

vi.mock("@/shared/hooks/useActiveNavigation", () => ({
  useActiveNavigation: useActiveNavigationMock,
}));

vi.mock("@/shared/components/providers/ReactNativeWebViewProvider", () => ({
  useReactNativeWebView: useReactNativeWebViewMock,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ prefetch: vi.fn(), push: vi.fn() }),
}));

vi.mock("@/features/navigation/components/FloatingButton", () => ({
  __esModule: true,
  default: ({ tooltip }: { tooltip: boolean }) => (
    <div data-testid="floating" data-tooltip={tooltip} />
  ),
}));

const mockUser = { hasFeed: false, profileImageUrl: "img" };

const renderNav = () =>
  render(
    <RecoilRoot>
      <NavBar />
    </RecoilRoot>,
  );

describe("NavBar", () => {
  it("renders nothing when user is missing", () => {
    useUserProfileMock.mockReturnValue({ data: undefined });
    useActiveNavigationMock.mockReturnValue({
      pathname: "/feed",
      activeBtn: 0,
    });
    useReactNativeWebViewMock.mockReturnValue({ isReactNativeWebView: false });

    renderNav();
    expect(screen.queryByLabelText("하단 내비게이션")).toBeNull();
  });

  it("renders nav items on feed path", () => {
    useUserProfileMock.mockReturnValue({ data: mockUser });
    useActiveNavigationMock.mockReturnValue({
      pathname: "/feed",
      activeBtn: 1,
    });
    useReactNativeWebViewMock.mockReturnValue({ isReactNativeWebView: false });

    renderNav();

    NAV_ITEMS.forEach((item) => {
      expect(
        screen.getByRole("link", { name: `${item.name} 페이지로 이동` }),
      ).toBeInTheDocument();
    });
  });

  it("dispatches reselect event when clicking active item", async () => {
    useUserProfileMock.mockReturnValue({ data: mockUser });
    useActiveNavigationMock.mockReturnValue({
      pathname: "/feed",
      activeBtn: 0,
    });
    useReactNativeWebViewMock.mockReturnValue({ isReactNativeWebView: false });
    const listener = vi.fn();
    window.addEventListener("lighty:navigation-reselect", listener);

    renderNav();

    await userEvent.click(
      screen.getByRole("link", { name: `${NAV_ITEMS[0].name} 페이지로 이동` }),
    );

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { href: NAV_ITEMS[0].href },
      }),
    );
    window.removeEventListener("lighty:navigation-reselect", listener);
  });

  it("renders safe bottom padding when in React Native WebView", () => {
    useUserProfileMock.mockReturnValue({ data: mockUser });
    useActiveNavigationMock.mockReturnValue({
      pathname: "/feed",
      activeBtn: 0,
    });
    useReactNativeWebViewMock.mockReturnValue({ isReactNativeWebView: true });

    renderNav();

    expect(screen.getByLabelText("하단 내비게이션")).toHaveClass(
      "!pb-safe-bottom",
    );
  });
});
