import { postGathering } from "@/features/gathering/api/gathering";
import { lightyToast } from "@/shared/utils/toast";
import { useMutation } from "@tanstack/react-query";
import type * as lighty from "lighty-type";

export default function useMakeGathering({
  gathering,
  onSuccess,
}: {
  gathering: lighty.CreateGatheringRequest;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["make/gathering", gathering.name, gathering.description],
    mutationFn: () => postGathering({ gathering }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => lightyToast.error(error.message),
  });
}
