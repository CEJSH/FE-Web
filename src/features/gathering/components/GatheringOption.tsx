import React from "react";
import { useDropdownWithNoId } from "@/shared/hooks/useDropdown";
import OptionsSelectIcon from "@/shared/components/Icon/OptionsSelectIcon";
import GatheringDropdownMenu from "@/shared/components/DropDownMenu/GatheringDropDownMenu";
import { MENU_TYPES, MenuType } from "@/models/dropdown";
import { GatheringDetailResponse } from "@/models/gathering";
import { MENU_CONFIGS } from "@/shared/constants/menu-configs";

interface GatheringOptionProps {
  gathering: GatheringDetailResponse;
  type: MenuType;
}

export default function GatheringOption({
  gathering,
  type,
}: GatheringOptionProps) {
  const { opened, ref, btnRef, toggleDropdown } = useDropdownWithNoId();

  return (
    <button
      type="button"
      ref={btnRef}
      data-testid="options-icon"
      aria-label="약속 옵션"
      aria-haspopup="menu"
      aria-expanded={opened}
      onClick={toggleDropdown}
      style={{ width: 24, height: 24 }}
      className="relative cursor-pointer flex justify-center items-center bg-transparent border-0 p-0"
    >
      <OptionsSelectIcon color="#FFF" />
      {opened && type === MENU_TYPES.GATHERING && gathering && (
        <GatheringDropdownMenu
          gathering={gathering}
          ref={ref}
          menuItems={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
      {opened && type === MENU_TYPES.GATHERING_ENDED && gathering && (
        <GatheringDropdownMenu
          gathering={gathering}
          ref={ref}
          menuItems={MENU_CONFIGS[type].items}
          className={MENU_CONFIGS[type].className}
        />
      )}
    </button>
  );
}
