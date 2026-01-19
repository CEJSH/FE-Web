export const ERROR_MESSAGES = {
  NO_BACKEND_URL: "백엔드 URL이 설정되지 않았습니다.",
  NO_AUTH: "로그인이 필요합니다.",
  NOT_FOUND: "피드의 주체인 약속이 존재하지 않습니다.",
  CONFLICT: "해당 약속에 이미 피드를 작성하였습니다.",
  INVALID_STATE:
    "약속이 완료되지 않았거나, 약속이 완료된지 30일이 초과하였습니다.",
  DEFAULT: "피드 생성에 실패하였습니다.",
} as const;
