import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { useSetRecoilState } from "recoil";

import FeedDropdownMenu from "@/features/feed/components/DropDownMenu/FeedDropDownMenu";
import {
  modalStateAtom,
  reportInfoAtom,
  reportModalAtom,
} from "@/shared/state/modal";
import { selectedFeedIdAtom } from "@/features/feed/state/feed";

const recoilMocks = vi.hoisted(() => {
  const setReportModal = vi.fn();
  const setModalOpen = vi.fn();
  const setFeedId = vi.fn();
  const setReport = vi.fn();
  return { setReportModal, setModalOpen, setFeedId, setReport };
});

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: (...args: unknown[]) => pushMock(...args) }),
}));

vi.mock("recoil", async (importActual) => {
  const actual = await importActual<typeof import("recoil")>();
  return {
    ...actual,
    useSetRecoilState: vi.fn(),
  };
});

describe("FeedDropdownMenu interactions", () => {
  const feed = {
    id: "feed-1",
    writer: { accountId: "writer-1" },
    withMembers: [],
  } as any;

  const useSetRecoilStateMock = vi.mocked(useSetRecoilState);

  beforeEach(() => {
    pushMock.mockReset();
    recoilMocks.setReportModal.mockReset();
    recoilMocks.setModalOpen.mockReset();
    recoilMocks.setFeedId.mockReset();
    recoilMocks.setReport.mockReset();
    useSetRecoilStateMock.mockReset();
    useSetRecoilStateMock.mockImplementation((atom) => {
      if (atom === reportModalAtom) return recoilMocks.setReportModal;
      if (atom === modalStateAtom) return recoilMocks.setModalOpen;
      if (atom === selectedFeedIdAtom) return recoilMocks.setFeedId;
      if (atom === reportInfoAtom) return recoilMocks.setReport;
      return vi.fn();
    });
  });

  it("opens delete modal on 삭제하기", async () => {
    render(
      <FeedDropdownMenu
        feed={feed}
        menuItems={["삭제하기"]}
        className="c"
      />
    );

    await userEvent.click(screen.getByRole("menuitem"));

    expect(recoilMocks.setFeedId).toHaveBeenCalledWith("feed-1");
    expect(recoilMocks.setModalOpen).toHaveBeenCalledWith({
      type: "deleteFeed",
      isOpen: true,
    });
  });

  it("navigates to edit on 수정하기", async () => {
    render(
      <FeedDropdownMenu feed={feed} menuItems={["수정하기"]} className="c" />
    );

    await userEvent.click(screen.getByRole("menuitem"));

    expect(recoilMocks.setFeedId).toHaveBeenCalledWith("feed-1");
    expect(pushMock).toHaveBeenCalledWith("/feed/edit?id=feed-1");
  });

  it("opens report modal on 신고하기", async () => {
    render(
      <FeedDropdownMenu feed={feed} menuItems={["신고하기"]} className="c" />
    );

    await userEvent.click(screen.getByRole("menuitem"));

    expect(recoilMocks.setFeedId).toHaveBeenCalledWith("feed-1");
    const updater = recoilMocks.setReport.mock.calls[0]?.[0];
    expect(typeof updater).toBe("function");
    expect(updater({} as any)).toEqual({
      reportedId: "feed-1",
      type: "FEED",
    });
    expect(recoilMocks.setReportModal).toHaveBeenCalledWith({
      type: "FEED",
      isOpen: true,
    });
  });

  it("opens hide modal on 숨기기", async () => {
    render(<FeedDropdownMenu feed={feed} menuItems={["숨기기"]} className="c" />);

    await userEvent.click(screen.getByRole("menuitem"));

    expect(recoilMocks.setFeedId).toHaveBeenCalledWith("feed-1");
    expect(recoilMocks.setModalOpen).toHaveBeenCalledWith({
      type: "hideFeed",
      isOpen: true,
    });
  });

  it("opens display modal on 숨김 해제", async () => {
    render(
      <FeedDropdownMenu feed={feed} menuItems={["숨김 해제"]} className="c" />
    );

    await userEvent.click(screen.getByRole("menuitem"));

    expect(recoilMocks.setFeedId).toHaveBeenCalledWith("feed-1");
    expect(recoilMocks.setModalOpen).toHaveBeenCalledWith({
      type: "displayFeed",
      isOpen: true,
    });
  });
});
