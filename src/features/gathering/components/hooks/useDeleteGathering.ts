import { deleteGathering } from "@/features/gathering/api/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteGathering({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["delete/gathering", id],
    mutationFn: () => deleteGathering({ gatheringId: id }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
