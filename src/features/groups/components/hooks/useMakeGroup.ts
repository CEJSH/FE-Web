import { postGroup } from "@/features/groups/api/group";
import { useMutation } from "@tanstack/react-query";
import { CreateGroupRequest } from "@/models/group";

export default function useMakeGroup({
  group,
  onSuccess,
  onError,
}: {
  group: CreateGroupRequest;
  onSuccess: (data: { message: string }) => void;
  onError: (e: Error) => void;
}) {
  return useMutation({
    mutationKey: ["make/group", group.description],
    mutationFn: () => postGroup({ group }),
    onSuccess: (data) => onSuccess(data),
    onError: (e: Error) => onError(e),
  });
}
