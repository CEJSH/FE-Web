import { addDays, format, getDate } from "date-fns";
import { ko } from "date-fns/locale/ko";

export default function getNext7Days() {
  const today = new Date();
  const next7Days: { D: number; E: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    next7Days.push({ D: getDate(date), E: format(date, "E", { locale: ko }) });
  }

  return next7Days;
}
