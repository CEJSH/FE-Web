import React from "react";
import GroupSkeleton from "./GroupSkeleton";
import Flex from "../Flex";
import Spacing from "../Spacing";

export default function GroupListSkeleton() {
  return (
    <div className="h-[calc(100dvh-144px)] px-5 text-T4 mt-3 pb-20">
      <Flex align="center" className="h-[33px] w-full">
        <span className="flex-grow" />
        <Spacing size={4} direction="horizontal" />
        <span className="w-[71px] h-[33px] py-2 px-3 bg-grayscale-50 animate-pulse text-T6 rounded-lg" />
      </Flex>
      <Spacing size={16} />
      <Flex direction="column" className="gap-4">
        <GroupSkeleton />
        <GroupSkeleton />
        <GroupSkeleton />
      </Flex>
    </div>
  );
}
