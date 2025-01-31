import React from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";

type InvitationType = "RECEIVED" | "SENT";
export default function NoInvitation({ type }: { type: InvitationType }) {
  return (
    <Flex
      direction="column"
      className="h-screen"
      justify="center"
      align="center"
    >
      <Image
        alt="no_invit"
        src="https://cdn.lighty.today/no_invit.svg"
        width={40}
        height={40}
      />
      <Spacing size={13} />
      <span className="text-T4 text-grayscale-300">
        {type === "RECEIVED"
          ? "아직 받은 초대장이 없어요."
          : "아직 보낸 초대장이 없어요."}
      </span>
    </Flex>
  );
}
