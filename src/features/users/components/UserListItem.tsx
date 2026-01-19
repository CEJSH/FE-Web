import React from "react";
import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";
import clsx from "clsx";
import Button from "@/shared/components/Button/Button";
import type * as lighty from "lighty-type";
import useRequestFriend from "@/features/friends/components/hooks/useRequestFriend";
import { useQueryClient } from "@tanstack/react-query";
import { userSearchAtom } from "@/features/friends/state/friends";
import { useRecoilValue } from "recoil";
import useDebounce from "@/shared/hooks/debounce";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import { lightyToast } from "@/shared/utils/toast";
import { FriendRequestStatus } from "./UserListContainer";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { queryKeys } from "@/lib/queryKeys";

export default function UserListItem({
  userInfo,
  idx,
  clicked,
}: {
  userInfo: lighty.User & { status: FriendRequestStatus };
  idx: number;
  clicked?: boolean;
}) {
  const queryClient = useQueryClient();
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);

  const { mutate, isPending } = useRequestFriend({
    userId: userInfo?.id,
    onSuccess: async (data: { message: string }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.search(debouncedSearch),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.friends.requests.root(),
        }),
      ]);

      lightyToast.success(data.message);
    },
  });
  return (
    <li
      key={`friend${idx}`}
      className={clsx(
        styles.li,
        clicked ? "border-grayscale-900" : "border-base-white"
      )}
    >
      {!!userInfo?.profileImageUrl ? (
        <OptimizedImage
          alt="friendProfile"
          src={userInfo?.profileImageUrl ? userInfo.profileImageUrl : ""}
          width={36}
          height={36}
          className={styles.img}
        />
      ) : (
        <div className="rounded-full h-9 w-9 flex justify-center items-center bg-grayscale-100">
          <LightyIcon width="11" height="11" />
        </div>
      )}
      <Spacing direction="horizontal" size={8} />
      <Flex className="flex-grow gap-[2px]" direction="column">
        <span className="text-T6">{userInfo?.accountId || "회원아이디"}</span>
        <span className={styles.name}>{userInfo?.name || "이름"}</span>
      </Flex>
      <Button
        className={clsx(
          styles.inviteBtn,
          userInfo.status === "SENT" || userInfo.status === "RECEIVED"
            ? "!bg-grayscale-50 text-grayscale-400 cursor-none border-none"
            : ""
        )}
        disabled={userInfo.status === "SENT"}
        onClick={mutate}
      >
        {isPending ? <DotSpinnerSmall /> : "친구 신청"}
      </Button>
    </li>
  );
}

const styles = {
  iconContainer: "flex justify-center items-center w-5 h-5",

  li: "bg-base-white flex py-[14px] px-4 rounded-[20px] items-center cursor-pointer border",

  img: "rounded-full object-cover h-9 w-9",
  name: "text-C2 text-grayscale-400",
  inviteBtn:
    "text-C2 py-2 px-3 rounded-lg border border-grayscale-100 active:!bg-grayscale-10",

  acceptBtn:
    "flex items-center px-3 py-2 rounded-lg bg-grayscale-900 text-base-white text-C2 h-fit",

  rejectBtn:
    "flex items-center px-3 py-2 rounded-lg bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px]",
};
