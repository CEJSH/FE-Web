import UpcomingSchedule from "@/features/schedule/components/UpcomingSchedule";
import LightyCalendarWithBorder from "@/shared/components/Calender/CalendarWithBorder";
import Spacing from "@/shared/components/Spacing";
import { Gathering } from "@/models/gathering";
import React from "react";

export default function Schedule({
  expectingGatherings,
}: {
  expectingGatherings?: Gathering[];
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGatherings =
    expectingGatherings
      ?.filter((gathering) => new Date(gathering.gatheringDate) >= today)
      .sort(
        (a, b) =>
          new Date(a.gatheringDate).getTime() -
          new Date(b.gatheringDate).getTime()
      ) || [];

  return (
    <div className="w-full flex flex-col items-center pt-5">
      <Spacing size={87} />
      <LightyCalendarWithBorder gatherings={expectingGatherings} />
      <Spacing size={28} />
      <MemoizedUpcomingSchedule gathering={upcomingGatherings} />
    </div>
  );
}

const MemoizedUpcomingSchedule = React.memo(
  ({ gathering }: { gathering: Gathering[] }) => (
    <UpcomingSchedule gatherings={gathering} />
  )
);

MemoizedUpcomingSchedule.displayName = "MemoizedUpcomingSchedule";
