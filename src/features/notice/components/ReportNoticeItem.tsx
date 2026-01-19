import React from "react";
import NoticeItem from "@/shared/components/NoticeItem";
import type { Notification } from "lighty-type";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
export type NotificationTypes =
  | "GATHERING_INVITATION_RECEIVED"
  | "GATHERING_INVITATION_ACCEPTED"
  | "GROUP_INVITATION"
  | "FRIEND_REQUEST"
  | "FRIEND_REQUEST_ACCEPTED"
  | "FEED_COMMENT"
  | "FEED_COMMENT_MENTIONED"
  | "FRIEND_FEED_WRITEN"
  | "GATHERING_FEED_WRITEN";

const NotificationImage: Record<NotificationTypes, string> = {
  GATHERING_INVITATION_RECEIVED: "💌",
  GATHERING_INVITATION_ACCEPTED: "💌",
  GROUP_INVITATION: "👀",
  FRIEND_REQUEST: "👀",
  FRIEND_REQUEST_ACCEPTED: "🙌🏻",
  FEED_COMMENT: "💬",
  FEED_COMMENT_MENTIONED: "💬",
  FRIEND_FEED_WRITEN: "🌠",
  GATHERING_FEED_WRITEN: "🌠",
};

export default function ReportNoticeItem({
  notification,
}: {
  notification: Notification;
}) {
  const { title, message, createdAt, type } = notification;
  const date = format(new Date(createdAt), "yy.MM.dd.");
  const router = useRouter();

  const LOCATION = {
    FRIEND_REQUEST: "/friends",
    GATHERING_INVITATION_RECEIVED: "/invitation",
    GROUP_INVITATION: "/social?tab=group",
    FEED_COMMENT: `/feed/detail?id=${notification.relatedId}`,
    FEED_COMMENT_MENTIONED: `/feed/detail?id=${notification.relatedId}`,
    FRIEND_FEED_WRITEN: `/feed/detail?id=${notification.relatedId}`,
    GATHERING_FEED_WRITEN: `/feed/detail?id=${notification.relatedId}`,
  };

  const handleClick = () => {
    const address = LOCATION[type];
    if (!!address) {
      router.push(address);
    }
  };
  return (
    <NoticeItem
      onClick={handleClick}
      icon={NotificationImage[type]}
      title={`${title}`}
      date={date}
      type={type}
      description={message}
    />
  );
}
