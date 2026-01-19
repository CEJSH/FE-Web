import Flex from "@/shared/components/Flex";
import ArrowLeftIcon from "@/shared/components/Icon/ArrowLeftIcon";
import Spacing from "@/shared/components/Spacing";
import React from "react";

export default function FramePageSkeleton() {
  return (
    <div className="h-dvh bg-grayscale-50 w-full pt-safe-top">
      <Flex className="w-full h-12 gap-[6px]" align="center">
        <div className="pl-[17px] py-[10px] pr-[3px]">
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">기록하기</span>
      </Flex>
      <Flex direction="column" className="pt-5 px-6 gap-4 text-T2">
        <span className="bg-base-white w-[191px] h-[26px] rounded-[4px] animate-pulse" />
        <span className="bg-base-white w-[177px] h-[20px] rounded-[4px] animate-pulse" />
      </Flex>
      <Spacing size={36} />
      <Flex className="pl-9 gap-4 overflow-hidden">
        <Flex direction="column" className="gap-5">
          <div className="w-[324px] h-[390px] rounded-3xl bg-base-white animate-pulse" />
          <div className="w-[69px] h-[41px] rounded-xl bg-base-white animate-pulse" />
        </Flex>
        <Flex direction="column" className="gap-5">
          <div className="w-[324px] h-[390px] rounded-3xl bg-base-white animate-pulse" />
          <div className="w-[69px] h-[41px] rounded-xl bg-base-white animate-pulse" />
        </Flex>
      </Flex>
    </div>
  );
}
