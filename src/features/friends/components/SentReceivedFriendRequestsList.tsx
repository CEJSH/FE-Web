import React from "react";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import FriendListItem from "./FriendListItem";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import type { User } from "lighty-type";
import useSentAndReceivedFriendsRequests from "./hooks/useSentAndReceivedFriendsRequests";
interface Request {
  sender: User;
  requestId: string;
}

export default function SentReceivedFriendRequestsList() {
  const { data, isLoading } = useSentAndReceivedFriendsRequests({
    name: "가",
    accountId: "a",
    limit: 30,
  });
  const receivedRequests = data?.received?.requests.map((request) => ({
    sender: request.sender,
    requestId: request.id,
  }));

  const sentRequests = data?.sent?.requests.map((request) => ({
    sender: request.sender,
    requestId: request.id,
  }));

  return (
    <Flex direction="column" className="h-full px-5 pt-safe-top pb-safe-bottom">
      <Flex direction="column" className="h-full pt-16 gap-8">
        {isLoading && <DotSpinner />}
        {receivedRequests &&
          receivedRequests?.length > 0 &&
          renderRequests(receivedRequests, "받은 요청", "receivedRequest")}
        {sentRequests &&
          sentRequests?.length > 0 &&
          renderRequests(sentRequests, "보낸 요청", "sentRequest")}
      </Flex>
    </Flex>
  );
}

const renderRequests = (
  requests: Request[],
  title: string,
  type: "receivedRequest" | "sentRequest"
) => (
  <Flex direction="column">
    <span className="text-T5">{title}</span>
    <Spacing size={12} />
    {requests.map((request, i) => (
      <React.Fragment key={request.requestId}>
        <FriendListItem
          idx={i}
          type={type}
          senderId={request.sender.id}
          friendInfo={request.sender}
        />
        <Spacing size={16} />
      </React.Fragment>
    ))}
  </Flex>
);
