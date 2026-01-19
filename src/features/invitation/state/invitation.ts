import { atom } from "recoil";

export const selectedInvitationIdAtom = atom<string | null>({
  key: "invitation/selectedInvitationId",
  default: null,
});
