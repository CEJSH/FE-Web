import Image from "next/image";
import Flex from "@/shared/components/Flex";
import { GroupInfoResponse } from "@/models/group";
import CheckIcon from "@/shared/components/Icon/CheckIcon";
import type * as lighty from "lighty-type";
import LightyIcon from "@/shared/components/Icon/LightyIcon";

interface Props {
  friendInfo?: lighty.User;
  groupInfo?: GroupInfoResponse;
}

export default function UnDeletableFriendItem({
  friendInfo,
  groupInfo,
}: Props) {
  return (
    <Flex direction="column" className={style.container}>
      <div className="relative p-[6px]">
        <div className={style.circleWrapper}>
          {!!friendInfo?.profileImageUrl || !!groupInfo?.imageUrl ? (
            <Image
              alt="friendProfile"
              src={
                (friendInfo?.profileImageUrl &&
                  `${friendInfo?.profileImageUrl}?w=${56}&q=${95}`) ||
                (groupInfo?.imageUrl &&
                  `${groupInfo?.imageUrl}?w=${56}&q=${95}`) ||
                ""
              }
              unoptimized={true}
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

const style = {
  container: "w-fit shrink-0 gap-[2px]",

  circleWrapper:
    "relative w-14 h-14 rounded-full border-dashed border-[2px] overflow-hidden",
  image: "rounded-full object-cover w-14 h-14",
  checkContainer:
    "absolute inset-0 flex items-center justify-center rounded-full bg-[#00000066] p-[2px]",

  text: "text-C5 text-grayscale-400 truncate",
};
