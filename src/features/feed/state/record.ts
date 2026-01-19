import { atom, selector } from "recoil";

export const recordGatheringAtom = atom<string>({
  key: "record/gathering",
  default: "",
});

export const friendToRecordAtom = atom<string>({
  key: "record/friends/search",
  default: "",
});

export const recordStepAtom = atom<number>({
  key: "record/step",
  default: 1,
});

export const friendsToShareAtom = atom<string[]>({
  key: "records/friends",
  default: [],
});

export const friendsToShareIdsSelector = selector<string[]>({
  key: "records/friends/ids",
  get: ({ get }) => {
    const friendsToShare = get(friendsToShareAtom);

    if (friendsToShare.length === 0) {
      return [];
    }

    return friendsToShare;
  },
});
