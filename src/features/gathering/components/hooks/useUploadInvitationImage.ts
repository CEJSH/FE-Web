import { postGatheringInvitationImage } from "@/features/gathering/api/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useUploadInvitationImage({
  file,
  onSuccess,
  onError,
}: {
  file: File;
  onSuccess: (data: { imageUrl: string; message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["upload", "gathering/invitation", file],
    mutationFn: () => postGatheringInvitationImage({ file }),
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
