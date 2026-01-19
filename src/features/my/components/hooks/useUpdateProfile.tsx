import { patchProfileImage } from "@/features/my/api/profile";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProfile({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["update/profile"],
    mutationFn: async ({ profileImageUrl }: { profileImageUrl: string }) =>
      await patchProfileImage(profileImageUrl),

    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
