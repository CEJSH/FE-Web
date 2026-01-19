import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

export default function makeUTC({
  ampm,
  date,
  time,
}: {
  ampm: string;
  date: string;
  time: string;
}) {
  const [hour, minute] = time.split(":").map((part) => part.padStart(2, "0"));

  let formattedHour = parseInt(hour);
  if (ampm === "오후" && formattedHour !== 12) {
    formattedHour += 12;
  } else if (ampm === "오전" && formattedHour === 12) {
    formattedHour = 0;
  }

  const formattedHourStr = formattedHour.toString().padStart(2, "0");

  const kstDateTime = new Date(
    `${date}T${formattedHourStr}:${minute}:00+09:00`
  );

  if (isNaN(kstDateTime.getTime())) {
    throw new Error("Invalid date or time format");
  }

  const utcDateTime = kstDateTime;

  return utcDateTime.toISOString();
}

export function formatToKoreanTime(utcISOString: string) {
  const formattedDate = format(new Date(utcISOString), "yyyy.MM.dd a hh:mm", {
    locale: ko,
  });

  return formattedDate;
}

export function formatToDisplay(utcISOString: Date) {
  const formattedDate = format(utcISOString, "yyyy.MM.dd (E) a h:mm", {
    locale: ko,
  });

  return formattedDate;
}
