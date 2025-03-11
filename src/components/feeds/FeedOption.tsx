import { Feed } from "@/models/feed";
import { MENU_TYPES, MenuType } from "@/models/dropdown";
import { useDropdown } from "@/hooks/useDropdown";
import OptionsSelectIcon from "../shared/Icon/OptionsSelectIcon";
import FeedDropdownMenu from "../shared/DropDownMenu/FeedDropDownMenu";

const MENU_CONFIGS = {
  [MENU_TYPES.FEED_MINE]: {
    menuItems: ["숨기기", "수정하기", "삭제하기"],
    className: "z-100 absolute -bottom-[142px] right-[4px]",
  },
  [MENU_TYPES.FEED]: {
    menuItems: ["숨기기", "신고하기"],
    className: "z-100 absolute -bottom-[94px] right-[4px]",
  },
  [MENU_TYPES.HIDDEN]: {
    menuItems: ["숨김 해제"],
    className: "z-100 absolute -bottom-[42px] right-[4px]",
  },
};

interface OptionsProps {
  feed: Feed;
  type: MenuType;
}

export default function FeedOption({ feed, type }: OptionsProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdown();

  return (
    <div
      ref={btnRef}
      data-testid="options-icon"
      onClick={toggleDropdown}
      style={{ width: 24, height: 24 }}
      className="relative cursor-pointer flex justify-center items-center pt-[5.5px] pb-1"
    >
      <OptionsSelectIcon />
      {opened && type === MENU_TYPES.FEED_MINE && feed && (
        <FeedDropdownMenu
          feed={feed}
          ref={ref}
          menuItems={MENU_CONFIGS[type].menuItems}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.FEED && feed && (
        <FeedDropdownMenu
          feed={feed}
          ref={ref}
          menuItems={MENU_CONFIGS[type].menuItems}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.HIDDEN && feed && (
        <FeedDropdownMenu
          feed={feed}
          ref={ref}
          menuItems={MENU_CONFIGS[type].menuItems}
          className={MENU_CONFIGS[type].className}
        />
      )}
    </div>
  );
}
