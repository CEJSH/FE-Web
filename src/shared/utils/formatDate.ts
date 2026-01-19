export function formatDate(date: Date) {
  const createdTime = date;
  const koreaNow = new Date().getTime();
  const diff = (koreaNow - createdTime.getTime()) / 1000;

  if (diff < 60) {
    // 1분 미만일 때
    return "방금 전";
  }

  if (diff < 60 * 60) {
    // 1시간 미만일 때
    return `${Math.floor(diff / 60)}분 전`;
  }

  if (diff < 60 * 60 * 24) {
    // 24시간 미만일 때
    return `${Math.floor(diff / (60 * 60))}시간 전`;
  }

  if (diff < 60 * 60 * 24 * 30) {
    // 30일 미만일 때
    return `${Math.floor(diff / (60 * 60 * 24))}일 전`;
  }

  if (diff < 60 * 60 * 24 * 365) {
    // 365일 미만일 때
    return `${Math.floor(diff / (60 * 60 * 24 * 30))}달 전`;
  }

  // 1년 이상일 때
  return `${Math.floor(diff / (60 * 60 * 24 * 365))}년 전`;
}
