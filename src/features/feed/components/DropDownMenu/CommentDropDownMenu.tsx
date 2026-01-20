import React, { forwardRef, useState } from "react";
import Flex from "@/shared/components/Flex";
import { useSetRecoilState } from "recoil";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/shared/state/modal";
import { lightyToast } from "@/shared/utils/toast";
import { selectedCommentIdAtom } from "@/features/feed/state/comment";

interface CommentDropdownMenuProps {
  commentId?: string;
  items: string[];
}

const CommentDropdownMenu = forwardRef<HTMLElement, CommentDropdownMenuProps>(
  ({ items, commentId }, ref) => {
    const [isHovered, setIsHovered] = useState<number | boolean>(false);
    const setModal = useSetRecoilState(modalStateAtom);
    const setReportModal = useSetRecoilState(reportModalAtom);
    const setReport = useSetRecoilState(reportInfoAtom);
    const setCommentId = useSetRecoilState(selectedCommentIdAtom);

    const handleItemClick = (item: string) => {
      if (item.includes("삭제")) {
        if (!commentId) {
        } else {
          setCommentId(commentId);
          setModal({ type: "deleteFeedComment", isOpen: true });
        }
      } else if (item.includes("신고")) {
        if (!commentId) {
          lightyToast.error("선택된 댓글이 없습니다");
        } else {
          setReport((prev) => ({
            ...prev,
            type: "FEED_COMMENT",
            reportedId: commentId,
          }));
          setReportModal({ type: "FEED_COMMENT", isOpen: true });
        }
      }
    };
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        style={{
          animation: styles.animation,
          willChange: "opacity transform",
        }}
        className="z-10 p-1 pl-0 absolute -bottom-[42px] -right-[24px]"
      >
        <Flex
          direction="column"
          align="center"
          className={styles.wrapper}
          style={{
            boxShadow: styles.shadow,
          }}
        >
          {items.map((item, index) => {
            return (
              <React.Fragment key={`${item}${index}`}>
                <button
                  style={{
                    backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                  }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`text-B4  w-[131px] rounded-lg px-4 py-[10px] text-left ${
                    item.includes("삭제") && "text-point-red50"
                  }`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                >
                  {item}
                </button>
                {index < items.length - 1 ? (
                  <div className="w-[99px] h-[1px] bg-grayscale-50 mb-[6px]" />
                ) : null}
              </React.Fragment>
            );
          })}
        </Flex>
      </div>
    );
  }
);

CommentDropdownMenu.displayName = "CommentDropdownMenu";

export default CommentDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-xl px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
