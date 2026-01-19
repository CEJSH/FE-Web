import { deleteNotificationAll } from "@/features/notice/api/notification";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteNotificationAll({
  onSuccess,
}: {
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["delete/notification/all"],
    mutationFn: () => deleteNotificationAll(),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
