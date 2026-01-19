import { atom } from "recoil";

export const homeModalStateAtom = atom<boolean>({
  key: "home/modal",
  default: false,
});
