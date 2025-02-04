import React, { forwardRef, useState } from "react";
import Flex from "../Flex";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { gatheringDeleteModalAtom } from "@/atoms/modal";
import { selectedGatheringInfoAtom } from "@/atoms/gathering";
import { GatheringDetailResponse } from "@/models/gathering";
import { useRouter } from "next/navigation";

interface GatheringDropdownMenuProps {
  items: string[];
  gathering?: GatheringDetailResponse;
  className?: string;
}

const GatheringDropdownMenu = forwardRef<
  HTMLElement,
  GatheringDropdownMenuProps
>(({ items, gathering, className }, ref) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<number | boolean>(false);
  const setGatheringInfo = useSetRecoilState(selectedGatheringInfoAtom);
  const setDeleteModalOpen = useSetRecoilState(gatheringDeleteModalAtom);
  const handleItemClick = (item: string) => {
    if (item.includes("삭제")) {
      setDeleteModalOpen(true);
    }
    if (item.includes("수정하기") && gathering) {
      setGatheringInfo(gathering);
      router.push("/gathering/edit");
    }
  };

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      style={{
        animation: styles.animation,
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
        {items.map((item, index) => {
          return (
            <React.Fragment key={`${item}${index}`}>
              <button
                style={{
                  backgroundColor: isHovered === index ? "#f4f4f4" : "white",
                }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(false)}
                className={`text-B4 w-[131px] rounded-[8px] px-4 py-[10px] text-left ${
                  item.includes("삭제") && "text-point-red50"
                }`}
                onMouseDown={() => handleItemClick(item)}
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
});

GatheringDropdownMenu.displayName = "GatheringDropdownMenu";

export default GatheringDropdownMenu;

const styles = {
  wrapper: "w-full bg-base-white rounded-[12px] px-1 py-[5px]",
  animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  shadow: "0px 0px 16px 0px #0000001F",
};
