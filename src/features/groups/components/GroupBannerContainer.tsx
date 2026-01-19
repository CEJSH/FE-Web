import React, { Dispatch, SetStateAction } from "react";
import { Lighty } from "@/shared/constants/images";
import clsx from "clsx";
import OptimizedImage from "@/shared/components/OptimizedImage";

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
      <OptimizedImage
        alt="groupImage"
        src={imageUrl ? imageUrl : Lighty}
        width={500}
        height={380}
        className={clsx(
          "h-[380px] w-[500px] object-cover transition-opacity duration-75",
          isLoaded ? "opacity-100" : "opacity-0"
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
