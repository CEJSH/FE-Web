import { atom } from "recoil";

export const bottomSheetStateAtom = atom<boolean>({
  key: "feed/commentBottomSheet",
  default: false,
});

export const selectedFeedIdAtom = atom<string>({
  key: "feed/selectedId/delete",
  default: "",
});
