import { postFriendsFeed } from "@/features/feed/api/feed";
import { useMutation } from "@tanstack/react-query";
import type * as lighty from "lighty-type";

export default function useMakeFriendsFeed({
  feedRequest,
  onSuccess,
  onError,
}: {
  feedRequest: lighty.CreateFriendFeedRequest;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["make/feed/friends", feedRequest.content],
    mutationFn: async () => await postFriendsFeed({ friendsFeed: feedRequest }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
