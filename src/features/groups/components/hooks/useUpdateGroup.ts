import { updateGroup } from "@/features/groups/api/group";
import { useMutation } from "@tanstack/react-query";
import { UpdateGroupRequest } from "@/models/group";

export default function useUpdateGroup({
  group,
  groupId,
  onSuccess,
  onError,
}: {
  group: Omit<UpdateGroupRequest, "groupId">;
  groupId: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["make/group", group.description],
    mutationFn: () => updateGroup({ group, groupId }),
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
