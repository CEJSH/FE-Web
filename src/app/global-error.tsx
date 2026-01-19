"use client";

import Flex from "@/shared/components/Flex";
import AlarmIcon from "@/shared/components/Icon/AlarmIcon";
import Spacing from "@/shared/components/Spacing";
import { lightyToast } from "@/shared/utils/toast";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  lightyToast.error(error.message);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <Flex className="h-dvh" justify="center" align="center">
          <Flex
            direction="column"
            justify="center"
            align="center"
            className="bg-grayscale-200 cursor-pointer"
            onClick={() => reset()}
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
      </body>
    </html>
  );
}
