import { patchFeed } from "@/features/feed/api/feed";
import { useMutation } from "@tanstack/react-query";

export default function useEditFeed({
  content,
  feedId,
  onSuccess,
  onError,
}: {
  content: string;
  feedId: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["edit/feed/gathering", feedId, content],
    mutationFn: async () => {
      const result = await patchFeed({ content, feedId });
      if (!result) {
        throw new Error("Failed making gathering feed");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
