import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Flex from "@/shared/components/Flex";
import Image from "next/image";
import PhotoIcon from "@/shared/components/Icon/PhotoIcon";
import Spacing from "@/shared/components/Spacing";
import useUploadGroupCoverImage from "./hooks/useUploadGroupCoverImage";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";
import { SetterOrUpdater } from "recoil";
import { lightyToast } from "@/shared/utils/toast";
import { compressImage } from "@/shared/utils/compress";
import PhotoSelectBottomSheet from "@/shared/components/BottomDrawer/PhotoSelectBottomSheet";

export default function AddGroupPhoto({
  image,
  setGroup,
  setNewGroup,
}: {
  image: string | null;
  setGroup?: Dispatch<SetStateAction<UpdateGroupRequest>>;
  setNewGroup?: SetterOrUpdater<CreateGroupRequest>;
}) {
  const [groupImageFile, setGroupImageFile] = useState<File>();
  const [selectOpen, setSelectOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadGroupCover } = useUploadGroupCoverImage({
    file: groupImageFile as File,
    onSuccess: (data) => {
      if (setGroup) {
        setGroup((prev) => ({ ...prev, groupImageUrl: data.url }));
      } else if (setNewGroup) {
        setNewGroup((prev) => ({ ...prev, groupImageUrl: data.url }));
      }
    },
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
        setGroupImageFile(convertedFile);
        return;
      } else {
        setGroupImageFile(file);
        return;
      }
    }
  };

  useEffect(() => {
    if (groupImageFile) {
      uploadGroupCover();
    }
  }, [groupImageFile]);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        direction="column"
        onClick={() => setSelectOpen(true)}
        className="overflow-hidden w-[170px] h-[170px] bg-grayscale-50 rounded-[14.62px] text-C1 text-grayscale-300"
      >
        {image ? (
          <Image
            src={image}
            alt="upload_image"
            width={170}
            height={170}
            className="object-cover w-[170px] h-[170px]"
          />
        ) : (
          <>
            <PhotoIcon />
            <Spacing size={8} />
            <span>그룹 이미지 등록</span>
          </>
        )}
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
  );
}
