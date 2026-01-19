import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import type * as lighty from "lighty-type";
import GroupMemberImages from "@/shared/components/GroupMemberImages";
import { Feed } from "@/models/feed";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import { Lighty } from "@/shared/constants/images";
import clsx from "clsx";
import { forwardRef, MouseEvent } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";

interface InfoBarProps {
  withMembers: lighty.User[];
  feed: Feed;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
interface FriendInfo {
  name: string;
  imageUrl: string | null;
}

const InfoBar = forwardRef<HTMLButtonElement, InfoBarProps>(
  ({ withMembers, feed, onClick }, ref) => {
    const friendInfo = withMembers?.map((other) => ({
      name: other.name,
      imageUrl: other.profileImageUrl,
    }));

    const memberImageUrls = friendInfo?.map((info) => info.imageUrl);
    return (
      <div className={styles.infoBarWrapper}>
        <WriterInfo writer={feed.writer} />
        <div style={{ flexGrow: 1 }} />
        {friendInfo && friendInfo.length > 0 && (
          <button
            type="button"
            onClick={onClick}
            ref={ref}
            aria-label="함께한 친구 목록 보기"
            className={clsx(
              styles.friendInfoWrapper,
              styles.friendInfoInteractive,
              "border-0"
            )}
          >
            <span className="text-C2">with</span>
            {withMembers.length > 0 && (
              <GroupMemberImages
                gap={8}
                members={withMembers}
                memberImageUrls={memberImageUrls}
              />
            )}
          </button>
        )}
        <Spacing direction="horizontal" size={12} />
        <div className="w-6 h-6" />
      </div>
    );
  }
);

InfoBar.displayName = "InfoBar";

export default InfoBar;

function WriterInfo({ writer }: { writer: lighty.User }) {
  return (
    <Flex className="gap-[6px]">
      {!!writer.profileImageUrl ? (
        <OptimizedImage
          loading="eager"
          src={writer.profileImageUrl}
          width={36}
          height={36}
          className="w-9 h-9 object-cover rounded-full overflow-hidden"
          alt="writer"
        />
      ) : (
        <div className="flex justify-center items-center w-9 h-9 rounded-full bg-grayscale-100">
          <LightyIcon width="4" height="4" />
        </div>
      )}
      <Flex style={{ width: "full", gap: "2px" }} direction="column">
        <div className="text-T5 flex-none">{writer.name}</div>
        <div className="text-C2 text-grayscale-400">{writer.accountId}</div>
      </Flex>
    </Flex>
  );
}

export function TogetherInfo({
  members,
  friendInfo,
  onClick,
}: {
  members?: lighty.User[];
  friendInfo?: FriendInfo[];
  onClick?: () => void;
}) {
  if (!members && !friendInfo) return;
  const memberImageUrls = friendInfo?.map((info) => info.imageUrl);
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="함께한 친구 목록 보기"
        className={clsx(
          styles.friendInfoWrapper,
          styles.friendInfoInteractive,
          "border-0"
        )}
      >
        <span className="text-C2">with</span>
        <GroupMemberImages
          gap={8}
          members={members}
          memberImageUrls={memberImageUrls}
        />
      </button>
    );
  }

  return (
    <div className={styles.friendInfoWrapper}>
      <span className="text-C2">with</span>
      <GroupMemberImages
        gap={8}
        members={members}
        memberImageUrls={memberImageUrls}
      />
    </div>
  );
}

export function FriendsInfoContainer({
  withMembers,
  isOpen,
}: {
  withMembers: lighty.User[];
  isOpen: boolean;
}) {
  const friendInfo = withMembers.map((other) => ({
    name: other.name,
    imageUrl: other.profileImageUrl,
  }));
  return (
    <Flex
      className={clsx(
        isOpen == true ? "animate-selectOpen" : "animate-selectClose",
        styles.friendsContainer
      )}
      direction="column"
    >
      {friendInfo.map((info, i) => (
        <Flex align="center" className="gap-[2px]" key={info.name}>
          <OptimizedImage
            loading="eager"
            alt={`friend${i}`}
            width={24}
            height={24}
            src={info.imageUrl ? info.imageUrl : Lighty}
            className="w-6 h-6 object-cover rounded-full border-[0.86px] border-base-white "
          />
          <span className="flex-none text-C2 text-grayscale-600">
            {info.name}
          </span>
        </Flex>
      ))}
    </Flex>
  );
}

const styles = {
  infoBarWrapper: "relative flex items-center px-5",
  friendInfoWrapper:
    "flex items-center rounded-[90px] bg-[#F4F4F4] py-[6px] px-[10px] gap-1",
  friendInfoInteractive: "cursor-pointer active:bg-grayscale-200",
  friendsContainer:
    "bg-base-white z-30 absolute right-0 mt-[5px] rounded-xl w-[117px] py-[14px] pl-[16px] pr-11 gap-3 border border-grayscale-100 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.12)]",
};
