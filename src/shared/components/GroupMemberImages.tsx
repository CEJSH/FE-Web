import clsx from "clsx";
import type * as lighty from "lighty-type";
import LightyIcon from "./Icon/LightyIcon";
import React from "react";
import Flex from "./Flex";
import OptimizedImage from "./OptimizedImage";

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
    width && height
      ? `!w-[${width}px] !h-[${height}px]`
      : `!w-[28px] !h-[28px]`;

  return (
    <Flex>
      {seenImages?.map((imageUrl, i) => {
        return (
          <React.Fragment key={i}>
            {!!imageUrl ? (
              <OptimizedImage
                loading="eager"
                key={`group${i}`}
                style={{ marginLeft: i !== 0 ? `-${gap}px` : 0 }}
                src={imageUrl}
                width={width ? width : 28}
                height={height ? height : 28}
                className={clsx(styles.groupImage, imageWidthHeight)}
                alt={`writer${i}`}
              />
            ) : (
              <div
                className={clsx(
                  "rounded-full border-[1px] border-base-white flex justify-center items-center bg-grayscale-100",
                  imageWidthHeight
                )}
              >
                <LightyIcon width="4" height="4" />
              </div>
            )}
          </React.Fragment>
        );
      })}
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
