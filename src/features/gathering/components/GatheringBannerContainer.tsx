import React, { Dispatch, SetStateAction } from "react";
import Flex from "@/shared/components/Flex";
import Image from "next/image";
import Spacing from "@/shared/components/Spacing";
import { differenceInCalendarDays } from "date-fns";
import { formatToDisplay } from "@/shared/utils/makeUTC";
import { GatheringDetailResponse } from "@/models/gathering";
import clsx from "clsx";

const DEFAULT_BG_IMAGE = "https://cdn.lighty.today/lighty.jpg";

export default function GatheringBannerContainer({
  gathering,
  isLoaded,
  setIsLoaded,
}: {
  gathering: GatheringDetailResponse;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const date = new Date(gathering.gatheringDate);
  const diff = differenceInCalendarDays(new Date(), date);
  const displayingDate = formatToDisplay(date);
  return (
    <>
      <Image
        priority
        alt="gatheringBanner"
        src={
          gathering.invitationImageUrl
            ? `${gathering.invitationImageUrl}`
            : `${DEFAULT_BG_IMAGE}`
        }
        width={500}
        height={380}
        className={clsx(
          "h-[380px] w-[500px] object-cover",
          `transition-opacity duration-75 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`
        )}
        onLoad={() => setIsLoaded(true)}
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
