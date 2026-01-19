import { atom, selector } from "recoil";
export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friends/selectedTab",
  default: "1",
});

export const selectedFriendsAtom = atom<string[]>({
  key: "friends/selectedFriends",
  default: [],
});

export const selectedFriendIdsSelector = selector<string[] | null>({
  key: "friends/selectedIds",
  get: ({ get }) => {
    const selectedFriends = get(selectedFriendsAtom);

    if (selectedFriends.length === 0) {
      return null;
    }

    return selectedFriends;
  },
});

export const userSearchAtom = atom<string>({
  key: "friends/search/users",
  default: "",
});

export const friendSearchAtom = atom<string>({
  key: "friends/search/friends",
  default: "",
});

export const selectedFriendAtom = atom<string>({
  key: "friends/selectedFriend",
  default: "",
});
