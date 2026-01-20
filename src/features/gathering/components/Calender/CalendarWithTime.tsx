import clsx from "clsx";
import Button from "@/shared/components/Button/Button";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import LightyCalendar from "./Calendar";
import { TIMES } from "@/shared/constants/time";
import { SetterOrUpdater } from "recoil";

export default function CalendarWithTime({
  ampm,
  selectedTime,
  setAmpm,
  setSelectedTime,
}: {
  ampm: "오전" | "오후";
  selectedTime: string;
  setAmpm: SetterOrUpdater<"오전" | "오후">;
  setSelectedTime: SetterOrUpdater<string>;
}) {
  return (
    <Flex direction="column" className="w-[340px]">
      <LightyCalendar />
      <Spacing size={16} />
      <Flex className="px-3 gap-2">
        <Button
          onClick={() => setAmpm("오전")}
          className={clsx(
            styles.button,
            ampm === "오전"
              ? "bg-grayscale-900 text-base-white border-grayscale-900"
              : "text-grayscale-600 border-grayscale-100"
          )}
        >
          오전
        </Button>
        <Button
          onClick={() => setAmpm("오후")}
          className={clsx(
            styles.button,
            ampm === "오후"
              ? "bg-grayscale-900 text-base-white border-grayscale-900"
              : "text-grayscale-600 border-grayscale-100"
          )}
        >
          오후
        </Button>
      </Flex>
      <div className="w-[326px] h-[1px] bg-grayscale-50 my-4 mx-3" />
      <Flex className={styles.timeWrapper}>
        {TIMES.map((time, idx) => (
          <Button
            key={idx}
            onClick={() => setSelectedTime(time)}
            className={clsx(
              styles.button,
              time === selectedTime
                ? "bg-grayscale-900 text-base-white border-grayscale-900"
                : "text-grayscale-600 border-grayscale-100"
            )}
          >
            {time}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

const styles = {
  timeWrapper: "gap-2 overflow-x-scroll no-scrollbar px-3",
  button: "py-[10px] px-[18px] rounded-[40px] text-B4 border",
};
