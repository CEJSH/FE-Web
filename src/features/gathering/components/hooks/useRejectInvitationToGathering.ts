import { SuccessResponse } from "@/models/response";
import { postRejectGatheringInvitation } from "@/features/gathering/api/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useRejectInvitationToGathering({
  invitationId,
  onSuccess,
}: {
  invitationId: string;
  onSuccess: (data: SuccessResponse) => void;
}) {
  return useMutation({
    mutationKey: ["reject", "invitation", invitationId],
    mutationFn: () => postRejectGatheringInvitation({ invitationId }),
    onSuccess: (data: SuccessResponse) => onSuccess(data),
  });
}
