import { logger } from "@/shared/utils/logger";

export const compressImage = async (
  file: File,
  maxWidth?: number
): Promise<File> => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: maxWidth ? maxWidth : 1000,
    useWebWorker: true,
    quality: 1,
  };
  try {
    const { default: imageCompression } = await import(
      "browser-image-compression"
    );
    const compressedFile = await imageCompression(file, options);
    return compressedFile as File;
  } catch (error) {
    logger.error("compressImage failed; falling back to original file", error);
    return file;
  }
};
