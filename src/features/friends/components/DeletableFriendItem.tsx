import Image from "next/image";
import Flex from "@/shared/components/Flex";
import { GroupInfoResponse } from "@/models/group";
import CloseIcon from "@/shared/components/Icon/CloseIcon";
import CheckIcon from "@/shared/components/Icon/CheckIcon";
import type * as lighty from "lighty-type";
import LightyIcon from "@/shared/components/Icon/LightyIcon";

interface Props {
  friendInfo?: lighty.User;
  groupInfo?: GroupInfoResponse;
  onClickDelete: () => void;
}

export default function DeletableFriendItem({
  friendInfo,
  groupInfo,
  onClickDelete,
}: Props) {
  const deleteTargetName =
    friendInfo?.name ?? groupInfo?.groupName ?? friendInfo?.accountId ?? "친구";

  return (
    <Flex direction="column" className={style.container}>
      <div className="relative p-[6px]">
        <div className={style.circleWrapper}>
          {!!friendInfo?.profileImageUrl || !!groupInfo?.imageUrl ? (
            <Image
              alt="friendProfile"
              src={friendInfo?.profileImageUrl || groupInfo?.imageUrl || ""}
              className={style.image}
              width={56}
              height={56}
            />
          ) : (
            <div className="rounded-full w-14 h-14 flex justify-center items-center bg-grayscale-100">
              <LightyIcon width="11" height="11" />
            </div>
          )}
          <div className={style.checkContainer}>
            <CheckIcon width="28" height="28" />
          </div>
        </div>
        <DeleteButton
          ariaLabel={`${deleteTargetName} 삭제`}
          onClick={onClickDelete}
        />
      </div>
      <Flex direction="column" align="center">
        <span className="text-T6">
          {friendInfo?.name || groupInfo?.groupName || "이름"}
        </span>
        <span className={style.text}>
          {friendInfo?.accountId || groupInfo?.description || "아이디"}
        </span>
      </Flex>
    </Flex>
  );
}

function DeleteButton({
  onClick,
  ariaLabel,
}: {
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={style.btnContainer}
      onClick={onClick}
    >
      <CloseIcon width="13.33" height="13.33" />
    </button>
  );
}

const style = {
  container: "w-fit shrink-0 gap-[2px]",

  circleWrapper:
    "relative w-14 h-14 rounded-full border-dashed border-[2px] overflow-hidden",
  image: "rounded-full object-cover w-14 h-14",
  checkContainer:
    "absolute inset-0 flex items-center justify-center rounded-full bg-[#00000066] p-[2px]",
  btnContainer:
    "absolute top-[2px] right-[2px] cursor-pointer p-[3.33px] rounded-full bg-grayscale-300 w-[20px] h-[20px]",

  text: "text-C5 text-grayscale-400 truncate",
};
