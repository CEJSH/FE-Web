import React, { Dispatch, SetStateAction } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import { differenceInCalendarDays } from "date-fns";
import { formatToDisplay } from "@/utils/makeUTC";
import { GatheringDetailResponse } from "@/models/gathering";
const DEFAULT_BG_IMAGE = "https://cdn.lighty.today/lighty.jpg";

export default function GatheringBannerContainer({
  gathering,
  setImageLoaded,
}: {
  gathering: GatheringDetailResponse;
  setImageLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const date = new Date(gathering.gatheringDate);
  const diff = differenceInCalendarDays(new Date(), date);
  const displayingDate = formatToDisplay(date);
  return (
    <>
      <Image
        priority
        alt="gatheringBanner"
        src={gathering.invitationImageUrl || DEFAULT_BG_IMAGE}
        width={600}
        height={316}
        className="h-[316px] w-[600px] object-cover"
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-[#00000080]" />
      <Flex justify="space-between" className={styles.wrapper}>
        <Flex direction="column">
          <Flex direction="column">
            {gathering.name.length >= 10 ? (
              <>
                <span className={styles.gatheringName}>
                  {gathering.name.slice(0, 5)}
                </span>
                <Spacing size={6} />
                <span className={styles.gatheringName}>
                  {gathering.name.slice(5)}
                </span>
              </>
            ) : (
              <span className={styles.gatheringName}>{gathering.name}</span>
            )}
          </Flex>
          <Spacing size={4} />
          <span className={styles.date}>{displayingDate.slice(0, 14)}</span>
        </Flex>
        <div className={styles.diff}>
          {diff >= 0 ? `D + ${diff}` : `D${diff}`}
        </div>
      </Flex>
    </>
  );
}

const styles = {
  wrapper: "absolute left-0 right-0 bottom-0 p-6 pt-0",

  gatheringName: "text-base-white text-T1",

  date: "text-grayscale-100 text-B3",
  diff: "text-base-white text-T2 self-end",
};
