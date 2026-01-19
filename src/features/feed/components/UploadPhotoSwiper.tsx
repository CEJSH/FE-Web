import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import Flex from "@/shared/components/Flex";
import { PlusCircleButtonSmall } from "@/shared/components/Button/BottomSheetOpenButton";
import Spacing from "@/shared/components/Spacing";
import { useEffect, useRef, useState } from "react";
import { lightyToast } from "@/shared/utils/toast";
import CloseIcon from "@/shared/components/Icon/CloseIcon";
import { compressImage } from "@/shared/utils/compress";
import PhotoSelectBottomSheet from "@/shared/components/BottomDrawer/PhotoSelectBottomSheet";

interface UploadPhotoSwiperProps {
  feedInfoToEdit?: { content: string; imageUrls: string[] };
  filesToUpload: File[];
  setFilesToUpload: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function UploadPhotoSwiper({
  feedInfoToEdit,
  filesToUpload,
  setFilesToUpload,
}: UploadPhotoSwiperProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const createdObjectUrlsRef = useRef<Set<string>>(new Set());
  const [selectOpen, setSelectOpen] = useState(false);
  const [images, setImages] = useState<string[]>(
    feedInfoToEdit?.imageUrls ? feedInfoToEdit.imageUrls : []
  );

  useEffect(() => {
    if (!feedInfoToEdit) return;
    setImages(feedInfoToEdit.imageUrls ?? []);
  }, [feedInfoToEdit]);

  const MAX_IMAGES = 5;

  const isSupportedImageExt = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    return ext && ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (filesToUpload.length >= MAX_IMAGES) {
      lightyToast.error(`최대 ${MAX_IMAGES}장까지만 업로드 가능합니다.`);
      return;
    }

    const ext = isSupportedImageExt(file.name);
    if (!ext) {
      lightyToast.error(
        "지원되지 않는 파일 형식입니다. (jpg, png, jpeg, webp)"
      );
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    createdObjectUrlsRef.current.add(objectUrl);
    setImages((prev) => [...prev, objectUrl]);

    const processedFile = ["jpg", "jpeg", "png"].includes(ext)
      ? await compressImage(file)
      : file;

    setFilesToUpload((prev) => [...prev, processedFile]);
  };

  const handleImageDelete = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImages((prev) => {
      const url = prev[index];
      if (url && createdObjectUrlsRef.current.has(url)) {
        URL.revokeObjectURL(url);
        createdObjectUrlsRef.current.delete(url);
      }
      return prev.filter((_, i) => i !== index);
    });
    setFilesToUpload((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const urls = createdObjectUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const renderAddButtonSlide = () => (
    <SwiperSlide className={styles.slide}>
      <div className="bg-grayscale-10 w-full h-[250px] rounded-[20px] border border-dashed border-grayscale-200" />
      <button
        type="button"
        aria-label="사진 추가"
        className={styles.inputWrapper}
        onClick={() => setSelectOpen(true)}
      >
        <Flex direction="column" align="center">
          <PlusCircleButtonSmall className="w-[25.2px] h-[25.2px]" />
          <Spacing size={6} />
          <span className="text-T6">
            <span className="text-grayscale-300">사진</span>
            <span className="text-grayscale-900">{` ${images.length}`}</span>
            <span className="text-grayscale-300">/5</span>
          </span>
        </Flex>
      </button>
    </SwiperSlide>
  );

  const renderImageSlide = (imageUrl: string, idx: number) => (
    <SwiperSlide
      key={`${imageUrl}${idx}`}
      className={clsx(styles.uploadedImageWrapper, idx === 0 && "ml-5")}
    >
      <Image
        src={imageUrl}
        alt={`${idx + 1}번째 이미지`}
        width={270}
        height={320}
        className={clsx(styles.uploadedImage, feedInfoToEdit && "opacity-65")}
      />
      {!feedInfoToEdit && (
        <button
          type="button"
          aria-label={`${idx + 1}번째 이미지 삭제`}
          onClick={() => handleImageDelete(idx)}
          className={styles.iconContainer}
        >
          <CloseIcon width="18" height="18" />
        </button>
      )}
    </SwiperSlide>
  );

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={1.59}
        spaceBetween={12}
        grabCursor
        className="custom-swiper w-full h-[250px]"
      >
        {!feedInfoToEdit && renderAddButtonSlide()}
        {images.map(renderImageSlide)}
        <SwiperSlide>
          <div className="w-1" />
        </SwiperSlide>
      </Swiper>

      {selectOpen && (
        <PhotoSelectBottomSheet
          onClose={() => setSelectOpen(false)}
          handleImageUpload={handleImageUpload}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
        />
      )}
    </div>
  );
}

const styles = {
  slide: "ml-[20px] relative h-[250px] !w-[240px] rounded-2xl overflow-hidden",
  inputWrapper:
    "absolute inset-0 flex items-center justify-center bg-transparent border-0 appearance-none cursor-pointer",
  uploadedImageWrapper:
    "relative h-[250px] !w-[240px] rounded-2xl overflow-hidden object-cover",
  uploadedImage: "slide-img object-cover !w-[240px] h-[250px]",
  iconContainer:
    "absolute flex justify-center items-center top-4 right-4 z-999 rounded-full w-6 h-6 bg-grayscale-200 active:bg-grayscale-300 transition-colors duration-75",
};
