"use client";
import InviteFriends from "@/features/friends/components/InviteFriends";
import AddGroupPhoto from "@/features/groups/components/AddGroupPhoto";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import Flex from "@/shared/components/Flex";
import FeedIcon from "@/shared/components/Icon/FeedIcon";
import PencilIcon from "@/shared/components/Icon/PencilIcon";
import UserIcon from "@/shared/components/Icon/UserIcon";
import Input from "@/shared/components/Input/Input";
import Spacing from "@/shared/components/Spacing";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { UpdateGroupRequest } from "@/models/group";
import useUpdateGroup from "@/features/groups/components/hooks/useUpdateGroup";
import { lightyToast } from "@/shared/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";
import type * as lighty from "lighty-type";
import AddOnlyFriendsSlider from "@/features/groups/components/AddOnlyFriendsSlider";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import { useQueryClient } from "@tanstack/react-query";
import { selectedFriendsAtom } from "@/features/friends/state/friends";
import { postGroupMember } from "@/features/groups/api/group";
import { logger } from "@/shared/utils/logger";
import { queryKeys } from "@/lib/queryKeys";
import { useGroupDetail } from "@/features/groups/components/hooks/useGroupDetail";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import useFriends from "@/features/friends/components/hooks/useFriends";

export default function GroupEditPage() {
  const queryClient = useQueryClient();
  const friendIdsToAdd = useRecoilValue(selectedFriendsAtom);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("id") ?? "";
  const hasInitializedRef = useRef(false);
  const { data: groupDetail } = useGroupDetail(groupId);
  const { userInfo } = useAuth();
  const { data: allFriends } = useFriends({
    userId: userInfo?.accountId ?? "",
  });
  const [groupInfo, setGroupInfo] = useState<UpdateGroupRequest>({
    groupId,
    name: "",
    description: "",
    groupImageUrl: "",
  });
  const [originalMembers, setOriginalMembers] = useState<lighty.User[]>([]);

  useEffect(() => {
    if (!groupId) {
      router.replace("/social?tab=group");
      lightyToast.error("그룹 정보를 찾을 수 없습니다.");
    }
  }, [groupId, router]);

  useEffect(() => {
    if (!groupDetail || hasInitializedRef.current) return;
    setGroupInfo({
      groupId: groupDetail.id,
      name: groupDetail.name,
      description: groupDetail.description,
      groupImageUrl: groupDetail.groupImageUrl,
    });
    setOriginalMembers(groupDetail.members ?? []);
    hasInitializedRef.current = true;
  }, [groupDetail]);

  const friendsToAdd = useMemo(() => {
    if (!allFriends || friendIdsToAdd.length === 0) return [];
    const selectedSet = new Set(friendIdsToAdd);
    return allFriends.filter((friend) => selectedSet.has(friend.id));
  }, [allFriends, friendIdsToAdd]);

  const memberCandidates = useMemo(() => {
    const merged = new Map<string, lighty.User>();
    [...originalMembers, ...friendsToAdd].forEach((member) =>
      merged.set(member.id, member)
    );
    return Array.from(merged.values());
  }, [friendsToAdd, originalMembers]);

  const updateSuccessHandler = async (data: { message: string }) => {
    if (friendIdsToAdd.length > 0) {
      try {
        await postGroupMember({
          groupId: groupInfo.groupId,
          userIds: friendIdsToAdd,
        });
      } catch (e) {
        lightyToast.error("그룹원 추가 실패");
        logger.error("Failed to add group members", e);
      }
    }
    await queryClient.invalidateQueries({
      queryKey: queryKeys.group.list(),
    });
    lightyToast.success(data.message);
  };

  const { mutate: updateGroup } = useUpdateGroup({
    groupId: groupInfo.groupId,
    group: {
      name: groupInfo.name,
      description: groupInfo.description,
      groupImageUrl: groupInfo.groupImageUrl,
    },
    onSuccess: updateSuccessHandler,
    onError: (error) => lightyToast.error(error.message),
  });

  const handleEdit = () => {
    updateGroup();
    router.replace("/social?tab=group");
  };

  if (!groupDetail) {
    return null;
  }

  if (step === 1) {
    return (
      <div className="min-h-[calc(100dvh+75px)] bg-base-white overflow-auto no-scrollbar">
        <HeaderWithBtn headerLabel="그룹 수정" bgColor="white" />
        <form className="flex flex-col px-5 pt-safe-top">
          <Spacing size={72} />
          <AddGroupPhoto
            image={groupInfo.groupImageUrl}
            setGroup={setGroupInfo}
          />
          <Spacing size={36} />
          <Input
            value={groupInfo.name}
            onChange={(e) => {
              setGroupInfo((prev) => ({ ...prev, name: e.target.value }));
            }}
            displayLength={20}
            placeholder="그룹 이름을 입력해 주세요."
            label={
              <>
                <PencilIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>그룹 이름</span>
              </>
            }
          />
          <Spacing size={36} />
          <Input
            value={groupInfo.description}
            onChange={(e) => {
              setGroupInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            displayLength={20}
            placeholder="그룹 이름을 설명해 주세요."
            label={
              <>
                <FeedIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>그룹 설명</span>
              </>
            }
          />
          <Spacing size={36} />
          <Flex align="center" className="text-T5">
            <UserIcon width="16" height="16" color="#0A0A0A" />
            <Spacing direction="horizontal" size={4} />
            <span>그룹 친구</span>
          </Flex>
          <Spacing size={8} />
          <AddOnlyFriendsSlider setStep={setStep} members={memberCandidates} />
        </form>
        <FixedBottomButton
          label={"수정 완료"}
          onClick={handleEdit}
          className="mb-safe-bottom"
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <InviteFriends
        setStep={setStep}
        type="groupEdit"
        exceptFriends={originalMembers}
      />
    );
  }
}
