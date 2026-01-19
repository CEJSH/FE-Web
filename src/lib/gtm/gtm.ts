import { logger } from "@/shared/utils/logger";

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  } else {
    logger.debug({
      event: "pageview",
      page: url,
    });
  }
};

// 사용자 ID 전송
export const setUserId = (userId: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", GA_ID, {
      user_id: userId,
    });
  }
};

// export async function generateRandomGoogleUserId(
//   name: string
// ): Promise<string> {
//   const now = new Date();
//   const datePart = now
//     .toISOString()
//     .replace(/[-T:.Z]/g, "")
//     .slice(0, 14); // YYYYMMDDHHMMSS 형식
//   const text = `${name}_${datePart}`;

//   const encoder = new TextEncoder();
//   const data = encoder.encode(text);
//   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
//   const resultId = `user_${datePart}_${hashHex.slice(0, 10)}`;

//   return resultId;
// }
