import { patchProfileAccountId } from "@/features/my/api/profile";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateAccountId({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["update/profile/accountId"],
    mutationFn: async ({ accountId }: { accountId: string }) =>
      await patchProfileAccountId({ accountId }),

    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
