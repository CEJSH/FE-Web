import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import PlusIcon from "@/shared/components/Icon/PlusIcon";
import { GroupInfoResponse } from "@/models/group";
import type * as lighty from "lighty-type";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import OptimizedImage from "@/shared/components/OptimizedImage";

export default function FriendItem({
  friendInfo,
  groupInfo,
}: {
  friendInfo?: lighty.User;
  groupInfo?: GroupInfoResponse;
}) {
  return (
    <Flex
      direction="column"
      style={{ width: "fit-content", flexShrink: 0, gap: "2px" }}
    >
      <div className="p-[6px] w-14 h-14 box-content">
        {!!friendInfo?.profileImageUrl || !!groupInfo?.imageUrl ? (
          <OptimizedImage
            alt="friendImage"
            src={friendInfo?.profileImageUrl || groupInfo?.imageUrl || ""}
            className="rounded-full object-cover w-14 h-14 border-[1.2px] border-grayscale-100"
            width={56}
            height={56}
          />
        ) : (
          <div className="rounded-full w-14 h-14 border-[1.2px] flex justify-center items-center bg-grayscale-100">
            <LightyIcon width="11" height="11" />
          </div>
        )}
      </div>
      <Flex direction="column" align="center">
        <span className="text-T6">
          {friendInfo?.name || groupInfo?.groupName || "이름"}
        </span>
        <span className="text-C5 text-grayscale-400 truncate">
          {friendInfo?.accountId || groupInfo?.description || "아이디"}
        </span>
      </Flex>
    </Flex>
  );
}

export function AddFriendItem({ onClick }: { onClick?: () => void }) {
  const onClickHandler = () => {
    if (onClick) {
      onClick();
    } else return;
  };
  return (
    <Flex direction="column" style={{ width: "fit-content", flexShrink: 0 }}>
      <button
        type="button"
        aria-label="친구 추가"
        className="p-[6px] bg-transparent border-0"
        onClick={onClickHandler}
      >
        <div className={iconWrapperStyle}>
          <PlusIcon
            width="20"
            height="20"
            color="#0A0A0A"
            className="absolute left-[17.5px] top-[17px]"
          />
        </div>
      </button>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">친구 추가</span>
        <span className="text-C5 text-grayscale-400 hidden">ㅇㅇㅇ</span>
      </Flex>
    </Flex>
  );
}

export function SeeMoreItem({ onClick }: { onClick: () => void }) {
  return (
    <Flex direction="column" style={{ width: "fit-content", flexShrink: 0 }}>
      <button
        type="button"
        aria-label="더 보기"
        className="p-[6px] bg-transparent border-0"
        onClick={onClick}
      >
        <div className={iconWrapperStyle}>
          <PlusIcon
            width="20"
            height="20"
            color="#0A0A0A"
            className="absolute left-[17.5px] top-[17px]"
          />
        </div>
      </button>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">더 보기</span>
        <span className="text-C5 text-grayscale-400 hidden">ㅇㅇㅇ</span>
      </Flex>
    </Flex>
  );
}

const iconWrapperStyle =
  "relative rounded-full w-14 h-14 border-[1.2px] border-[#E9E9E9] cursor-pointer";
