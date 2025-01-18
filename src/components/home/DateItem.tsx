import Flex from "../shared/Flex";
import CalendarLightyIcon from "../shared/icons/CalendarLightyIcon";

export default function DateItem({ date, day }: { date: number; day: string }) {
  return (
    <Flex direction="column" align="center" className={styles.container}>
      <div className={styles.day}>{day}</div>
      <div className={styles.date}>{date}</div>
      <div>
        <CalendarLightyIcon />
      </div>
    </Flex>
  );
}

const styles = {
  container: "w-[32px] pb-[4px]",

  day: "text-B3 text-grayscale-600 pl-[9px] pr-[8px] pt-[3px] pb-[7px]",
  date: "text-center text-T5 w-[32px] h-[32px] py-[7px]",
};
