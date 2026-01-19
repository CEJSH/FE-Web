import React from "react";
import Flex from "../Flex";

export default function DetailSkeleton() {
  return (
    <Flex direction="column" className="bg-base-white h-dvh w-full">
      <div className="bg-grayscale-50 w-full h-[380px] animate-pulse pt-safe-top" />
      <Flex direction="column" className="w-full">
        <div className="w-full px-6 py-5 bg-base-white">
          <div className="bg-grayscale-50 rounded-[4px] w-full h-[31px] animate-pulse" />
        </div>
        <Flex align="center" className="bg-base-white px-5 py-4 gap-2">
          <div className="bg-grayscale-50 w-9 h-9 rounded-full animate-pulse" />
          <div className="bg-grayscale-50 w-[107px] h-5 rounded-[4px] animate-pulse" />
        </Flex>
      </Flex>
      <div className="w-full h-[10px] bg-grayscale-50 animate-pulse" />
      <Flex
        direction="column"
        align="center"
        className="w-full pt-6 pb-8 gap-4"
      >
        <Flex className="w-full px-5 h-[33px]" align="center">
          <div className="bg-grayscale-50 rounded-[4px] w-full h-5 animate-pulse" />
        </Flex>
        <Flex className="w-full px-5">
          <div className="bg-grayscale-50 rounded-lg w-full h-[52px] animate-pulse" />
        </Flex>
      </Flex>
      <div className="w-full bg-grayscale-50 animate-pulse h-[10px]" />
    </Flex>
  );
}
