import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import * as lighty from "lighty-type";
import CheckIcon from "../shared/Icon/CheckIcon";
import clsx from "clsx";
import LightyIcon from "../shared/Icon/LightyIcon";

interface Props {
  groupInfo?: lighty.Group;
  onClickGroup: () => void;
  clicked: boolean;
}

export default function SelectableGroupItem({
  groupInfo,
  onClickGroup,
  clicked,
}: Props) {
  return (
    <Flex
      direction="column"
      className={style.container}
      justify="space-between"
    >
      <div className={style.wrapper}>
        <div
          onClick={onClickGroup}
          className={clsx(
            clicked ? style.clickedCircleWrapper : style.circleWrapper
          )}
        >
          {!!groupInfo?.groupImageUrl ? (
            <Image
              alt="groupImage"
              src={groupInfo?.groupImageUrl ? groupInfo?.groupImageUrl : ""}
              className={clsx(clicked ? style.clickedImage : style.image)}
              width={clicked ? 56 : 56.8}
              height={clicked ? 56 : 56.8}
            />
          ) : (
            <div
              className={clsx(
                "rounded-full flex justify-center items-center bg-grayscale-100",
                clicked ? "w-14 h-14" : "w-[56.8px] h-[56.8px]"
              )}
            >
              <LightyIcon width="11" height="11" />
            </div>
          )}
          {clicked ? (
            <div className={style.checkContainer}>
              <CheckIcon width="28" height="28" />
            </div>
          ) : null}
        </div>
      </div>
      <Flex direction="column" align="center" className="w-[70px]">
        <Spacing size={2} />
        <span className="text-T6 truncate w-full text-center">
          {groupInfo?.name || "이름"}
        </span>
      </Flex>
    </Flex>
  );
}

const style = {
  container: "w-fit shrink-0 !w-[70px]",
  wrapper: "relative p-[6px] cursor-pointer !h-[68px]",

  circleWrapper: "relative rounded-full border-[1.2px] border-grayscale-100",
  clickedCircleWrapper: "relative rounded-full border-dashed border-[2px]",
  image: "rounded-full object-cover w-[56.8px] h-[56.8px]",
  clickedImage: "rounded-full object-cover w-14 h-14",
  checkContainer:
    "absolute inset-0 flex items-center justify-center rounded-full bg-[#00000066] p-[2px]",
};
