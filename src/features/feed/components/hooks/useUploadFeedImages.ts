import { uploadFeedImages } from "@/features/feed/api/feed";
import { useMutation } from "@tanstack/react-query";

export default function useUploadFeedImages({
  files,
  gatheringId,
  onSuccess,
  onError,
}: {
  files: File[];
  gatheringId: string;
  onSuccess: (data: { imageUrls: string[]; message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["upload", "feed/images", gatheringId],
    mutationFn: async () => {
      const result = await uploadFeedImages({ files });
      if (!result) {
        throw new Error("Upload failed");
      }
      return result;
    },
    onSuccess: (data: { imageUrls: string[]; message: string }) => {
      onSuccess(data);
    },
    onError: (error) => onError(error),
  });
}
