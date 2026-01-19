import { atom } from "recoil";

export const scrollAtom = atom<boolean>({
  key: "scroll",
  default: true,
});

export const scrollProgressAtom = atom<number>({
  key: "scroll/nav/progress",
  default: 0,
});

export const isIntersectingAtom = atom<boolean>({
  key: "intersect",
  default: false,
});
