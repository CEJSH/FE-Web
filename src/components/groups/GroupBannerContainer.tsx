import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Lighty } from "@/constants/images";
import clsx from "clsx";

export default function GroupBannerContainer({
  imageUrl,
  isLoaded,
  setIsLoaded,
}: {
  imageUrl: string;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Image
        priority
        alt="groupImage"
        src={imageUrl || Lighty}
        width={500}
        height={316}
        className={clsx(
          "h-[316px] w-[500px] object-cover",
          `transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`
        )}
        onLoad={() => setIsLoaded(true)}
      />
      <div className={styles.shade} />
    </>
  );
}

const styles = {
  shade: "absolute inset-0 bg-transparent-black-50",
};
