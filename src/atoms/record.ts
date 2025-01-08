import { RecordValues } from "@/models/record";
import { atom } from "recoil";

export const recordGatheringAtom = atom<string>({
  key: "record/gathering",
  default: "0",
});

export const recordGatheringFormValues = atom<RecordValues>({
  key: "record/gatheringFormValues",
  default: {
    accountId: "",
    gatheringId: "",
    recordedAt: "",
    recordContent: "",
    imageUrl: [""],
  },
});

export const recordModalStateAtom = atom<boolean>({
  key: "record/modal",
  default: false,
});
