import React from "react";
import clsx from "clsx";
import { DotIcon } from "../Icon/DotIcon";

type Props = {
  title: string;
  onMouseDown: () => void;
  className?: string;
  current: boolean;
  fresh?: boolean | "never"; // 빨간아이콘
};
function TabButton({
  title,
  current,
  onMouseDown,
  fresh,
}: Props) {
  return (
    <div className={"flex cursor-pointer"}>
      <div
        onMouseDown={onMouseDown}
        className={clsx(
          textStyle,
          current ? "text-grayscale-900" : "text-grayscale-300"
        )}
      >
        {title}
      </div>
      {fresh === "never" ? null : <DotIcon display={fresh as boolean} />}
    </div>
  );
}

export default React.memo(TabButton);

const textStyle = "h-[39px] pt-[10px] pb-2 flex items-center text-T4";
