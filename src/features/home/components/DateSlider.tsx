import React from "react";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import CalendarColoredIcon from "@/shared/components/Icon/CalendarColoredIcon";
import ArrowRightIcon from "@/shared/components/Icon/ArrowRightIcon";
import DateItem from "./DateItem";
import { getDate, getDay } from "date-fns";
import Link from "next/link";
import type { Gathering } from "lighty-type";

export default function DateSlider({
  this_week,
  sevenDays,
}: {
  this_week: Gathering[];
  sevenDays: Date[];
}) {
  const gathering_days = this_week?.map((gatherings) =>
    getDate(new Date(gatherings.gatheringDate))
  );

  const DAYS_IN_KOREAN = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Flex direction="column">
      <Flex align="center" className={styles.titleWrapper}>
        <CalendarColoredIcon />
        <Spacing size={4} direction="horizontal" />
        <div className={styles.title}> 이번 주 약속</div>
        <Link className="cursor-pointer" href={"/gathering"}>
          <ArrowRightIcon />
        </Link>
      </Flex>
      <Spacing size={12} />
      <Flex className={styles.dateWrapper} justify="space-between">
        {sevenDays.map((date, i) => {
          const isToday = getDate(new Date()) === getDate(date);
          return (
            <DateItem
              isToday={isToday}
              date={getDate(date)}
              day={DAYS_IN_KOREAN[getDay(date)]}
              key={i}
              icon={gathering_days?.includes(getDate(date))}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

const styles = {
  titleWrapper: "px-5 w-full",
  title: "text-T3 flex-grow",

  dateWrapper: "w-[330px] mx-auto my-0 px-0 py-[10px]",
};
