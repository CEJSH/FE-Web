import clsx from "clsx";
import Flex from "@/shared/components/Flex";
import CalendarLightyIcon from "@/shared/components/Icon/CalendarLightyIcon";

export default function DateItem({
  day,
  date,
  icon,
  isToday,
}: {
  day: string;
  date: number;
  icon?: boolean;
  isToday: boolean;
}) {
  return (
    <Flex direction="column" align="center" className={styles.container}>
      <div className={styles.day}>{day}</div>
      <div
        className={clsx(
          styles.date,
          isToday ? "rounded-full bg-grayscale-900 text-base-white" : ""
        )}
      >
        {date}
      </div>
      {icon ? (
        <div className="mt-1">
          <CalendarLightyIcon />
        </div>
      ) : null}
    </Flex>
  );
}

const styles = {
  container: "w-[32px] pb-1",

  day: "text-B3 text-grayscale-600 pl-[9px] pr-2 pt-[3px] pb-[7px]",
  date: "text-center text-T5 w-8 h-8 flex justify-center items-center",
};
