import type * as lighty from "lighty-type";
import { apiClient } from "@/shared/api/api";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";

export async function postGroupCoverImage({ file }: { file: File }) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<{ imageUrl: string }>(
    "/groups/cover/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    url: data.imageUrl,
    message: "그룹이미지를 성공적으로 업로드하였습니다",
  };
}

/** 그룹 생성 */
export async function postGroup({ group }: { group: CreateGroupRequest }) {
  await apiClient.post("/groups", group);
  return { message: "그룹을 성공적으로 만들었어요" };
}

/** 참여 그룹 목록 조회 */
export async function getGroups({
  cursor,
  limit,
}: {
  cursor: string | null;
  limit: number;
}) {
  const { data } = await apiClient.get<lighty.GroupListResponse>("/groups", {
    params: {
      cursor,
      limit,
    },
  });
  return data;
}

/** 그룹원 추가 */
export async function postGroupMember({
  groupId,
  userIds,
}: {
  groupId: string;
  userIds: string[] | null;
}) {
  await apiClient.post(`/groups/${groupId}/members`, {
    userIds,
  });
  return { message: "그룹원을 성공적으로 추가하였습니다" };
}

/** 그룹 나가기 */
export async function deleteGroupMember({ groupId }: { groupId: string }) {
  await apiClient.delete(`/groups/${groupId}/members`);
  return { message: "그룹에서 성공적으로 나갔습니다" };
}

/** 그룹 삭제 (그룹장) */
export async function deleteGroup({ groupId }: { groupId: string }) {
  await apiClient.delete(`/groups/${groupId}`);
  return {
    message: "그룹을 성공적으로 삭제하였습니다",
  };
}

/** 그룹 나가기 (그룹원) */
export async function exitGroup({ groupId }: { groupId: string }) {
  await apiClient.delete(`/groups/${groupId}/members`);
  return {
    message: "그룹을 성공적으로 나갔습니다",
  };
}

/** 그룹 수정 */
export async function updateGroup({
  group,
  groupId,
}: {
  group: Omit<UpdateGroupRequest, "groupId">;
  groupId: string;
}) {
  await apiClient.patch(`/groups/${groupId}`, group);
  return { message: "그룹 수정 완료" };
}

/** 그룹 상세 조회 */
export const getGroup = async (id: string) => {
  const { data } = await apiClient.get<lighty.GroupDetailResponse>(
    `/groups/${id}`
  );
  return data;
};
