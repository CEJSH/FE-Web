import Spacing from "@/shared/components/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "@/shared/components/PhotoSwiper";
import { Feed } from "@/models/feed";
import React from "react";

interface FeedCardProps {
  feed: Feed;
  children: React.ReactNode;
}

export const FeedCard = ({ feed, children }: FeedCardProps) => {
  if (!feed?.writer) {
    return null;
  }

  return (
    <article className="flex flex-col py-3">
      {children}
      <Spacing size={12} />
      <PhotoSwiper feed={feed} />
      <Spacing size={8} />
      <ContentWithComments
        feedId={feed.id}
        content={feed.content}
        commentCount={feed.commentCount}
      />
    </article>
  );
};

export default React.memo(FeedCard);
