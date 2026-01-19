import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";
import { AddFriendItem } from "@/features/home/components/FriendItem";
import { selectedFriendsAtom } from "@/features/friends/state/friends";
import { SetterOrUpdater, useRecoilState } from "recoil";
import DeletableFriendItem from "@/features/friends/components/DeletableFriendItem";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import type * as lighty from "lighty-type";
import { CreateGroupRequest } from "@/models/group";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import useFriends from "@/features/friends/components/hooks/useFriends";

export default function AddFriendsSlider({
  type,
  setGathering,
  setGroup,
  setStep,
}: {
  type: "gathering" | "group";
  setGathering?: SetterOrUpdater<lighty.CreateGatheringRequest>;
  setGroup?: Dispatch<SetStateAction<CreateGroupRequest>>;
  setStep?: (step: number) => void;
}) {
  const { userInfo } = useAuth();
  const { data: allFriends } = useFriends({
    userId: userInfo?.accountId ?? "",
  });
  const [selectedFriendIds, setSelectedFriendIds] = useRecoilState<string[]>(
    selectedFriendsAtom
  );
  const selectedFriends = useMemo(() => {
    if (!allFriends || !selectedFriendIds || selectedFriendIds.length === 0) {
      return [];
    }
    const selectedSet = new Set(selectedFriendIds);
    return allFriends.filter((friend) => selectedSet.has(friend.id));
  }, [allFriends, selectedFriendIds]);
  const onClickDelete = (friend: lighty.User) => {
    setSelectedFriendIds((prev) => prev.filter((id) => id !== friend.id));
  };

  useEffect(() => {
    const selectedIdsOrNull =
      selectedFriendIds && selectedFriendIds.length > 0
        ? selectedFriendIds
        : null;
    if (type === "group" && setGroup) {
      setGroup((prev: CreateGroupRequest) => ({
        ...prev,
        friendIds: selectedIdsOrNull,
      }));
    } else if (type === "gathering" && setGathering) {
      setGathering((prev: lighty.CreateGatheringRequest) => ({
        ...prev,
        friendIds: selectedIdsOrNull,
      }));
    }
  }, [selectedFriendIds, setGathering, setGroup, type]);

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        <AddFriendItem
          onClick={() => {
            if (setStep) {
              setStep(2);
            }
          }}
        />
        {selectedFriends.length > 0
          ? selectedFriends.map((friend, i) => {
              return (
                <React.Fragment key={`friendItem${i}`}>
                  <DeletableFriendItem
                    friendInfo={friend}
                    onClickDelete={() => onClickDelete(friend)}
                  />
                  <Spacing size={4} direction="horizontal" />
                </React.Fragment>
              );
            })
          : null}
      </Flex>
    </div>
  );
}
