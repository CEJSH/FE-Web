import GatheringBannerContainer from "./GatheringBannerContainer";
import LeaderContainer from "@/shared/components/LeaderContainer";
import Spacing from "@/shared/components/Spacing";
import LightyInfoContainer from "@/shared/components/LightyInfoContainer";
import FeedIcon from "@/shared/components/Icon/FeedIcon";
import Flex from "@/shared/components/Flex";
import CalendarIcon from "@/shared/components/Icon/CalendarIcon";
import MapPinIcon from "@/shared/components/Icon/MapPinIcon";
import UserIcon from "@/shared/components/Icon/UserIcon";
import MemberContainer from "@/shared/components/MembersContainer";
import { formatToKoreanTime } from "@/shared/utils/makeUTC";
import { GatheringDetailResponse } from "@/models/gathering";
import { MAP } from "@/shared/constants/images";
import { Dispatch, SetStateAction, useRef } from "react";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import OptimizedImage from "@/shared/components/OptimizedImage";

export default function GatheringDetail({
  selectedGathering,
  isLoaded,
  setIsLoaded,
}: {
  selectedGathering: GatheringDetailResponse;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const { gatheringDate, members, hostUser, address, description } =
    selectedGathering;
  const containerRef = useRef<HTMLDivElement>(null);
  const convertedDate = formatToKoreanTime(gatheringDate);
  useIntersectionObserver({ elementRef: containerRef, threshold: 0.5 });

  return (
    <div>
      <div className="w-full relative h-[380px]" ref={containerRef}>
        <GatheringBannerContainer
          gathering={selectedGathering}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
        />
        {!isLoaded && <div className="absolute bg-grayscale-10 h-full" />}
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
            <OptimizedImage
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
        content={<MemberContainer members={members} />}
      />
    </div>
  );
}

const styles = {
  title: "font-[700] text-base leading-[20.8px]",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-xl text-B3",
};
