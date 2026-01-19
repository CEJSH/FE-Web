import type * as lighty from "lighty-type";
import { apiClient } from "@/shared/api/api";
import { FeedResponse } from "@/models/feed";

// 응답 타입 정의
export type FeedSuccessResponse = {
  message: string;
};

/** 모든 피드 목록 조회 */
export async function getFeedAll({
  order,
  minDate,
  maxDate,
  limit,
  cursor,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
  cursor: { createdAt: string; id: string };
}) {
  const response = await apiClient.get<FeedResponse>("/feeds", {
    params: {
      order,
      minDate,
      maxDate,
      cursor: JSON.stringify(cursor),
      limit,
    },
  });
  return response.data;
}

/** 자신이 작성한 피드 목록 조회 */
export async function getFeedMine({
  cursor,
  order,
  minDate,
  maxDate,
  limit,
}: {
  cursor: { createdAt: string; id: string };
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
}) {
  const response = await apiClient.get<FeedResponse>("/feeds/my", {
    params: {
      order,
      minDate,
      maxDate,
      cursor: JSON.stringify(cursor),
      limit,
    },
  });
  return response.data;
}

/** 숨긴 피드 조회 */
export async function getFeedHidden({
  cursor,
  limit,
}: {
  cursor: { createdAt: string; id: string };
  limit: number;
}) {
  const response = await apiClient.get<FeedResponse>("/feeds/blocked", {
    params: {
      cursor: JSON.stringify(cursor),
      limit,
    },
  });
  return response.data;
}

/** 약속 피드 사진 업로드 생성 */
export async function uploadFeedImages({ files }: { files: File[] }) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const { data } = await apiClient.post<lighty.UploadImageListResponse>(
    "/feeds/images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return { ...data, message: "이미지를 성공적으로 업로드하였습니다." };
}

/** 약속 피드 생성 */
export async function postGatheringFeed({
  gatheringFeed,
}: {
  gatheringFeed: lighty.CreateGatheringFeedRequest;
}): Promise<{ message: string }> {
  await apiClient.post("/feeds/gatherings", gatheringFeed);
  return { message: "약속 피드 작성 완료" };
}

/** 친구 피드 생성 */
export async function postFriendsFeed({
  friendsFeed,
}: {
  friendsFeed: lighty.CreateFriendFeedRequest;
}): Promise<{ message: string }> {
  await apiClient.post("/feeds/friends", friendsFeed);
  return { message: "친구 피드 작성 완료" };
}

/** 피드 수정 */
export async function patchFeed({
  content,
  feedId,
}: {
  content: string;
  feedId: string;
}) {
  await apiClient.patch(`/feeds/${feedId}`, { content });
  return { message: "피드 수정 완료" };
}

/** 피드 삭제 */
export async function deleteFeed({ feedId }: { feedId: string }) {
  await apiClient.delete(`/feeds/${feedId}`);
  return { message: "피드를 성공적으로 삭제하였습니다" };
}

/** 피드 숨김 */
export async function hideFeed({ feedId }: { feedId: string }) {
  await apiClient.post(`/feeds/${feedId}/block`);
  return { message: "피드를 성공적으로 숨겼어요" };
}

/** 피드 숨김 해제 */
export async function displayFeed({ feedId }: { feedId: string }) {
  await apiClient.delete(`/feeds/${feedId}/block`);
  return { message: "피드 숨김을 해제했어요" };
}

/** 피드 상세 조회 */
export async function getFeedDetail({ feedId }: { feedId: string }) {
  if (!feedId) return;

  const { data } = await apiClient.get(`/feeds/${feedId}`);
  return data;
}
