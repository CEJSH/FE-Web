import React from "react";
import Flex from "./Flex";
import Spacing from "./Spacing";

interface GatheringInfoContainerProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  editBtn?: React.ReactNode;
}
export default function LightyInfoContainer({
  icon,
  title,
  content,
}: GatheringInfoContainerProps) {
  return (
    <Flex
      direction="column"
      className="gap-[18px] pt-6 px-5 pb-8 bg-base-white"
    >
      <Flex align="center">
        {icon}
        <Spacing size={4} direction="horizontal" />
        {title}
      </Flex>
      <Flex>{content}</Flex>
    </Flex>
  );
}
