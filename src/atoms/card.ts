import { Feed } from "@/models/feed";
import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/imageUrl",
  default: "",
});

export const cardFrameAtom = atom<number>({
  key: "card/frame",
  default: 0,
});

export const cardSelectedFeedAtom = atom<
  Partial<Feed> & { name: string; imageUrl: string; date: string }
>({
  key: "card/feed",
  default: {
    id: "",
    name: "",
    content: "",
    imageUrl: "",
    date: "",
  },
});

export const decoBottomSheetStateAtom = atom<boolean>({
  key: "card/decorate",
  default: false,
});
