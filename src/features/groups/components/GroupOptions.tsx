import React from "react";
import { useDropdownWithNoId } from "@/shared/hooks/useDropdown";
import OptionsSelectIcon from "@/shared/components/Icon/OptionsSelectIcon";
import GroupDropdownMenu from "@/shared/components/DropDownMenu/GroupDropDownMenu";
import { GroupEditProps } from "@/app/groups/detail/page";

export default function GroupOptions({
  isOwner,
  group,
}: {
  isOwner: boolean;
  group: GroupEditProps;
}) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdownWithNoId();
  const menuItems = isOwner
    ? ["그룹 삭제하기", "그룹 수정하기"]
    : ["그룹 나가기", "그룹 신고하기"];

  return (
    <button
      type="button"
      ref={btnRef}
      test-id="options-icon"
      aria-label="그룹 옵션"
      aria-haspopup="menu"
      aria-expanded={opened}
      onClick={toggleDropdown}
      style={{
        width: "24px",
        height: "24px",
      }}
      className={`${styles.container} bg-transparent border-0 p-0`}
    >
      <OptionsSelectIcon color="white" />
      {opened && (
        <GroupDropdownMenu
          group={group}
          ref={ref}
          menuItems={menuItems}
          className={styles.menu}
        />
      )}
    </button>
  );
}

const styles = {
  container: "cursor-pointer relative flex justify-center pt-[4.5px]",
  menu: "absolute -bottom-[104px] -right-[4px]",
};
