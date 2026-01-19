"use client";
import useUpdateAccountId from "@/features/my/components/hooks/usePatchAccountId";
import useUpdateProfile from "@/features/my/components/hooks/useUpdateProfile";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import Flex from "@/shared/components/Flex";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import Input from "@/shared/components/Input/Input";
import ProfileImageDisplay from "@/shared/components/ProfileImageDisplay";
import Spacing from "@/shared/components/Spacing";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import useUserDetail from "@/features/users/components/hooks/useUserDetail";
import { lightyToast } from "@/shared/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { queryKeys } from "@/lib/queryKeys";

export default function EditPage() {
  const { data } = useUserDetail();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<{
    accountId: string;
    profileImageUrl: string;
  }>({
    accountId: data?.accountId || "",
    profileImageUrl: data?.profileImageUrl || "",
  });

  const { mutate: updateImage } = useUpdateProfile({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.detail(),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.profile(),
        }),
      ]);
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const { mutate: updateId } = useUpdateAccountId({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.detail(),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.group.list(),
        }),
      ]);
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const handlePatch = () => {
    if (profile.profileImageUrl !== data?.profileImageUrl) {
      updateImage({
        profileImageUrl: profile.profileImageUrl,
      });
    }
    if (data?.accountId !== profile.accountId) {
      updateId({
        accountId: profile.accountId,
      });
    }
  };

  return (
    <div className="min-h-dvh bg-base-white">
      <Suspense fallback={<DotSpinner />}>
        <HeaderWithBtn headerLabel="프로필 편집" />
        <Flex direction="column" className={"px-5 pt-safe-top"}>
          <Spacing size={58} />
          <Flex justify="center" className="py-3">
            <ProfileImageDisplay
              small={false}
              userImage={data?.profileImageUrl}
              setUserImage={setProfile}
            />
          </Flex>
          <Spacing size={40} />
          <Input
            value={data?.name || ""}
            label={<span>이름</span>}
            onChange={() => {}}
          />
          <Spacing size={30} />
          <Input
            value={profile.accountId}
            label={<span>프로필 아이디</span>}
            onChange={(e) => {
              setProfile((prev) => ({ ...prev, accountId: e.target.value }));
            }}
            displayLength={15}
          />
        </Flex>
        <FixedBottomButton
          label="변경 완료"
          disabled={
            profile.profileImageUrl == data?.profileImageUrl &&
            profile.accountId == data?.accountId
          }
          onClick={handlePatch}
          className={"mb-safe-bottom"}
        />
      </Suspense>
    </div>
  );
}
