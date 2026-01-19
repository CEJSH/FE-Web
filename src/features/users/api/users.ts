import type * as lighty from "lighty-type";
import { apiClient } from "@/shared/api/api";

interface DeleteUserRequestBody {
  authorizationCode?: string;
}
/** 유저 검색 */
export async function getSearchUsers({
  name,
  accountId,
  limit,
  search,
}: {
  name: string;
  accountId: string;
  limit: number;
  search: string;
}) {
  const cursor = { name, accountId };
  const { data } = await apiClient.get<lighty.SearchUserResponse>(
    "/users/search",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
        search,
      },
    }
  );
  return data;
}

/** 회원 상세 조회 */
export async function getUserDetail() {
  const { data } = await apiClient.get<lighty.UserDetailResponse>("/users/my");
  return data;
}

/** 회원 프로필 조회 */
export async function getUserProfile() {
  const { data } = await apiClient.get<lighty.UserProfileResponse>(
    "/users/profile"
  );
  return data;
}

/** 아이디 중복 확인 */
export async function getIdAvailability({ accountId }: { accountId: string }) {
  const { data } = await apiClient.get(`/users/availability`, {
    params: { accountId },
  });
  return data;
}

/** 푸시 알림 토큰 업데이트 */
export async function patchNotificationToken(
  body: lighty.UpdateNotificationTokenRequest
) {
  await apiClient.patch("/users/notification-token", body);
}

export async function deleteUser(body?: DeleteUserRequestBody) {
  const { status } = await apiClient.delete("/users", {
    data: body?.authorizationCode ? body : undefined,
  });

  if (status === 204) {
    return "탈퇴 성공";
  }
}
