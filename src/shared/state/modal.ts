import { ModalType, ReportModalType } from "@/models/modal";
import { atom } from "recoil";
import { ReportContentTypes } from "@/features/report/components/hooks/useReport";

export const modalStateAtom = atom<{ type: ModalType | null; isOpen: boolean }>(
  {
    key: "modal",
    default: {
      type: null,
      isOpen: false,
    },
  }
);

export const recordModalAtom = atom<boolean>({
  key: "modal/record",
  default: false,
});

export const reportModalAtom = atom<{
  type: ReportModalType | null;
  isOpen: boolean;
}>({
  key: "modal/report",
  default: {
    type: null,
    isOpen: false,
  },
});

export const reportInfoAtom = atom<ReportContentTypes>({
  key: "modal/info",
  default: {
    type: "FEED",
    reason: "",
    reportedId: "",
  },
});
