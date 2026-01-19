import { apiClient } from "@/shared/api/api";

interface ImageUploadResponse {
  imageUrl: string;
}

interface MessageResponse {
  message: string;
}

interface ProfileUpdateResponse {
  success: true;
  message: string;
  imageUrl: string;
}

/** 토큰과 함께 프로필 이미지 업로드 */
export async function postProfileImageWithToken({
  file,
  token,
}: {
  file: File;
  token: string;
}): Promise<ImageUploadResponse> {
  if (!file) {
    throw new Error("이미지 파일을 선택해주세요");
  }

  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/users/profile/image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return { imageUrl: data.imageUrl };
}

/** 프로필 이미지 업로드 */
export async function postProfileImage({
  file,
}: {
  file: File;
}): Promise<ImageUploadResponse> {
  if (!file) {
    throw new Error("이미지 파일을 선택해주세요");
  }

  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/users/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { imageUrl: data.imageUrl };
}

/** 프로필 이미지 URL 업데이트 */
export async function patchProfileImage(
  profileImageUrl: string
): Promise<MessageResponse> {
  await apiClient.patch("/users/profile/image", {
    profileImageUrl,
  });

  return { message: "프로필 이미지가 성공적으로 업데이트되었습니다" };
}

/** 토큰과 함께 프로필 이미지 URL 업데이트 */
export async function patchProfileImageWithToken({
  profileImageUrl,
  token,
}: {
  profileImageUrl: string;
  token: string;
}): Promise<MessageResponse> {
  await apiClient.patch(
    "/users/profile/image",
    { profileImageUrl },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { message: "프로필 이미지가 성공적으로 업데이트되었습니다" };
}

/** 프로필 계정 ID 업데이트 */
export async function patchProfileAccountId(accountId: {
  accountId: string;
}): Promise<MessageResponse> {
  await apiClient.patch("/users/account-id", accountId);

  return { message: "프로필이 성공적으로 업데이트되었습니다" };
}

/** 프로필 이미지 전체 업데이트 프로세스 */
export async function updateProfileImage(imageFile: {
  file: File;
}): Promise<ProfileUpdateResponse> {
  // 1. 이미지 업로드
  const { imageUrl } = await postProfileImage({ file: imageFile.file });

  // 2. 프로필 이미지 URL 업데이트
  await patchProfileImage(imageUrl);

  return {
    success: true,
    message: "프로필 이미지가 성공적으로 업로드 및 업데이트되었습니다",
    imageUrl,
  };
}
