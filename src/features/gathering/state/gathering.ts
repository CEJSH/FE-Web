import type * as lighty from "lighty-type";
import { atom } from "recoil";

export const gatheringModalStateAtom = atom<boolean>({
  key: "gathering/modal",
  default: false,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const gatheringSelectedDateAtom = atom<Value>({
  key: "gathering/selectedDate",
  default: new Date(),
});

export const newGatheringInfo = atom<lighty.CreateGatheringRequest>({
  key: "gathering/gatheringInfo",
  default: {
    type: "GROUP",
    name: "",
    description: "",
    groupId: null,
    friendIds: null,
    gatheringDate: "",
    address: "",
    invitationImageUrl: "",
  },
});

export const gatheringImageUrlAtom = atom<string>({
  key: "gathering/invitationImageUrl",
  default: "",
});
