import { postFriends } from "@/remote/friends";
import { lightyToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useRequestFriend({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["request/friend", userId],
    mutationFn: async () => {
      return await postFriends({ userId });
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: Error) => lightyToast.error(error.message),
  });
}
