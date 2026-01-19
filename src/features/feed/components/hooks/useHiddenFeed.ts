import useReport from "@/features/report/components/hooks/useReport";
import { lightyToast } from "@/shared/utils/toast";
import useDeleteComment from "./useDeleteComment";
import useDisplayFeed from "./useDisplayFeed";
import useFeedHidden from "./useFeedHidden";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { selectedFeedIdAtom } from "@/features/feed/state/feed";
import { selectedCommentIdAtom } from "@/features/feed/state/comment";
import { queryKeys } from "@/lib/queryKeys";

export default function useHiddenFeed() {
  const queryClient = useQueryClient();
  const feedId = useRecoilValue(selectedFeedIdAtom);
  const commentId = useRecoilValue(selectedCommentIdAtom);

  const {
    data: hiddenFeed = [],
    loadMore,
    isFetching,
  } = useFeedHidden({ limit: 100 });

  const displaySuccessHandler = async (message: string) => {
    lightyToast.success(message);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.feed.mine() }),
      queryClient.invalidateQueries({ queryKey: queryKeys.feed.all() }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.feed.hidden(),
      }),
    ]);
  };

  const { mutate: displayFeed } = useDisplayFeed({
    feedId,
    onSuccess: displaySuccessHandler,
  });

  const { mutate: deleteComment } = useDeleteComment({
    commentId,
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.feed.comments(feedId),
      });
    },
  });

  const { mutate: reportComment } = useReport({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.feed.comments(feedId),
      });
    },
    onError: (e) => {
      lightyToast.error(e.message);
    },
  });

  return {
    feedId,
    hiddenFeed,
    loadMore,
    isFetching,
    displayFeed,
    deleteComment,
    reportComment,
  };
}
