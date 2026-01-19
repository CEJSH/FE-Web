import { useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";

import useNotification from "@/features/notice/components/hooks/useNotification";
import useReport from "@/features/report/components/hooks/useReport";

import { selectedFeedIdAtom } from "@/features/feed/state/feed";
import { selectedCommentIdAtom } from "@/features/feed/state/comment";
import { reportInfoAtom } from "@/shared/state/modal";

import { useAuth } from "@/shared/components/providers/AuthProvider";
import { minDate, maxDate } from "@/shared/constants/time";
import useFeedAll from "@/features/feed/components/hooks/useFeedAll";
import useFeedMine from "@/features/feed/components/hooks/useFeedMine";
import useDeleteFeed from "@/features/feed/components/hooks/useDeleteFeed";
import useDeleteComment from "@/features/feed/components/hooks/useDeleteComment";
import useHideFeed from "@/features/feed/components/hooks/useHideFeed";

import { errorToast, handleRefresh } from "@/shared/utils/feedUtils";

import {
  handleDeleteCommentSuccess,
  handleDeleteFeedSuccess,
  handleHideFeedSuccess,
  handleReportSuccess,
} from "@/shared/utils/feedHandlers";
import { queryKeys } from "@/lib/queryKeys";

export default function useFeed() {
  const resetReportInfo = useResetRecoilState(reportInfoAtom);
  const [feedId, setFeedId] = useRecoilState(selectedFeedIdAtom);
  const commentId = useRecoilValue(selectedCommentIdAtom);
  const { userInfo, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const queryParams = useMemo(
    () => ({
      order: "DESC" as const,
      minDate: minDate(),
      maxDate: maxDate(),
      limit: 8,
    }),
    []
  );

  // Feed 데이터
  const {
    data: feedAll,
    loadMore,
    isFetching,
  } = useFeedAll({ ...queryParams, enabled: !!isAuthenticated });
  const {
    data: feedMine,
    loadMore: loadMoreMine,
    isFetching: isFetchingMine,
  } = useFeedMine({
    ...queryParams,
    enabled: !!isAuthenticated,
  });

  // Notifications
  const { data: notifications = [] } = useNotification();
  const isNewNotification = notifications.filter((n) => n.readAt == null);
  const mailCount = isNewNotification.filter(
    (n) => n.type === "GATHERING_INVITATION_RECEIVED"
  );

  // Mutations
  const { mutate: deleteFeed } = useDeleteFeed({
    feedId,
    onSuccess: handleDeleteFeedSuccess(queryClient),
  });
  const { mutate: deleteComment } = useDeleteComment({
    commentId,
    onSuccess: handleDeleteCommentSuccess(queryClient, feedId),
  });
  const { mutate: hideFeed } = useHideFeed({
    feedId,
    onSuccess: handleHideFeedSuccess(queryClient),
    onError: () => errorToast("피드를 숨기지 못했어요"),
  });

  const { mutate: report } = useReport({
    onSuccess: () => handleReportSuccess(queryClient, resetReportInfo, feedId),
    onError: () => errorToast("신고 실패"),
  });

  return {
    feedId,
    setFeedId,

    feedAll,
    feedMine,

    isFetching,
    isFetchingMine,

    loadMore,
    loadMoreMine,

    handleRefreshAll: () => handleRefresh(queryClient, queryKeys.feed.all()),
    handleRefreshMine: () => handleRefresh(queryClient, queryKeys.feed.mine()),

    deleteFeed,
    deleteComment,
    hideFeed,
    report,

    notifications,
    isNewNotification,
    mailCount,

    userInfo,
  };
}
