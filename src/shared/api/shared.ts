import { ERROR_MESSAGES } from "@/shared/constants/errorMessages";

// 공통으로 사용되는 기본 설정
export const API_CONFIG = {
  getBaseUrl: () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!url) throw new Error(ERROR_MESSAGES.NO_BACKEND_URL);
    return url;
  },
};
