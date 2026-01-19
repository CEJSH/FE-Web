import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";
import { AddFriendItem } from "@/features/home/components/FriendItem";
import React from "react";
import type { User } from "lighty-type";
import UnDeletableFriendItem from "@/features/friends/components/UnDeletableFriendItem";

export default function AddOnlyFriendsSlider({
  setStep,
  members,
}: {
  setStep?: (step: number) => void;
  members: User[];
}) {
  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar gap-1">
        <AddFriendItem
          onClick={() => {
            if (setStep) {
              setStep(2);
            }
          }}
        />
        {members.map((finalMember, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <UnDeletableFriendItem friendInfo={finalMember} />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
}
