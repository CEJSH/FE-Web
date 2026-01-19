import React, { Dispatch, SetStateAction } from "react";
import GroupBannerContainer from "./GroupBannerContainer";
import GroupInfoContainer from "./GroupInfoContainer";
import LeaderContainer from "@/shared/components/LeaderContainer";
import Spacing from "@/shared/components/Spacing";
import LightyInfoContainer from "@/shared/components/LightyInfoContainer";
import PencilIcon from "@/shared/components/Icon/PencilIcon";
import Flex from "@/shared/components/Flex";
import UserIcon from "@/shared/components/Icon/UserIcon";
import MemberContainer from "@/shared/components/MembersContainer";
import type { GroupDetailResponse } from "lighty-type";

export default function GroupDetailContainer({
  groupDetail,
  isLoaded,
  setIsLoaded,
}: {
  groupDetail: GroupDetailResponse;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const { groupImageUrl, owner, description, members } = groupDetail;
  return (
    <div>
      <div className="w-full relative">
        <GroupBannerContainer
          imageUrl={groupImageUrl}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
        />
        {!isLoaded && <div className="absolute bg-grayscale-10 h-full" />}
      </div>
      <GroupInfoContainer group={groupDetail} />
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>
      <LeaderContainer leader={owner} />
      <Spacing size={10} color="#F4F4F4" />
      <LightyInfoContainer
        icon={<PencilIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>그룹 소개</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{description}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#F4F4F4" />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`그룹 멤버 ${members.length}`}</span>
        }
        content={<MemberContainer members={members} />}
      />
    </div>
  );
}

const styles = {
  divider: "flex-shrink-0 h-[1px] w-full bg-grayscale-50",
  dividerWrapper: "pl-[26px] pr-[14px] bg-base-white",
  title: "font-[700] text-base leading-[20.8px] flex-grow",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-xl text-B3",
};
