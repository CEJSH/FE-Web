import { deleteFeedComment } from "@/features/feed/api/feed-comment";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteComment({
  commentId,
  onSuccess,
}: {
  commentId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["delete/comment", commentId],
    mutationFn: () => deleteFeedComment({ commentId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
