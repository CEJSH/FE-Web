import React from "react";
import type * as lighty from "lighty-type";
import Spacing from "@/shared/components/Spacing";
import UserListItem from "./UserListItem";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";

export type FriendRequestStatus = "SENT" | "RECEIVED" | "NONE";
type SearchedUser = lighty.User & { status: FriendRequestStatus };

export default function UserListContainer({
  isFetching,
  searchedUsers,
}: {
  isFetching: boolean;
  searchedUsers?: SearchedUser[];
}) {
  const { isReactNativeWebView } = useReactNativeWebView();

  if (searchedUsers) {
    return (
      <div
        className="min-h-[calc(100dvh-142px)] pt-[142px] px-5 overflow-y-scroll no-scrollbar"
        style={
          isReactNativeWebView
            ? { paddingTop: "calc(env(safe-area-inset-top) + 142px)" }
            : {}
        }
      >
        <ul>
          {searchedUsers?.map((friendItem, idx) => {
            return (
              <React.Fragment key={`${friendItem.accountId}`}>
                <UserListItem userInfo={friendItem} idx={idx} />
                <Spacing size={16} />
              </React.Fragment>
            );
          })}
          {isFetching && <DotSpinnerSmall />}
        </ul>
      </div>
    );
  } else return null;
}
