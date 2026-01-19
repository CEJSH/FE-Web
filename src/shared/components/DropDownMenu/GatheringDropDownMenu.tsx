import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { modalStateAtom } from "@/shared/state/modal";
import { useRouter } from "next/navigation";
import { GatheringDetailResponse } from "@/models/gathering";

interface GatheringDropdownMenuProps {
  gathering: GatheringDetailResponse;
  menuItems: string[];
  className: string;
}

const GatheringDropdownMenu = forwardRef<
  HTMLElement,
  GatheringDropdownMenuProps
>(({ menuItems, gathering, className }, ref) => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState<number | boolean>(false);

  const setOpenModal = useSetRecoilState(modalStateAtom);

  const clickedMenuItemHandler = (item: string) => {
    if (item.includes("삭제")) {
      setOpenModal({ type: "deleteGathering", isOpen: true });
    }
    if (item.includes("수정하기") && gathering) {
      router.push(`/gathering/edit?id=${gathering.id}`);
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
      <Flex
        direction="column"
        align="center"
        className={styles.wrapper}
        style={{
          boxShadow: styles.shadow,
        }}
      >
        {menuItems.map((menuItem, index) => {
          return (
            <React.Fragment key={`${menuItem}${index}`}>
              <button
                style={{
                  backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(false)}
                className={`text-B4 w-[131px] rounded-lg px-4 py-[10px] text-left ${
                  menuItem.includes("삭제") && "text-point-red50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  clickedMenuItemHandler(menuItem);
                }}
              >
                {menuItem}
              </button>
              {index < menuItems.length - 1 ? (
                <div className="w-[99px] h-[1px] bg-grayscale-50 mb-[6px]" />
              ) : null}
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
});

GatheringDropdownMenu.displayName = "GatheringDropdownMenu";

export default GatheringDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-xl px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
