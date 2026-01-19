export const TIMES = [
  "12:00",
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];

export const minDate = () => {
  const date = new Date("2024-12-30");
  date.setTime(date.getTime() - 9 * 60 * 60 * 1000);
  return date.toISOString();
};

export const maxDate = () => {
  const date = new Date("2027-01-01");
  date.setTime(date.getTime() - 9 * 60 * 60 * 1000);
  return date.toISOString();
};
