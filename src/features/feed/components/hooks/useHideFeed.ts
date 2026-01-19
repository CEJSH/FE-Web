import { hideFeed } from "@/features/feed/api/feed";
import { useMutation } from "@tanstack/react-query";

export default function useHideFeed({
  feedId,
  onSuccess,
  onError,
}: {
  feedId: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["hide/feed", feedId],
    mutationFn: async () => await hideFeed({ feedId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
