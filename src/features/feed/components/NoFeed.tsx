import Flex from "@/shared/components/Flex";

export default function NoFeed() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-[calc(100dvh-148px)] gap-[13px]"
    >
      <div className="w-10 h-10 p-[5px]">
        <FeedIcon width="30" height="30" />
      </div>
      <span className="text-T4 text-grayscale-300">
        아직 추억 피드가 없어요.
      </span>
    </Flex>
  );
}

export function NoFeedHidden() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-[calc(100dvh-148px)] gap-[13px]"
    >
      <div className="w-10 h-10 p-[5px]">
        <FeedIcon width="30" height="30" />
      </div>
      <span className="text-T4 text-grayscale-300">숨김 피드가 없어요.</span>
    </Flex>
  );
}

function FeedIcon({ width, height }: { width?: string; height?: string }) {
  return (
    <svg
      width={width ?? "34"}
      height={height ?? "34"}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Icon"
        d="M2.9375 10.4375H31.0625M26.375 17H7.625M18.875 24.5H7.625M7.625 32H26.375C29.4816 32 32 29.4816 32 26.375V7.625C32 4.5184 29.4816 2 26.375 2H7.625C4.5184 2 2 4.5184 2 7.625V26.375C2 29.4816 4.5184 32 7.625 32Z"
        stroke="#D8D8D8"
        style={{
          stroke: "#D8D8D8",
          strokeOpacity: 1,
        }}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NoFeedToMakeCard() {
  return (
    <div className="pl-5">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="bg-grayscale-10 w-[270px] h-[320px] border-[1px] border-dashed rounded-[20px] border-grayscale-200 gap-2"
      >
        <FeedIcon width="24" height="24" />
        <span className="text-B4 text-grayscale-400">
          포토 카드로 만들 피드가 없어요!
        </span>
      </Flex>
    </div>
  );
}
