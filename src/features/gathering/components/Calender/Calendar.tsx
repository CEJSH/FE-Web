import dynamic from "next/dynamic";
import "./CalendarWithBorder.css";
import { addDays, format } from "date-fns";
import ArrowRightIcon from "@/shared/components/Icon/ArrowRightIcon";
import ArrowLeftIcon from "@/shared/components/Icon/ArrowLeftIcon";
import { useRecoilState } from "recoil";
import { gatheringSelectedDateAtom } from "@/features/gathering/state/gathering";
import CalendarSkeleton from "./CalendarSkeleton";
import Flex from "@/shared/components/Flex";
import { useState } from "react";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function LightyCalendar() {
  const [selectedDate, setSelectedDate] = useRecoilState<Value>(
    gatheringSelectedDateAtom
  );
  const [activeStartDate, setActiveStartDate] = useState(
    addDays(new Date(), 1)
  );

  return (
    <Flex className="py-3" justify="center">
      <Calendar
        showNeighboringMonth
        minDate={addDays(new Date(), 1)}
        onChange={setSelectedDate}
        value={selectedDate}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setActiveStartDate(activeStartDate);
          }
        }}
        formatDay={(locale, date) => format(date, "d")}
        prev2Label={null}
        next2Label={null}
        nextLabel={
          <div className="border border-grayscale-100 p-[7px] rounded-lg">
            <ArrowRightIcon width="14" height="14" color="#AEAEAE" />
          </div>
        }
        prevLabel={
          <div className="border border-grayscale-100 p-[7px] rounded-lg">
            <ArrowLeftIcon width="14" height="14" color="#AEAEAE" />
          </div>
        }
      />
    </Flex>
  );
}
