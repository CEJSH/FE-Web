import React from "react";
import { useDropdown } from "@/shared/hooks/useDropdown";
import { Feed } from "@/models/feed";
import { OptionsSelectIconXSmall } from "@/shared/components/Icon/OptionsSelectIcon";
import CommentDropdownMenu from "@/shared/components/DropDownMenu/CommentDropDownMenu";
import { MENU_CONFIGS } from "@/shared/constants/menu-configs";

interface OptionsProps {
  feed?: Feed;
  isMine?: boolean;
  commentId?: string;
  type: string;
}

export default function CommentOption({ commentId, type }: OptionsProps) {
  const { openedDropdownId, dropDownRef, btnRef, toggleDropdown } =
    useDropdown();

  return (
    <button
      type="button"
      aria-label="댓글 옵션"
      ref={btnRef}
      data-testid="options-icon"
      onClick={() => {
        toggleDropdown(commentId || "");
      }}
      style={{
        width: "24px",
        height: "16px",
        paddingLeft: "6px",
        minWidth: "24px",
        display: "flex",
        opacity: 1,
        zIndex: 10,
      }}
      className="relative cursor-pointer flex justify-center items-center bg-transparent border-0 p-0"
    >
      <OptionsSelectIconXSmall />
      {openedDropdownId && (
        <CommentDropdownMenu
          ref={dropDownRef}
          commentId={commentId}
          items={MENU_CONFIGS[type].items}
        />
      )}
    </button>
  );
}
