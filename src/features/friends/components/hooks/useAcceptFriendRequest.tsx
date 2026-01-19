import { postAcceptFriend } from "@/features/friends/api/friends";
import { useMutation } from "@tanstack/react-query";

export default function useAcceptFriendRequest({
  senderId,
  onSuccess,
}: {
  senderId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["accept", "friend/request", senderId],
    mutationFn: () => {
      return postAcceptFriend({ senderId });
    },
    onSuccess: (data: { message: string }) => {
      onSuccess(data);
    },
  });
}
