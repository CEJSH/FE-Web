import { PlusCircleButtonSmall } from "@/shared/components/Button/BottomSheetOpenButton";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import usePostProfileImage from "@/features/my/components/hooks/usePostProfileImage";
import PhotoIcon from "@/shared/components/Icon/PhotoIcon";
import Flex from "@/shared/components/Flex";
import clsx from "clsx";
import { lightyToast } from "@/shared/utils/toast";
import { compressImage } from "@/shared/utils/compress";
import PhotoSelectBottomSheet from "@/shared/components/BottomDrawer/PhotoSelectBottomSheet";
import OptimizedImage from "@/shared/components/OptimizedImage";

export default function ProfileImageDisplay({
  userImage,
  setUserImage,
  small,
}: {
  userImage?: string | null;
  setUserImage: Dispatch<
    SetStateAction<{
      accountId: string;
      profileImageUrl: string;
    }>
  >;
  small?: boolean;
}) {
  const [selectOpen, setSelectOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<string>(userImage ? userImage : "");
  const { mutate } = usePostProfileImage({
    onSuccess: async (imageUrl) => {
      setUserImage((prev) => ({ ...prev, profileImageUrl: imageUrl }));
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectOpen(false);
    const inputFile = e.target?.files?.[0];
    if (!inputFile) return;
    const getFileExt = (fileName: string) => {
      const ext = fileName.split(".").pop()?.toLowerCase();
      if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp") {
        return ext;
      }
      return null;
    };

    if (inputFile) {
      const ext = getFileExt(inputFile.name);
      if (!ext) {
        lightyToast.error(
          "지원되지 않는 파일 형식입니다. (jpg, png, jpeg, webp 형식만 가능)"
        );
        return null;
      }
      let imageUrl: string | null = null;

      try {
        const processedFile = ["jpg", "jpeg", "png"].includes(ext)
          ? await compressImage(inputFile)
          : inputFile;

        imageUrl = URL.createObjectURL(processedFile);

        setNewImage(imageUrl);

        mutate({ file: processedFile });
      } catch (error) {
        console.error("Error processing file:", error);
        lightyToast.error("파일 처리 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (newImage) {
        URL.revokeObjectURL(newImage);
      }
    };
  }, [newImage]);

  return (
    // <label
    //   style={{
    //     display: "inline-block",
    //     width: "fit-content",
    //   }}
    //   htmlFor="fileInput"
    // >
    <>
      <Flex
        style={{
          width: small ? `72px` : "84px",
          height: small ? `72px` : "84px",
          padding: small ? "4px" : "4.67px",
        }}
        className={uploadContainerStyle}
        onClick={() => setSelectOpen(true)}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            width: small ? `64px` : "74.67px",
            height: small ? `64px` : "74.67px",
          }}
          className={imageWrapperStyle}
        >
          {newImage ? (
            <OptimizedImage
              src={newImage}
              alt="upload_image"
              width={small ? 64 : 74.67}
              height={small ? 64 : 74.67}
              style={{
                width: small ? 64 : 74.67,
                height: small ? 64 : 74.67,
              }}
              className={clsx(
                "object-cover",
                small ? "w-8 h-8" : "w-[74.7px] h-[74.7px]"
              )}
            />
          ) : (
            <PhotoIcon />
          )}
        </Flex>
        <PlusCircleButtonSmall
          style={{
            bottom: small ? `2px` : "4.33px",
            right: small ? `2px` : "4.33px",
          }}
          className="absolute bottom-[4.33px] right-[4.33px]"
        />
        {/* <input
          className="hidden"
          id="fileInput"
          type="file"
          accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
          name="imageUrl"
          onChange={handleFileChange}
        /> */}
      </Flex>
      {selectOpen && (
        <PhotoSelectBottomSheet
          onClose={() => setSelectOpen(false)}
          handleImageUpload={(e) => handleFileChange(e)}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
        />
      )}
    </>
    // </label>
  );
}

const imageWrapperStyle = "rounded-full bg-grayscale-50 overflow-hidden";

const uploadContainerStyle = "relative cursor-pointer";
