import { atom } from "recoil";
import { CreateGroupRequest } from "@/models/group";

export const newGroupAtom = atom<CreateGroupRequest>({
  key: "group/new",
  default: {
    name: "",
    description: "",
    friendIds: null,
    groupImageUrl: "",
  },
});
