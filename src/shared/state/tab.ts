import { atom } from "recoil";

export const gatheringTabState = atom<"1" | "2">({
  key: "gathering/tab",
  default: "1",
});

export const invitationTabState = atom<"1" | "2">({
  key: "invitation/tab",
  default: "1",
});

export const feedTabState = atom<"1" | "2">({
  key: "feed/tab",
  default: "1",
});
