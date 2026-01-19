import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/imageUrl",
  default: "",
});

export const cardFrameAtom = atom<number>({
  key: "card/frame",
  default: 0,
});

export const cardSelectedFeedAtom = atom<string>({
  key: "card/feed",
  default: "",
});

export const decoBottomSheetStateAtom = atom<boolean>({
  key: "card/decorate",
  default: false,
});
