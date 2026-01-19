import React from "react";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import Flex from "../Flex";
import Spacing from "../Spacing";
import LightyLogo from "../Icon/LightyLogo";

export default function CardPageSkeleton() {
  return (
    <div className="pt-safe-top h-dvh bg-base-white overflow-hidden">
      <Flex className="w-full h-12 gap-[6px]" align="center">
        <div className="pl-[17px] py-[10px] pr-[3px]">
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">포토 카드</span>
      </Flex>
      <Flex direction="column" className="px-6 w-full pt-[28px] pb-5">
        <LightyLogo />
        <Spacing size={16} />
        <span className="bg-grayscale-50 w-[89px] h-[26px] rounded-[4px] animate-pulse" />
        <Spacing size={6} />
        <span className="bg-grayscale-50 w-[169px] h-[26px] rounded-[4px] animate-pulse" />
        <Spacing size={16} />
        <span className="bg-grayscale-50 w-[240px] h-5 rounded-[4px] animate-pulse" />
      </Flex>
      <Flex className="w-max px-5 overflow-hidden gap-5 pb-5">
        <Flex
          direction="column"
          className="relative bg-grayscale-50 h-[334px] w-[270px] animate-pulse overflow-hidden rounded-[20px] shadow-lg"
        >
          <Flex
            direction="column"
            className="bg-base-white absolute left-0 bottom-0 right-0 pt-4 pb-6 px-5 gap-[6px]"
          >
            <span className="h-[23px] w-[105px] bg-grayscale-50 animate-pulse rounded-[4px]" />
            <span className="h-[28px] w-[230px] bg-grayscale-50 animate-pulse rounded-[4px]" />
          </Flex>
        </Flex>
        <Flex
          direction="column"
          className=" relative bg-grayscale-50 h-[334px] w-[270px] animate-pulse overflow-hidden rounded-[20px] shadow-lg"
        >
          <Flex
            direction="column"
            className="bg-base-white absolute left-0 bottom-0 right-0 pt-4 pb-6 px-5 gap-[6px]"
          >
            <span className="h-[23px] w-[105px] bg-grayscale-50 animate-pulse rounded-[4px]" />
            <span className="h-[28px] w-[230px] bg-grayscale-50 animate-pulse rounded-[4px]" />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
