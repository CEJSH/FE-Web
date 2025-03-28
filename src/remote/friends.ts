import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";

/** 친구 요청 */
export async function postFriends({ userId }: { userId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends`;
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    console.log(response);
    return { message: "친구 신청이 완료되었어요!" };
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 친구 요청 */
export async function deleteFriend({ friendId }: { friendId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends?userId=${friendId}`;
    const response = await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });
    console.log(response);
    return { message: "친구를 삭제했어요" };
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/friends?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.FriendListResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 친구 요청 수락 */
export async function postAcceptFriend({ senderId }: { senderId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/friends/accept`;

  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId }),
    });
    console.log(response);
    return { message: "친구 수락이 완료되었어요!" };
  } catch (error) {
    console.log(error);
    throw new Error("친구 요청 수락에 실패하였습니다");
  }
}

/** 친구 요청 거절 */
export async function postRejectFriend({ senderId }: { senderId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends/reject`;

    await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId }),
    });

    return { message: "친구 요청을 거절했어요!" };
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/friends/requests/received?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: lighty.FriendRequestListResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/friends/requests/sent?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: lighty.FriendRequestListResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends/search?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}&search=${search}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });

    const data: lighty.FriendListResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("검색어는 2자 이상 20자 이하만 가능합니다");
    }
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 친구 요청 수 조회 */
export async function getFriendsRequestTotalCount() {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/friends/requests/count`;

  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: { count: number } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
