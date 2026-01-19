import Flex from "@/shared/components/Flex";
import ArrowLeftIcon from "@/shared/components/Icon/ArrowLeftIcon";
import Spacing from "@/shared/components/Spacing";
import React from "react";

export default function RecordPageSkeleton() {
  return (
    <div className="h-dvh bg-base-white w-full pt-safe-top">
      <Flex className="w-full h-12 gap-[6px]" align="center">
        <div className="pl-[17px] py-[10px] pr-[3px]">
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">기록하기</span>
      </Flex>
      <Flex direction="column" className="pt-5 px-6 gap-4 text-T2">
        <div className="bg-grayscale-50 w-6 h-6 animate-pulse rounded-[4px]" />
        <span className="bg-grayscale-50 w-[191px] h-[26px] rounded-[4px] animate-pulse" />
        <span className="bg-grayscale-50 w-[188px] h-[20px] rounded-[4px] animate-pulse" />
      </Flex>
      <Spacing size={36} />
      <Flex direction="column" className="px-6 gap-5">
        <Flex className="rounded-2xl px-4 py-5 gap-3">
          <div className="rounded-lg flex justify-center items-center w-10 h-10 bg-grayscale-50 animate-pulse" />
          <Flex direction="column" className="gap-[6px]">
            <span className="bg-grayscale-50 w-[51px] h-[18px] animate-pulse rounded-[4px]" />
            <span className="bg-grayscale-50 w-[200px] h-[14px] animate-pulse rounded-[4px]" />
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" className="px-6 gap-5">
        <Flex className="rounded-2xl px-4 py-5 gap-3">
          <div className="rounded-lg flex justify-center items-center w-10 h-10 bg-grayscale-50 animate-pulse" />
          <Flex direction="column" className="gap-[6px]">
            <span className="bg-grayscale-50 w-[51px] h-[18px] animate-pulse rounded-[4px]" />
            <span className="bg-grayscale-50 w-[200px] h-[14px] animate-pulse rounded-[4px]" />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
