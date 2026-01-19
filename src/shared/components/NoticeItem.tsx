import type { NotificationTypes } from "lighty-type";
import Flex from "./Flex";
import ArrowRightIcon from "./Icon/ArrowRightIcon";
import Spacing from "./Spacing";
import clsx from "clsx";

interface NoticeProps {
  icon: string;
  title: string;
  date: string;
  description: string;
  type: NotificationTypes;
  onClick: () => void;
}

export default function NoticeItem({
  onClick,
  icon,
  title,
  date,
  description,
  type,
}: NoticeProps) {
  const clickable = [
    "FRIEND_REQUEST",
    "GATHERING_INVITATION_RECEIVED",
    "GROUP_INVITATION",
    "FEED_COMMENT",
    "FEED_COMMENT_MENTIONED",
    "FRIEND_FEED_WRITEN",
    "GATHERING_FEED_WRITEN",
  ].includes(type);

  return (
    <Flex
      className={clsx(
        "p-4 rounded-2xl bg-base-white",
        clickable && "cursor-pointer active:bg-grayscale-10"
      )}
      onClick={onClick}
    >
      <Flex
        align="center"
        justify="center"
        className="w-8 h-8 rounded-full bg-grayscale-50"
      >
        {icon}
      </Flex>
      <Spacing size={10} direction="horizontal" />
      <Flex direction="column" className="flex-grow gap-1">
        <Flex align="center">
          <span className="text-T5">{title}</span>
          <Spacing size={4} direction="horizontal" />
          <span className="text-C2 text-grayscale-300">{date}</span>
        </Flex>
        <span className="text-B4 text-grayscale-500">{description}</span>
      </Flex>
      <Spacing size={8} direction="horizontal" />
      {clickable && (
        <div className="self-center">
          <ArrowRightIcon width="24" height="24" />
        </div>
      )}
    </Flex>
  );
}
