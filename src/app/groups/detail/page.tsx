"use client";

import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import useDeleteGroup from "@/features/groups/components/hooks/useDeleteGroup";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAddGroupMember from "@/features/groups/components/hooks/useAddGroupMember";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/shared/state/modal";
import useExitGroup from "@/features/groups/components/hooks/useExitGroup";
import { lightyToast } from "@/shared/utils/toast";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import type { User } from "lighty-type";
import Flex from "@/shared/components/Flex";
import GroupOptions from "@/features/groups/components/GroupOptions";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import GroupDetailContainer from "@/features/groups/components/GroupDetailContainer";
import dynamic from "next/dynamic";
import { selectedFriendsAtom, selectedFriendIdsSelector } from "@/features/friends/state/friends";
import { useGroupDetail } from "@/features/groups/components/hooks/useGroupDetail";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import DetailSkeleton from "@/shared/components/Skeleton/DetailSkeleton";
import useReport from "@/features/report/components/hooks/useReport";
import ModalWithReport from "@/shared/components/ModalWithReport";
import { queryKeys } from "@/lib/queryKeys";

const SelectFriendsContainer = dynamic(
  () => import("@/features/friends/components/SelectFriendsContainer"),
  {
    ssr: false,
    loading: () => <DotSpinner />,
  }
);

export type GroupEditProps = {
  id: string;
  name: string;
  description: string;
  groupImageUrl: string;
  members?: User[];
};

export default function GroupDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userInfo } = useAuth();
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);
  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setSelectedFriends] = useRecoilState(selectedFriendsAtom);
  const selectedFriendIds = useRecoilValue(selectedFriendIdsSelector);
  const reset = useResetRecoilState(selectedFriendsAtom);
  const { data: groupDetail } = useGroupDetail(id ? id : "");

  const [openList, setOpenList] = useState<boolean>(false);

  const handleDeleteSuccess = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.group.list() }),
      queryClient.invalidateQueries({ queryKey: queryKeys.user.detail() }),
    ]);
    lightyToast.success("그룹 나가기/삭제 성공");
    router.replace("/social");
  };

  const addMemberSuccessHandler = async (data: { message: string }) => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.group.list(),
    });
    lightyToast.success(data.message);
    setSelectedFriends([]);
  };

  const reportSuccessHandler = async (data: { message: string }) => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.group.list(),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.detail(),
      }),
    ]);
    router.replace("/social?tab=group");
    lightyToast.success(data.message);
  };

  const { mutate: deleteGroup } = useDeleteGroup({
    groupId: id || "",
    onSuccess: handleDeleteSuccess,
  });

  const { mutate: exitGroup } = useExitGroup({
    groupId: id || "",
    onSuccess: handleDeleteSuccess,
  });

  const { mutate: addMember } = useAddGroupMember({
    groupId: id || "",
    friendIds: selectedFriendIds,
    onSuccess: addMemberSuccessHandler,
  });

  const { mutate: reportGroup } = useReport({
    onSuccess: reportSuccessHandler,
    onError: (error: Error) => lightyToast.error(error.message),
  });

  useEffect(() => {
    return reset();
  }, []);

  if (openList === true) {
    return (
      <SelectFriendsContainer
        type="group"
        paddingTop={20}
        action={() => {
          setOpenList(false);
          addMember();
        }}
      />
    );
  }

  if (!groupDetail) {
    return <DetailSkeleton />;
  }

  const groupEdit: GroupEditProps = {
    id: groupDetail.id,
    name: groupDetail.name,
    description: groupDetail.description,
    groupImageUrl: groupDetail.groupImageUrl,
    members: groupDetail.members,
  };
  const { accountId } = groupDetail.owner;
  const isOwner = accountId === userInfo?.accountId;

  return (
    <Flex direction="column" className="w-full min-h-dvh">
      <HeaderWithBtn
        headerLabel="그룹 상세"
        fontColor="white"
        icon={<GroupOptions isOwner={isOwner} group={groupEdit} />}
      />
      <GroupDetailContainer
        groupDetail={groupDetail}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      <ModalWithReport
        modalState={modalState}
        setModalState={setModalState}
        deleteGroup={deleteGroup}
        exitGroup={exitGroup}
        onReport={reportGroup}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
        reportContent={reportContent}
        setReportContent={setReportContent}
      />
    </Flex>
  );
}
