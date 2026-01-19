import { apiClient } from "@/shared/api/api";
import type { FeedCommentResponse } from "lighty-type";
interface CommentResponse {
  message: string;
}

/** 피드 댓글 조회 */
export async function getFeedComments({ feedId }: { feedId: string }) {
  const { data } = await apiClient.get<FeedCommentResponse[]>(
    `feed-comments?feedId=${feedId}`
  );

  return data;
}

/** 피드 댓글 작성*/
export async function postMakeComment({
  feedId,
  content,
  mentionedUserId,
}: {
  feedId: string;
  content: string;
  mentionedUserId?: string;
}): Promise<CommentResponse | undefined> {
  if (!feedId || !content.trim()) {
    throw new Error("feedId와 content는 필수값입니다.");
  }
  await apiClient.post(`feed-comments`, {
    feedId,
    content,
    mentionedUserId,
  });

  return { message: "피드 댓글을 성공적으로 작성하였습니다" };
}

/** 댓글 삭제하기  */
export async function deleteFeedComment({ commentId }: { commentId: string }) {
  await apiClient.delete(`/feed-comments/${commentId}`);

  return { message: "댓글을 성공적으로 삭제하였습니다" };
}
