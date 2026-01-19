import { deleteNotification } from "@/features/notice/api/notification";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteNotification({
  notificationId,
  onSuccess,
}: {
  notificationId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["delete/notification", notificationId],
    mutationFn: () => deleteNotification({ notificationId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
