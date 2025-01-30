import Image from "next/image";
import Flex from "./Flex";
import clsx from "clsx";
import * as lighty from "lighty-type";

const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

export default function GroupMemberImages({
  members,
  memberImageUrls,
  maxLength = 3,
  width,
  height,
  gap,
}: {
  members?: lighty.User[];
  memberImageUrls?: (string | null)[];
  maxLength?: number;
  width?: number;
  height?: number;
  gap?: number;
}) {
  const memberImages =
    members != null
      ? (members.map((member) => member.profileImageUrl) as string[])
      : memberImageUrls!;

  const seenImages = !memberImages
    ? null
    : memberImages.length <= maxLength
    ? memberImages
    : memberImages.slice(0, maxLength);

  const imageWidthHeight =
    width && height ? `w-[${width}px] h-[${height}px]` : `w-[28px] h-[28px]`;

  return (
    <Flex>
      {seenImages?.map((imageUrl, i) => (
        <div
          key={`group${i}`}
          style={{
            width: width ? width : 28,
            height: height ? height : 28,
          }}
        >
          <Image
            layout="intrinsic"
            style={{ marginLeft: i !== 0 ? `-${gap}px` : 0 }}
            src={imageUrl || DEFAULT_IMAGE}
            width={width ? width : 28}
            height={height ? height : 28}
            className={clsx(styles.groupImage, imageWidthHeight)}
            alt={`writer${i}`}
          />
        </div>
      ))}
      {memberImages && memberImages.length > maxLength ? (
        <div
          style={{
            marginLeft: `-${gap}px`,
            width: width ? `${width}px` : "28px",
            height: height ? `${height}px` : "28px",
          }}
          className={styles.circle}
        >{`+${memberImages.length - maxLength}`}</div>
      ) : null}
    </Flex>
  );
}

const styles = {
  groupImage:
    "object-cover bg-base-white rounded-full overflow-hidden border-[1px] border-base-white aspect-square",
  circle:
    "text-C4 flex items-center justify-center text-base-white bg-grayscale-300 border-[1px] border-base-white rounded-full overflow-hidden aspect-square",
};
