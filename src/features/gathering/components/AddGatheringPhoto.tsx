import React, { useEffect, useRef, useState } from "react";
import Flex from "@/shared/components/Flex";
import Image from "next/image";
import PhotoIcon from "@/shared/components/Icon/PhotoIcon";
import Spacing from "@/shared/components/Spacing";
import { SetterOrUpdater } from "recoil";
import useUploadInvitationImage from "./hooks/useUploadInvitationImage";
import type * as lighty from "lighty-type";
import { lightyToast } from "@/shared/utils/toast";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import { compressImage } from "@/shared/utils/compress";
import PhotoSelectBottomSheet from "@/shared/components/BottomDrawer/PhotoSelectBottomSheet";

export default function AddGatheringPhoto({
  image,
  setImage,
}: {
  image: string | null;
  setImage: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [gatheringImageFile, setGatheringImageFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadInvitationImage } = useUploadInvitationImage({
    file: gatheringImageFile as File,
    onSuccess: (data: { imageUrl: string; message: string }) => {
      setImage((prev) => ({ ...prev, invitationImageUrl: data.imageUrl }));
    },
    onError: (error: Error) => lightyToast.error(error.message),
  });

  const getFileExt = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp") {
      return ext;
    }
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectOpen(false);
    const file = e.target?.files?.[0];

    if (file) {
      const ext = getFileExt(file.name);
      if (!ext) {
        lightyToast.error(
          "지원되지 않는 파일 형식입니다. (jpg, png, jpeg, webp 형식만 가능)"
        );
        return null;
      }

      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        const convertedFile = await compressImage(file);
        setGatheringImageFile(convertedFile);
        return;
      } else {
        setGatheringImageFile(file);
        return;
      }
    }
  };

  useEffect(() => {
    if (gatheringImageFile) {
      uploadInvitationImage();
    }
  }, [gatheringImageFile]);

  return (
    <>
      {/* <label
        style={{
          display: "inline-block",
          width: "fit-content",
          cursor: "pointer",
        }}
        htmlFor="fileInput"
      > */}
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="relative overflow-hidden w-[300px] h-[210px] bg-grayscale-50 rounded-[14.62px] text-C1 text-grayscale-300"
        onClick={() => setSelectOpen(true)}
      >
        {image ? (
          <>
            {isLoaded === false ? <DotSpinner /> : null}
            <Image
              src={image}
              alt="upload_image"
              width={300}
              height={210}
              className="!h-[210px] w-[300px] object-cover"
              onLoad={() => setIsLoaded(true)}
            />
          </>
        ) : (
          <>
            <PhotoIcon />
            <Spacing size={8} />
            <span>그룹 이미지 등록</span>
          </>
        )}
      </Flex>
      {/* <input
          id="fileInput"
          type="file"
          accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
          className="hidden"
          onChange={handleFileChange}
        />
      </label> */}
      {selectOpen && (
        <PhotoSelectBottomSheet
          onClose={() => setSelectOpen(false)}
          handleImageUpload={(e) => handleFileChange(e)}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
        />
      )}
    </>
  );
}
