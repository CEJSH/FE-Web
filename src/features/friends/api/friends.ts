import type * as lighty from "lighty-type";
import { apiClient } from "@/shared/api/api";

/** 친구 요청 */
export async function postFriends({ userId }: { userId: string }) {
  await apiClient.post("/friends", { userId });
  return { message: "친구 신청이 완료되었어요!" };
}

/** 친구 삭제 */
export async function deleteFriend({ friendId }: { friendId: string }) {
  await apiClient.delete("/friends", {
    params: { userId: friendId },
  });
  return { message: "친구를 삭제했어요" };
}

/** 친구 목록 조회 */
export async function getFriends({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  const cursor = { name, accountId };

  const { data } = await apiClient.get<lighty.FriendListResponse>("/friends", {
    params: {
      cursor: JSON.stringify(cursor),
      limit,
    },
  });
  return data;
}

/** 친구 요청 수락 */
export async function postAcceptFriend({ senderId }: { senderId: string }) {
  await apiClient.post("/friends/accept", { senderId });

  return { message: "친구 수락이 완료되었어요!" };
}

/** 친구 요청 거절 */
export async function postRejectFriend({ senderId }: { senderId: string }) {
  await apiClient.post("/friends/reject", { senderId });
  return { message: "친구 요청을 거절했어요!" };
}

/** 받은 친구 요청 목록 조회 */
export async function getReceivedFriendRequestsList({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  const cursor = { name, accountId };

  const { data } = await apiClient.get<lighty.FriendRequestListResponse>(
    "/friends/requests/received",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
      },
    }
  );
  return data;
}

/** 보낸 친구 요청 목록 조회 */
export async function getSentFriendRequestsList({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  const cursor = { name, accountId };

  const { data } = await apiClient.get<lighty.FriendRequestListResponse>(
    "/friends/requests/sent",
    {
      params: {
        cursor: JSON.stringify(cursor),
        limit,
      },
    }
  );
  return data;
}

/** 친구 검색 */
export async function getSearchFriends({
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

  const { data } = await apiClient.get<lighty.FriendListResponse>(
    "/friends/search",
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

/** 친구 요청 수 조회 */
export async function getFriendsRequestTotalCount() {
  const { data } = await apiClient.get<{ count: number }>(
    "/friends/requests/count"
  );
  return data;
}
