"use client";

import clsx from "clsx";
import ArrowLeftIcon from "@/shared/components/Icon/ArrowLeftIcon";
import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";

export default function HeaderWithBtn({
  icon,
  fixed = true,
  bgColor,
  fontColor,
  headerLabel,
  onClickBackBtn,
  children,
}: {
  icon?: React.ReactNode;
  fixed?: boolean;
  bgColor?: string;
  fontColor?: string;
  headerLabel: string;
  onClickBackBtn?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className={clsx(
        "pt-safe-top max-w-[430px] w-full transition-transform duration-300 ease-in-out",
        headerFont
      )}
      style={{
        top: 0,
        zIndex: 30,
        position: fixed ? "fixed" : undefined,
        backgroundColor: bgColor ? bgColor : "transparent",
      }}
    >
      <Flex align="center" className="w-full gap-[6px] h-12 pl-0 pr-5">
        <button
          className={"w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer"}
          aria-label="뒤로가기"
          type="button"
          onClick={() => {
            if (onClickBackBtn) {
              onClickBackBtn();
            } else window.history.back();
          }}
        >
          <ArrowLeftIcon color={fontColor} />
        </button>
        <div
          style={{
            color: fontColor ? fontColor : "",
          }}
          className="flex-1"
        >
          {headerLabel}
        </div>
        <Spacing size={6} />
        {icon && <div>{icon}</div>}
      </Flex>
      {children}
    </Flex>
  );
}

const headerFont = "text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px]";
