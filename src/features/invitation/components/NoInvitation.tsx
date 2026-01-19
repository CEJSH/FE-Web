import React from "react";
import Flex from "@/shared/components/Flex";
import Image from "next/image";

type InvitationType = "RECEIVED" | "SENT";
export default function NoInvitation({ type }: { type: InvitationType }) {
  return (
    <Flex
      direction="column"
      className="pt-safe-top h-full gap-[13px]"
      justify="center"
      align="center"
    >
      <Image
        alt="no_invit"
        src={`https://cdn.lighty.today/no_invit.svg`}
        width={40}
        height={40}
      />
      <span className="text-T4 text-grayscale-300">
        {type === "RECEIVED"
          ? "아직 받은 초대장이 없어요."
          : "아직 보낸 초대장이 없어요."}
      </span>
    </Flex>
  );
}
