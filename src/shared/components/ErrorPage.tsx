import React from "react";
import Flex from "./Flex";
import AlarmIcon from "./Icon/AlarmIcon";
import Spacing from "./Spacing";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <Flex className="absolute inset-0 h-dvh" justify="center" align="center">
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="active:bg-grayscale-200 cursor-pointer"
        onClick={() => router.back()}
      >
        <div className="p-2">
          <AlarmIcon color="#AEAEAE" />
        </div>
        <Spacing size={12} />
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="p-2 gap-4"
        >
          <span className="text-T3">오류가 발생했어요.</span>
          <span className="text-grayscale-600 text-B2">
            잠시 후 다시 시도해주세요.
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
}
