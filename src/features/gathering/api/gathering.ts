import type * as lighty from "lighty-type";

import { GatheringDetailResponse } from "@/models/gathering";
import { apiClient } from "@/shared/api/api";

interface DateIdCursor {
  createdAt: string;
  id: string;
}

type PaginationParams = {
  cursor: DateIdCursor | null;
  limit: number;
  minDate: string;
  maxDate: string;
};

/** 참여 약속 목록 조회 */
export async function getGatherings({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const { data } = await apiClient.get<lighty.GatheringListResponse>(
    "/gatherings",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
        minDate,
        maxDate,
      },
    }
  );
  return data;
}

/** 완료된 약속 목록 조회 */
export async function getGatheringsEnded({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const { data } = await apiClient.get<lighty.EndedGatheringsListResponse>(
    "/gatherings/ended",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
        minDate,
        maxDate,
      },
    }
  );
  return data;
}

/** 피드를 아직 작성하지 않은 약속 목록 조회 */
export async function getGatheringNoFeed({
  cursor,
  limit,
}: Partial<PaginationParams>) {
  const { data } = await apiClient.get<lighty.GatheringListResponse>(
    "/gatherings/no-feed",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
      },
    }
  );
  return data;
}

/** 모든 약속 목록 조회 */
export async function getGatheringAll({
  cursor,
  limit = 365,
  minDate,
  maxDate,
}: Partial<PaginationParams>) {
  const { data } = await apiClient.get<lighty.GatheringListResponse>(
    "/gatherings/all",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
        minDate,
        maxDate,
      },
    }
  );
  return data;
}

/** 약속 상세 조회 */
export async function getGatheringDetail({
  gatheringId,
}: {
  gatheringId: string;
}) {
  if (!gatheringId) return;

  const { data } = await apiClient.get<GatheringDetailResponse>(
    `/gatherings/${gatheringId}`
  );
  return data;
}

/** 약속 생성 */
export async function postGathering({
  gathering,
}: {
  gathering: lighty.CreateGatheringRequest;
}) {
  await apiClient.post("/gatherings", gathering);
  return { message: "초대장을 성공적으로 발송하였습니다" };
}

/** 약속 초대장 이미지 업로드 */
export async function postGatheringInvitationImage({ file }: { file: File }) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post(
    "/gatherings/invitation/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return { ...data, message: "이미지를 성공적으로 업로드하였습니다" };
}

/** 피드 수정 */
export async function patchGathering({
  gathering,
  gatheringId,
}: {
  gatheringId: string;
  gathering: Partial<lighty.CreateGatheringRequest>;
}) {
  await apiClient.patch(`/gatherings/${gatheringId}`, gathering);
  return { message: "약속 수정 완료" };
}

/** 약속 초대 수락 */
export async function postAcceptGatheringInvitation({
  invitationId,
  gatheringId,
}: {
  invitationId: string;
  gatheringId: string;
}) {
  await apiClient.post("/gatherings/accept", { invitationId, gatheringId });
  return { message: "약속을 수락하였습니다" };
}

/** 약속 초대 거절 */
export async function postRejectGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  await apiClient.post("/gatherings/reject", { invitationId });
  return { message: "약속을 성공적으로 거절하였습니다" };
}

/** 받은 약속 초대 목록 조회 */
export async function getReceivedInvitationToGatheringList({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const { data } =
    await apiClient.get<lighty.ReceivedGatheringInvitationListResponse>(
      "/gatherings/invitations/received",
      {
        params: {
          cursor: JSON.stringify(cursor),
          limit,
          minDate,
          maxDate,
        },
      }
    );
  return data;
}

/** 보낸 약속 초대 목록 조회 */
export async function getSentInvitationToGatheringList({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const { data } =
    await apiClient.get<lighty.SentGatheringInvitationListResponse>(
      "/gatherings/invitations/sent",
      {
        params: {
          cursor: JSON.stringify(cursor),
          limit,
          minDate,
          maxDate,
        },
      }
    );
  return data;
}

/** 모임 삭제 (약속장) */
export async function deleteGathering({
  gatheringId,
}: {
  gatheringId: string;
}) {
  await apiClient.delete(`/gatherings/${gatheringId}`);
  return {
    message: "약속을 성공적으로 삭제하였습니다",
  };
}
