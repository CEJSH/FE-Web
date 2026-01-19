import { deleteGroup } from "@/features/groups/api/group";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteGroup({
  groupId,
  onSuccess,
}: {
  groupId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["delete/group", groupId],
    mutationFn: () => deleteGroup({ groupId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
