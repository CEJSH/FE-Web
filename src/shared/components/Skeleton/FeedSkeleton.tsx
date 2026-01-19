import clsx from "clsx";
import Flex from "../Flex";
import Spacing from "../Spacing";
import {
  ShortBottomLine,
  tabContainerStyle,
  tabWrapperStyle,
  textStyle,
} from "./SocialPageSkeleton";

export function FeedSkeleton() {
  return (
    <Flex className="pl-5 pt-5" direction="column">
      <Flex className="gap-[6px]">
        <div className="w-9 h-9 rounded-full bg-grayscale-50 animate-pulse" />
        <Flex className="gap-[2px]" direction="column">
          <span className="w-40 h-[18px] rounded-[4px] bg-grayscale-50 animate-pulse" />
          <span className="w-[29px] h-[14px] rounded-[4px] bg-grayscale-50 animate-pulse" />
        </Flex>
      </Flex>
      <Spacing size={12} />
      <div className="w-[340px] h-[390px] rounded-2xl bg-grayscale-50 animate-pulse" />
      <Spacing size={8} />
      <Flex direction="column" className="pl-1 gap-[4px]">
        <span className="w-80 h-5 bg-grayscale-50 animate-pulse rounded-[4px]" />
        <span className="w-11 h-5 bg-grayscale-50 animate-pulse rounded-[4px]" />
      </Flex>
    </Flex>
  );
}

export default function FeedPageSkeleton({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative h-dvh w-full pt-safe-top">
      <header className="flex flex-col">
        <div className="w-full flex justify-between items-center h-12 pl-5 text-[20px] font-[700] leading-[26px] tracking-[-0.3px]">
          <span>{"추억 피드"}</span>
        </div>
        <div id="filter" className={"px-5 w-full"}>
          <Flex justify="space-between" className={tabContainerStyle}>
            <div className={tabWrapperStyle}>
              <div className={"flex"}>
                <div className={clsx(textStyle, "text-grayscale-900")}>
                  전체
                </div>
              </div>
              <div className={"flex"}>
                <div className={clsx(textStyle, "text-grayscale-300")}>
                  마이
                </div>
              </div>
              <ShortBottomLine activeTab={"1"} />
            </div>
          </Flex>
        </div>
      </header>
      <div className="h-dvh">
        <div className="pb-28">
          {children}
          <FeedSkeleton />
          <FeedSkeleton />
        </div>
      </div>
    </div>
  );
}
