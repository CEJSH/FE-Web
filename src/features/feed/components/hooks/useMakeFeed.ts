import { postGatheringFeed } from "@/features/feed/api/feed";
import { useMutation } from "@tanstack/react-query";
import type * as lighty from "lighty-type";
import { logger } from "@/shared/utils/logger";

export default function useMakeGatheringFeed({
  feedRequest,
  onSuccess,
  onError,
}: {
  feedRequest: lighty.CreateGatheringFeedRequest;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: [
      "make/feed/gathering",
      feedRequest.gatheringId,
      feedRequest.content,
    ],
    mutationFn: async () =>
      await postGatheringFeed({ gatheringFeed: feedRequest }),
    onSuccess: (data: { message: string }) => {
      logger.debug("Feed created", feedRequest);
      onSuccess(data);
    },
    onError: (error) => onError(error),
  });
}
