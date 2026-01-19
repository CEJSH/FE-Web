import type { QueryKey } from "@tanstack/react-query";

export type CursorId = { createdAt: string; id: string };

export type FriendRequestsParams = {
  name: string;
  accountId: string;
  limit: number;
};

export type SearchParams = {
  search: string;
};

export const queryKeys = {
  root: () => ["lighty"] as const,

  auth: {
    root: () => ["lighty", "auth"] as const,
    kakaoToken: (
      clientId?: string,
      redirectUri?: string,
      authCode?: string
    ) =>
      [
        "lighty",
        "auth",
        "kakaoToken",
        clientId ?? "",
        redirectUri ?? "",
        authCode ?? "",
      ] as const,
  },

  user: {
    root: () => ["lighty", "user"] as const,
    detail: () => ["lighty", "user", "detail"] as const,
    profile: () => ["lighty", "user", "profile"] as const,
    idAvailability: (accountId: string) =>
      ["lighty", "user", "idAvailability", accountId] as const,
    search: (search: string) => ["lighty", "user", "search", search] as const,
  },

  feed: {
    root: () => ["lighty", "feed"] as const,
    all: () => ["lighty", "feed", "all"] as const,
    mine: () => ["lighty", "feed", "mine"] as const,
    hidden: () => ["lighty", "feed", "hidden"] as const,
    detail: (feedId: string) => ["lighty", "feed", "detail", feedId] as const,
    comments: (feedId: string) =>
      ["lighty", "feed", "comments", feedId] as const,
  },

  notification: {
    root: () => ["lighty", "notification"] as const,
    list: () => ["lighty", "notification", "list"] as const,
  },

  gathering: {
    root: () => ["lighty", "gathering"] as const,
    list: (minDate: string, maxDate: string) =>
      ["lighty", "gathering", "list", minDate, maxDate] as const,
    all: () => ["lighty", "gathering", "all"] as const,
    ended: () => ["lighty", "gathering", "ended"] as const,
    noFeed: () => ["lighty", "gathering", "noFeed"] as const,
    detail: (gatheringId: string) =>
      ["lighty", "gathering", "detail", gatheringId] as const,
    invitations: {
      root: () => ["lighty", "gathering", "invitation"] as const,
      received: () =>
        ["lighty", "gathering", "invitation", "received"] as const,
      sent: () => ["lighty", "gathering", "invitation", "sent"] as const,
    },
  },

  group: {
    root: () => ["lighty", "group"] as const,
    list: () => ["lighty", "group", "list"] as const,
    detail: (groupId: string) => ["lighty", "group", "detail", groupId] as const,
    getOut: (groupId: string) => ["lighty", "group", "getOut", groupId] as const,
  },

  friends: {
    root: () => ["lighty", "friends"] as const,
    list: (userId: string) => ["lighty", "friends", "list", userId] as const,
    all: (userId: string) => ["lighty", "friends", "all", userId] as const,
    search: (search: string) => ["lighty", "friends", "search", search] as const,
    requests: {
      root: () => ["lighty", "friends", "requests"] as const,
      count: () => ["lighty", "friends", "requests", "count"] as const,
      sent: (params: FriendRequestsParams) =>
        ["lighty", "friends", "requests", "sent", params] as const,
      received: (params: FriendRequestsParams) =>
        ["lighty", "friends", "requests", "received", params] as const,
      sentAndReceived: (params: FriendRequestsParams) =>
        ["lighty", "friends", "requests", "sentAndReceived", params] as const,
    },
  },
} satisfies Record<string, unknown>;

export const asQueryKey = (key: QueryKey) => key;
