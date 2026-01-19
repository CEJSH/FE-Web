import { postGroupMember } from "@/features/groups/api/group";
import { useMutation } from "@tanstack/react-query";

export default function useAddGroupMember({
  groupId,
  friendIds,
  onSuccess,
}: {
  groupId: string;
  friendIds: string[] | null;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["add/groupMember", groupId],
    mutationFn: () => postGroupMember({ groupId, userIds: friendIds }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
