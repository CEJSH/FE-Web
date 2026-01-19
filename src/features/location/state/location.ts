import { atom } from "recoil";

export const locationStatusAtom = atom<number>({
  key: "locationStatus",
  default: 0,
});
