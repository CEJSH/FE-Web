import React from "react";
import Flex from "@/shared/components/Flex";
import TimelineButton from "@/shared/components/Icon/TimelineButton";
import Spacing from "@/shared/components/Spacing";
import { Gathering } from "@/models/gathering";
import { formatToDisplay } from "@/shared/utils/makeUTC";
import { differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import OptimizedImage from "@/shared/components/OptimizedImage";

export default function TimelineItem({
  upcomingGathering,
}: {
  upcomingGathering: Gathering;
}) {
  const diff = differenceInCalendarDays(
    new Date(),
    new Date(upcomingGathering.gatheringDate)
  );
  const router = useRouter();
  return (
    <Flex
      className="w-full active:bg-grayscale-10"
      justify="space-between"
      onClick={() =>
        router.push(`/gathering/detail?id=${upcomingGathering.id}?tab=1`)
      }
    >
      <Flex>
        <TimelineButton />
        <Spacing size={8} direction="horizontal" />
        <span className="text-T4 min-w-11">{`D${
          diff == 0 ? `-day` : diff
        }`}</span>
        <Spacing size={24} direction="horizontal" />
        <Flex
          direction="column"
          justify="space-between"
          className="cursor-pointer"
        >
          <span className="text-T4">{upcomingGathering.name}</span>
          <div className={styles.date}>
            {formatToDisplay(new Date(upcomingGathering.gatheringDate))}
          </div>
        </Flex>
      </Flex>
      <OptimizedImage
        alt="timelineImage"
        src={upcomingGathering.invitationImageUrl}
        width={56}
        height={56}
        className={styles.image}
        loading="eager"
      />
    </Flex>
  );
}

const styles = {
  date: "text-C2 text-grayscale-600 px-3 py-[6px] rounded-xl bg-grayscale-50",

  image: "rounded-xl w-14 !h-14",
};
