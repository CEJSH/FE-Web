import React from "react";
import clsx from "clsx";
import Flex from "../Flex";

{
  /**ssr 전용 스켈레톤.. */
}

export default function SocialPageSkeleton() {
  return (
    <>
      <div className={"pt-safe-top w-full bg-base-white fixed px-5"}>
        <Flex justify="space-between" className={tabContainerStyle}>
          <div className={tabWrapperStyle}>
            <div className={"flex"}>
              <div className={clsx(textStyle, "text-grayscale-900")}>친구</div>
            </div>
            <div className={"flex"}>
              <div className={clsx(textStyle, "text-grayscale-300")}>그룹</div>
            </div>
            {<ShortBottomLine activeTab={"1"} />}
          </div>
        </Flex>
      </div>
      <div className="h-dvh pt-[87px] pb-14">
        <Flex
          direction="column"
          justify="space-between"
          align="center"
          className={"px-5 gap-4 mt-3 pb-4 pt-safe-top"}
        >
          <Flex
            justify="space-between"
            align="center"
            className="w-full h-[33px]"
          >
            <span className="text-T4" id="friendList">
              친구
            </span>
            <span className="w-[71px] h-[33px] py-2 px-3 bg-grayscale-50 animate-pulse text-T6 rounded-lg" />
          </Flex>
          <div className="bg-grayscale-50 animate-pulse w-full py-5 px-6 rounded-lg" />
        </Flex>
        <Flex direction="column" className="px-5 gap-4 w-full" align="center">
          <Flex className="px-4 py-[14px] w-full gap-2">
            <div className="w-9 h-9 bg-grayscale-50 animate-pulse rounded-full" />
            <Flex direction="column" className="gap-[2px]">
              <div className="bg-grayscale-50 animate-pulse w-[143px] h-[17px] rounded-[4px]" />
              <div className="bg-grayscale-50 animate-pulse w-[31px] h-[14px] rounded-[4px]" />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
}

export const tabContainerStyle = "max-w-[430px] w-full flex items-center ";
export const tabWrapperStyle = "relative flex gap-4";
export const textStyle = "h-[39px] pt-[10px] pb-2 flex items-center text-T4";

export function ShortBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`will-change-transform absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "translate-x-[46px]"
      }`}
    />
  );
}
