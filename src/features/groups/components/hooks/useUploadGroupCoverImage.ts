import { postGroupCoverImage } from "@/features/groups/api/group";
import { lightyToast } from "@/shared/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useUploadGroupCoverImage({
  file,
  onSuccess,
}: {
  file: File;
  onSuccess: (data: { url: string; message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["upload/group/image", file],
    mutationFn: () => postGroupCoverImage({ file }),
    onSuccess: (data) => {
      if (data) {
        onSuccess(data);
      }
    },
    onError: (error) => lightyToast.error(error.message),
  });
}
