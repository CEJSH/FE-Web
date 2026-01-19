import React from "react";
import Flex from "../Flex";

export default function NoticeSkeleton() {
  return (
    <Flex className="w-full h-[74px] bg-base-white gap-[10px] p-4 rounded-2xl">
      <div className="animate-pulse rounded-full bg-grayscale-50 w-8 h-8" />
      <Flex direction="column" className="h-full gap-1 flex-grow">
        <div className="animate-pulse w-16 h-full bg-grayscale-50 rounded" />
        <div className="animate-pulse w-full h-full bg-grayscale-50 rounded" />
      </Flex>
    </Flex>
  );
}
