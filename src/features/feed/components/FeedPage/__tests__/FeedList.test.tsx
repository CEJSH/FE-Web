import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { describe, expect, it, vi } from "vitest";

import { FeedList } from "@/features/feed/components/FeedPage/FeedList";
import { selectedFeedIdAtom } from "@/features/feed/state/feed";

vi.mock("@/features/feed/components/FeedCard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="feed-card">{children}</div>
  ),
}));

vi.mock("@/features/feed/components/InfoBar", () => {
  // forwardRef 안에서 이름 있는 function 사용
  const MockInfoBar = React.forwardRef<
    HTMLButtonElement,
    { onClick: () => void }
  >(function MockInfoBar({ onClick }, ref) {
    return (
      <button ref={ref} onClick={onClick}>
        info
      </button>
    );
  });

  // 선택: 명시적으로 displayName 지정 (디버깅 시 더 명확)
  MockInfoBar.displayName = "MockInfoBar";

  // FriendsInfoContainer도 이름 있는 함수로
  function FriendsInfoContainer({ withMembers }: { withMembers: unknown[] }) {
    return <div data-testid="friends">{withMembers?.length ?? 0}</div>;
  }
  FriendsInfoContainer.displayName = "FriendsInfoContainer";

  return {
    __esModule: true,
    default: MockInfoBar,
    FriendsInfoContainer,
  };
});

vi.mock("@/features/feed/components/DropDownMenu/FeedDropDownMenu", () => {
  const MockFeedDropdownMenu = React.forwardRef<
    HTMLUListElement,
    { menuItems: string[] }
  >(function MockFeedDropdownMenu({ menuItems }, ref) {
    return (
      <ul ref={ref} data-testid="menu">
        {menuItems.map((item) => (
          <li role="menuitem" key={item}>
            {item}
          </li>
        ))}
      </ul>
    );
  });

  MockFeedDropdownMenu.displayName = "MockFeedDropdownMenu";

  return {
    __esModule: true,
    default: MockFeedDropdownMenu,
  };
});

vi.mock("@/shared/components/Icon/OptionsSelectIcon", () => ({
  __esModule: true,
  default: () => <span>⋯</span>,
}));

vi.mock("@/shared/components/Skeleton/FeedSkeleton", () => ({
  __esModule: true,
  FeedSkeleton: () => <div>loading</div>,
}));

vi.mock("@/shared/components/Spinner/DotSpinnerSmall", () => ({
  __esModule: true,
  default: () => <div>spinner</div>,
}));

const RecoilViewer = () => {
  const selected = useRecoilValue(selectedFeedIdAtom);
  return <div data-testid="selected">{selected ?? "none"}</div>;
};

const baseFeed = {
  id: "feed-1",
  writer: { accountId: "writer-1" },
  withMembers: [],
  images: [],
  content: "",
  commentCount: 0,
  createdAt: new Date().toISOString(),
};

describe("FeedList", () => {
  it("shows feed_mine menu items for writer", async () => {
    render(
      <RecoilRoot>
        <RecoilViewer />
        <FeedList
          feeds={[baseFeed]}
          userInfo={{ accountId: "writer-1", profileImageUrl: null }}
          isFetching={false}
        />
      </RecoilRoot>
    );

    await userEvent.click(screen.getByLabelText("피드 옵션"));

    const items = screen.getAllByRole("menuitem").map((el) => el.textContent);
    expect(items).toEqual(["숨기기", "수정하기", "삭제하기"]);
    expect(screen.getByTestId("selected").textContent).toBe("feed-1");
  });

  it("shows feed menu items for non-writer", async () => {
    render(
      <RecoilRoot>
        <FeedList
          feeds={[baseFeed]}
          userInfo={{ accountId: "other", profileImageUrl: null }}
          isFetching={false}
        />
      </RecoilRoot>
    );

    await userEvent.click(screen.getByLabelText("피드 옵션"));

    const items = screen.getAllByRole("menuitem").map((el) => el.textContent);
    expect(items).toEqual(["숨기기", "신고하기"]);
  });

  it("shows hidden menu for userInfo=false", async () => {
    render(
      <RecoilRoot>
        <FeedList feeds={[baseFeed]} userInfo={false} isFetching={false} />
      </RecoilRoot>
    );

    await userEvent.click(screen.getByLabelText("피드 옵션"));

    const items = screen.getAllByRole("menuitem").map((el) => el.textContent);
    expect(items).toEqual(["숨김 해제"]);
  });
});
