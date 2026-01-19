import { exitGroup } from "@/features/groups/api/group";
import { useMutation } from "@tanstack/react-query";

export default function useExitGroup({
  groupId,
  onSuccess,
}: {
  groupId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["exit/group", groupId],
    mutationFn: () => exitGroup({ groupId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
