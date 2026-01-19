import { atom } from "recoil";

export const selectedCommentIdAtom = atom<string>({
  key: "selected/comment/toDelete",
  default: "",
});
