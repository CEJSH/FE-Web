import React, { useMemo, useState } from "react";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";
import { useRouter } from "next/navigation";
import { useFriendsAll } from "@/features/friends/components/hooks/useFriends";
import FriendSkeleton from "@/shared/components/Skeleton/FriendSkeleton";
import { useAuth } from "@/shared/components/providers/AuthProvider";

export default function FriendsSlider() {
  const router = useRouter();
  const { userInfo } = useAuth();
  const [hide, setHide] = useState(true);

  const { data = [], isFetching } = useFriendsAll({
    userId: userInfo?.accountId ?? "",
  });

  const displayedFriends = useMemo(
    () => (hide ? data.slice(0, 12) : data),
    [data, hide]
  );

  const renderFriends = () =>
    displayedFriends.map((friend, i) => (
      <React.Fragment key={`friendItem${i}`}>
        <FriendItem friendInfo={friend} />
        <Spacing size={4} direction="horizontal" />
      </React.Fragment>
    ));

  return (
    <div className="w-max-[430px] pl-5 overflow-scroll no-scrollbar">
      <Spacing size={16} />
      {isFetching ? (
        <Flex className="gap-1">
          {[0, 0, 0, 0, 0, 0, 0].map((_, i) => (
            <React.Fragment key={`skeleton${i}`}>
              <FriendSkeleton />
            </React.Fragment>
          ))}
        </Flex>
      ) : (
        <Flex>
          <AddFriendItem
            onClick={() => {
              router.push("/friends/search");
            }}
          />
          {renderFriends()}
          {data.length > 12 ? (
            <SeeMoreItem
              onClick={() => {
                setHide(false);
              }}
            />
          ) : null}
        </Flex>
      )}
    </div>
  );
}
