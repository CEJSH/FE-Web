import { postProfileImage } from "@/features/my/api/profile";
import { lightyToast } from "@/shared/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { logger } from "@/shared/utils/logger";

export default function usePostProfileImage({
  onSuccess,
}: {
  onSuccess: (imageUrl: string) => void;
}) {
  return useMutation({
    mutationKey: ["post/profile"],
    mutationFn: async ({ file }: { file: File | null }) => {
      if (file == null) throw new Error("업로드할 파일이 없습니다.");
      else {
        logger.debug("Uploading profile image", file);
        return await postProfileImage({ file });
      }
    },
    onSuccess: (data: { imageUrl: string }) => onSuccess(data.imageUrl),
    onError: (error: Error) => lightyToast.error(error.message),
  });
}
