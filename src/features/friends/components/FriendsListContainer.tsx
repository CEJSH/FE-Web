import React from "react";
import type * as lighty from "lighty-type";

import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import Button from "@/shared/components/Button/Button";
import FriendListItem from "./FriendListItem";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import handleShare from "@/shared/utils/handleShare";

interface FriendsListContainerProps {
  friends?: lighty.User[];
  isFetching: boolean;
}

const sharingData = {
  url: `https://lighty.today`,
  text: "친구가 라이티에 초대했어요! 라이티에서 추억을 쌓아볼까요?",
  title: "Lighty, 나만의 프라이빗 일기 SNS",
};

export default function FriendsListContainer({
  friends,
  isFetching,
}: FriendsListContainerProps) {
  const hasFriends = friends && friends.length > 0;

  return (
    <div className="h-full px-5 pb-14">
      {hasFriends ? (
        <FriendsList friends={friends!} isFetching={isFetching} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <Flex
      className={styles.container}
      direction="column"
      align="center"
      justify="center"
    >
      <Flex className={styles.wrapper} direction="column">
        <span className="text-B2">친구가 아직 라이티를 가입하지 않았다면?</span>
        <Button
          className={styles.button}
          color="#0a0a0a"
          onClick={() => handleShare(sharingData)}
        >
          💌 친구 초대하기
        </Button>
      </Flex>
    </Flex>
  );
}

function FriendsList({
  friends,
  isFetching,
}: {
  friends: lighty.User[];
  isFetching: boolean;
}) {
  return (
    <ul aria-labelledby="friendList">
      {friends.map((friendItem, idx) => (
        <React.Fragment key={friendItem.accountId}>
          <FriendListItem friendInfo={friendItem} idx={idx} type="friend" />
          <Spacing size={16} />
        </React.Fragment>
      ))}
      {isFetching && (
        <li className={styles.spinnerBox}>
          <DotSpinnerSmall />
        </li>
      )}
    </ul>
  );
}

const styles = {
  button: "rounded-xl py-3 px-[14px] text-base-white text-B3",
  container: "h-[calc(100dvh-278px)] pb-safe-bottom",
  wrapper: "pb-5 gap-5 items-center justify-center",
  spinnerBox: "flex justify-center py-4",
};
