import React, { useState } from "react";
import GatheringBannerContainer from "./GatheringBannerContainer";
import ShareIcon from "../shared/Icon/ShareIcon";
import Options, { MENU_TYPES } from "../shared/Options";
import LeaderContainer from "../shared/LeaderContainer";
import Spacing from "../shared/Spacing";
import LightyInfoContainer from "../shared/LightyInfoContainer";
import FeedIcon from "../shared/Icon/FeedIcon";
import Flex from "../shared/Flex";
import CalendarIcon from "../shared/Icon/CalendarIcon";
import Image from "next/image";
import MapPinIcon from "../shared/Icon/MapPinIcon";
import UserIcon from "../shared/Icon/UserIcon";
import DotSpinner from "../shared/Spinner/DotSpinner";
import GatheringMemberContainer from "./GatheringMembersContainer";
import { useAuth } from "../shared/providers/AuthProvider";
import { formatToKoreanTime } from "@/utils/makeUTC";
import { GatheringDetailResponse } from "@/models/gathering";
import handleShare from "@/utils/handleShare";
import { MAP } from "@/constants/images";

export default function GatheringDetail({
  selectedGathering,
}: {
  selectedGathering: GatheringDetailResponse;
}) {
  const { userInfo } = useAuth();

  const [imageLoaded, setImageLoaded] = useState(false);
  const { gatheringDate, members, hostUser, address, description } =
    selectedGathering;
  const convertedDate = formatToKoreanTime(gatheringDate);
  const isEnded = new Date(gatheringDate).getTime() < new Date().getTime();

  return (
    <>
      <div className="relative">
        <GatheringBannerContainer
          gathering={selectedGathering}
          setImageLoaded={setImageLoaded}
        />
        {!imageLoaded && <DotSpinner />}
      </div>

      <div className="absolute top-4 right-5 flex gap-[14px] z-50">
        <div className="cursor-pointer" onMouseDown={handleShare}>
          <ShareIcon />
        </div>
        {userInfo?.accountId === hostUser.accountId && (
          <Options
            type={isEnded ? MENU_TYPES.ENDEDGATHERING : MENU_TYPES.GATHERING}
            gathering={selectedGathering}
            color="white"
          />
        )}
      </div>
      <LeaderContainer leader={hostUser} />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<FeedIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 설명</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{description}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={styles.title}>약속 장소</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{address}</span>
            <Spacing size={8} direction="horizontal" />
            <Image
              className="rounded-[10.8px] w-9 h-9 object-cover"
              alt="mapIcon"
              width={36}
              height={36}
              src={MAP}
            />
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<MapPinIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 시간</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{convertedDate.slice(0, 10)}</span>
            <Spacing size={12} direction="horizontal" />
            <span className="text-grayscale-400">
              {convertedDate.slice(10)}
            </span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`약속 멤버 ${members.length}`}</span>
        }
        content={<GatheringMemberContainer members={members} />}
      />
    </>
  );
}

const styles = {
  header: "max-w-[430px] z-10 fixed w-full",

  title: "font-[700] text-[16px] leading-[20.8px]",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-xl text-B3",
};
