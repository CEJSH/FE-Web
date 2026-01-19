import { postRejectFriend } from "@/features/friends/api/friends";
import { useMutation } from "@tanstack/react-query";

export default function useRejectFriendRequest({
  senderId,
  onSuccess,
}: {
  senderId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["reject", "friend/request", senderId],
    mutationFn: () => {
      return postRejectFriend({ senderId });
    },
    onSuccess: (data: { message: string }) => {
      onSuccess(data);
    },
  });
}
