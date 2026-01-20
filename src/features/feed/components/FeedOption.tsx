import { Feed } from "@/models/feed";
import { MENU_TYPES, MenuType } from "@/models/dropdown";
import { useDropdown } from "@/shared/hooks/useDropdown";
import OptionsSelectIcon from "@/shared/components/Icon/OptionsSelectIcon";
import FeedDropdownMenu from "@/features/feed/components/DropDownMenu/FeedDropDownMenu";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import { MENU_CONFIGS } from "@/shared/constants/menu-configs";

interface OptionsProps {
  feed: Feed;
  type: MenuType;
}

export default function FeedOption({ feed, type }: OptionsProps) {
  const { openedDropdownId, dropDownRef } = useDropdown();
  const { userInfo } = useAuth();
  const isMe = feed.writer.accountId === userInfo?.accountId;
  return (
    <>
      <OptionsSelectIcon />
      {openedDropdownId === feed.id && isMe && feed && (
        <FeedDropdownMenu
          feed={feed}
          ref={dropDownRef}
          menuItems={MENU_CONFIGS[type].menuItems}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {openedDropdownId === feed.id && !isMe && feed && (
        <FeedDropdownMenu
          feed={feed}
          ref={dropDownRef}
          menuItems={MENU_CONFIGS[type].menuItems}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {openedDropdownId === feed.id && type === MENU_TYPES.HIDDEN && feed && (
        <FeedDropdownMenu
          feed={feed}
          ref={dropDownRef}
          menuItems={MENU_CONFIGS[type].menuItems}
          className={MENU_CONFIGS[type].className}
        />
      )}
    </>
  );
}
