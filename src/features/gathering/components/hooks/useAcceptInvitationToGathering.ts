import { SuccessResponse } from "@/models/response";
import { postAcceptGatheringInvitation } from "@/features/gathering/api/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useAcceptInvitationToGathering({
  invitationId,
  gatheringId,
  onSuccess,
}: {
  invitationId: string;
  gatheringId: string;
  onSuccess: (data: SuccessResponse) => void;
}) {
  return useMutation({
    mutationKey: ["accept", "invitation", invitationId],
    mutationFn: () =>
      postAcceptGatheringInvitation({ invitationId, gatheringId }),
    onSuccess: (data: SuccessResponse) => onSuccess(data),
  });
}
