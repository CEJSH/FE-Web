import { deleteFeed } from "@/features/feed/api/feed";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteFeed({
  feedId,
  onSuccess,
}: {
  feedId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["delete/feed", feedId],
    mutationFn: () => deleteFeed({ feedId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
