import { deleteFriend } from "@/features/friends/api/friends";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteFriend({
  friendId,
  onSuccess,
}: {
  friendId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["delete/friend", friendId],
    mutationFn: () => {
      return deleteFriend({ friendId });
    },
    onSuccess: (data) => onSuccess(data),
  });
}
