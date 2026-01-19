import { useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import clsx from "clsx";

import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";
import Button from "@/shared/components/Button/Button";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import OptimizedImage from "@/shared/components/OptimizedImage";
import FriendOption from "@/shared/components/FriendOption";

import type * as lighty from "lighty-type";
import { selectedFriendAtom } from "@/features/friends/state/friends";
import { lightyToast } from "@/shared/utils/toast";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import useAcceptFriendRequest from "./hooks/useAcceptFriendRequest";
import useRejectFriendRequest from "./hooks/useRejectFriendRequest";
import { queryKeys } from "@/lib/queryKeys";

interface FriendListItemProps {
  senderId?: string;
  friendInfo: lighty.User;
  type: "friend" | "receivedRequest" | "sentRequest" | "select";
  idx?: number;
  onClick?: () => void;
  clicked?: boolean;
}

export default function FriendListItem({
  senderId = "",
  friendInfo,
  type,
  idx,
  onClick,
  clicked,
}: FriendListItemProps) {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const setSelectedFriend = useSetRecoilState(selectedFriendAtom);

  const invalidateFriendQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.requests.root(),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.list(userInfo?.accountId ?? ""),
      }),
    ]);
  };

  const { mutate: accept, isPending } = useAcceptFriendRequest({
    senderId,
    onSuccess: async (data) => {
      lightyToast.success(data.message);
      await invalidateFriendQueries();
    },
  });

  const { mutate: reject } = useRejectFriendRequest({
    senderId,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.requests.root(),
      }),
  });

  const renderProfileImage = () =>
    friendInfo?.profileImageUrl ? (
      <OptimizedImage
        loading="eager"
        alt="friendProfile"
        src={friendInfo.profileImageUrl}
        width={36}
        height={36}
        className={styles.img}
      />
    ) : (
      <div className="rounded-full w-9 h-9 flex justify-center items-center bg-grayscale-100">
        <LightyIcon width="11" height="11" />
      </div>
    );

  const renderActionButtons = () => {
    switch (type) {
      case "friend":
        return (
          <FriendOption onClick={() => setSelectedFriend(friendInfo.id)} />
        );
      case "receivedRequest":
        return (
          <Flex>
            <Button className={styles.acceptBtn} onClick={accept}>
              {isPending ? <DotSpinner /> : "수락"}
            </Button>
            <Spacing size={12} direction="horizontal" />
            <Button className={styles.rejectBtn} onClick={reject}>
              거절
            </Button>
          </Flex>
        );
      case "sentRequest":
        return (
          <Button className={styles.rejectBtn} onClick={reject}>
            {isPending ? <DotSpinner /> : "취소"}
          </Button>
        );
      case "select":
        return (
          <Button className={styles.selectBtn} onClick={onClick}>
            선택
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <li
      key={`friend${idx}`}
      className={clsx(
        styles.li,
        clicked ? "border-grayscale-900" : "border-grayscale-100"
      )}
      onClick={onClick}
    >
      <Flex>
        {renderProfileImage()}
        <Spacing direction="horizontal" size={8} />
        <Flex direction="column">
          <span className="text-T6">{friendInfo?.accountId || "lighty"}</span>
          <Spacing size={2} />
          <span className={styles.name}>{friendInfo?.name || "김땡땡"}</span>
        </Flex>
      </Flex>
      {renderActionButtons()}
    </li>
  );
}

const styles = {
  li: `
    bg-base-white flex py-[14px] !px-4 rounded-[20px] 
    items-center justify-between border cursor-pointer
    transition-colors duration-300 ease-in-out
  `,
  img: "rounded-full object-cover h-9 w-9",
  name: "text-C2 text-grayscale-400",
  selectBtn:
    "w-fit flex-none items-center px-3 py-2 rounded-lg bg-base-white text-grayscale-900 border-[1px] border-grayscale-100 text-C2 h-fit cursor-pointer",
  acceptBtn:
    "flex items-center px-3 py-2 rounded-lg bg-grayscale-900 text-base-white text-C2 h-fit flex-none",
  rejectBtn:
    "flex items-center px-3 py-2 rounded-lg bg-base-white border-[1px] border-grayscale-100 text-C2 max-h-[30px] active:bg-grayscale-10 flex-none",
};
