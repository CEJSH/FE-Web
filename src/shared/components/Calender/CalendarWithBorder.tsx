import dynamic from "next/dynamic";
import "./CalendarWithBorder.css";
import { format } from "date-fns";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import { useRecoilState } from "recoil";
import { gatheringSelectedDateAtom } from "@/features/gathering/state/gathering";
import Flex from "../Flex";
import React, { useCallback, useMemo } from "react";
import CalendarLightyIcon from "../Icon/CalendarLightyIcon";
import { Gathering } from "@/models/gathering";
import CalendarSkeleton from "./CalendarSkeleton";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function LightyCalendarWithBorder({
  gatherings,
}: {
  gatherings?: Gathering[];
}) {
  const [selectedDate, setSelectedDate] = useRecoilState<Value>(
    gatheringSelectedDateAtom
  );

  const handleDateChange = useCallback(
    (newDate: Value) => {
      if (newDate !== selectedDate) {
        setSelectedDate(newDate);
      }
    },
    [selectedDate, setSelectedDate]
  );
  const datesWithIcons = useMemo(() => {
    if (!gatherings) return [];
    return gatherings.map((gathering) => new Date(gathering.gatheringDate));
  }, [gatherings]);

  const returnClassName = useCallback(
    (date: Date) => {
      const isSpecialDate = datesWithIcons.some(
        (specialDate) =>
          specialDate.getFullYear() === date.getFullYear() &&
          specialDate.getMonth() === date.getMonth() &&
          specialDate.getDate() === date.getDate()
      );

      return isSpecialDate ? "special-date !overflow-visible" : null;
    },
    [datesWithIcons]
  );

  const renderIcon = useCallback(
    (date: Date) => {
      const isSpecialDate = datesWithIcons.some(
        (specialDate) =>
          specialDate.getFullYear() === date.getFullYear() &&
          specialDate.getMonth() === date.getMonth() &&
          specialDate.getDate() === date.getDate()
      );

      return isSpecialDate ? (
        <Flex
          justify="center"
          className="w-full absolute bottom-[-10px]"
          style={{ zIndex: 9 }}
        >
          <CalendarLightyIcon />
        </Flex>
      ) : null;
    },
    [datesWithIcons]
  );

  return (
    <div className="px-6 pt-5 pb-8 rounded-[20px] border-[1.4px] border-grayscale-100">
      <Calendar
        showNeighboringMonth={true}
        tileClassName={({ date }) => {
          return returnClassName(date);
        }}
        tileContent={({ date }) => {
          return renderIcon(date);
        }}
        onChange={handleDateChange}
        value={selectedDate}
        formatDay={(locale, date) => format(date, "d")}
        prev2Label={null}
        next2Label={null}
        nextLabel={
          <div className={iconWrapper}>
            <ArrowRightIcon width="14" height="14" color="#AEAEAE" />
          </div>
        }
        prevLabel={
          <div className={iconWrapper}>
            <ArrowLeftIcon width="14" height="14" color="#AEAEAE" />
          </div>
        }
      />
    </div>
  );
}

const iconWrapper = "border border-[#E9E9E9] p-[7px] rounded-lg";
