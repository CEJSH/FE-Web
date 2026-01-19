import React from "react";
import Flex from "../Flex";

export default function FriendSkeleton() {
  return (
    <Flex
      direction="column"
      style={{
        width: "fit-content",
        flexShrink: 0,
        gap: "2px",
        alignItems: "center",
      }}
    >
      <div className="w-14 h-14 box-content bg-[#F4F4F4] rounded-full" />
      <Flex direction="column" align="center" className="gap-[2px]">
        <span className="text-T6 w-11 bg-[#F4F4F4] h-[12px]" />
        <span className="text-C5 w-16 bg-[#F4F4F4] h-[13px]" />
      </Flex>
    </Flex>
  );
}
