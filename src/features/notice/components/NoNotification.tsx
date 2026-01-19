import React from "react";
import Flex from "@/shared/components/Flex";
import Image from "next/image";

export default function NoNotification() {
  return (
    <Flex
      direction="column"
      className="h-screen gap-[13px]"
      justify="center"
      align="center"
    >
      <Image
        alt="no_notification"
        src="https://cdn.lighty.today/nofitication.svg"
        width={40}
        height={40}
      />
      <span className="text-T4 text-grayscale-300">
        아직 알림 소식이 없어요.
      </span>
    </Flex>
  );
}
