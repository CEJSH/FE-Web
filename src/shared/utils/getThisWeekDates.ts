export const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // 일요일 보정
  startOfWeek.setHours(0, 0, 0, 0); // 시작 시간을 00:00:00으로 설정

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek); // 매번 새로운 날짜 객체 생성
    date.setDate(startOfWeek.getDate() + i);

    // 마지막 날짜(토요일)라면 23:59:59로 설정
    if (i === 6) {
      date.setHours(23, 59, 59, 999);
    } else {
      date.setHours(0, 0, 0, 0);
    }

    weekDays.push(date);
  }

  return weekDays;
};
