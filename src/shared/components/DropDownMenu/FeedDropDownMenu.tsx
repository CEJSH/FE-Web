import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/shared/state/modal";
import { selectedFeedIdAtom } from "@/features/feed/state/feed";
import { useRouter } from "next/navigation";
import { Feed } from "@/models/feed";
import { ModalType } from "@/models/modal";
interface FeedDropdownMenuProps {
  feed: Feed;
  menuItems: string[];
  className: string;
}

const FeedDropdownMenu = forwardRef<HTMLElement, FeedDropdownMenuProps>(
  ({ menuItems, className, feed }, ref) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState<number | boolean>(false);
    const setReportModal = useSetRecoilState(reportModalAtom);
    const setModalOpen = useSetRecoilState(modalStateAtom);
    const setFeedId = useSetRecoilState(selectedFeedIdAtom);
    const setReport = useSetRecoilState(reportInfoAtom);

    const handleModalOpen = (type: ModalType) => {
      setModalOpen({
        type,
        isOpen: true,
      });
    };

    const clickedMenuItemHandler = (item: string) => {
      if (item.includes("삭제")) {
        setFeedId(feed.id);
        handleModalOpen("deleteFeed");
      } else if (item.includes("수정")) {
        setFeedId(feed.id);
        router.push(`/feed/edit?id=${feed.id}`);
      } else if (item.includes("숨기기")) {
        setFeedId(feed.id);
        handleModalOpen("hideFeed");
      } else if (item.includes("신고")) {
        setFeedId(feed.id);
        setReport((prev) => ({ ...prev, reportedId: feed.id, type: "FEED" }));
        setReportModal({ type: "FEED", isOpen: true });
      } else if (item.includes("숨김 해제")) {
        setFeedId(feed.id);
        handleModalOpen("displayFeed");
      }
    };

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        style={{
          animation: styles.animation,
          willChange: "opacity transform",
        }}
        className={clsx("z-10", className)}
      >
        <ul
          className={styles.wrapper}
          role="menu"
          aria-label="피드 옵션 메뉴"
          style={{
            boxShadow: styles.shadow,
          }}
        >
          {menuItems.map((menuItem, index) => {
            return (
              <React.Fragment key={`${menuItem}${index}`}>
                <li role="none">
                  <button
                    type="button"
                    role="menuitem"
                    style={{
                      backgroundColor:
                        isHovered === index ? "#f4f4f4" : "white",
                    }}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(index)}
                    onBlur={() => setIsHovered(false)}
                    className={`text-B4 w-[131px] rounded-lg px-4 py-[10px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-900 ${
                      menuItem.includes("삭제") && "text-point-red50"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      clickedMenuItemHandler(menuItem);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        clickedMenuItemHandler(menuItem);
                      }
                    }}
                  >
                    {menuItem}
                  </button>
                </li>
                {index < menuItems.length - 1 ? (
                  <div
                    role="separator"
                    aria-hidden="true"
                    className="w-[99px] h-[1px] bg-grayscale-50 mb-[6px]"
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
);

FeedDropdownMenu.displayName = "FeedDropdownMenu";

export default FeedDropdownMenu;

const styles = {
  wrapper:
    "flex flex-col items-center w-full bg-base-white rounded-xl px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
