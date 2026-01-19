import { apiClient } from "@/shared/api/api";
import type * as lighty from "lighty-type";

/**첫 번째 커서: { createdAt: 현재 날짜, id: uuid 아무 값이나 } */
export async function getNotification({
  cursor,
  limit,
}: lighty.NotificationListRequest): Promise<lighty.NotificationListResponse> {
  const { data } = await apiClient.get("/notifications", {
    params: {
      cursor: JSON.stringify(cursor),
      limit,
    },
  });
  return data;
}

/** 알림 읽음 처리 */
export async function patchNotification(): Promise<{ message: string }> {
  await apiClient.patch("/notifications/read");
  return { message: "읽음 처리 완료" };
}

/** 알림 삭제 */
export async function deleteNotification({
  notificationId,
}: {
  notificationId: string;
}): Promise<{ message: string }> {
  await apiClient.delete(`/notifications/${notificationId}`);
  return {
    message: "알림을 성공적으로 삭제하였습니다",
  };
}

/** 알림 전체 삭제 */
export async function deleteNotificationAll(): Promise<{ message: string }> {
  await apiClient.delete("/notifications/all");
  return {
    message: "알림 전체를 성공적으로 삭제하였습니다",
  };
}
