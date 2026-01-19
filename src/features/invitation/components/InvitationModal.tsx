import Dimmed from "@/shared/components/Dimmed";
import CloseIcon from "@/shared/components/Icon/CloseIcon";
import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";
import Button from "@/shared/components/Button/Button";
import { useRecoilValue } from "recoil";
import { selectedInvitationIdAtom } from "@/features/invitation/state/invitation";
import useAcceptInvitationToGathering from "@/features/gathering/components/hooks/useAcceptInvitationToGathering";
import useRejectInvitationToGathering from "@/features/gathering/components/hooks/useRejectInvitationToGathering";
import { SuccessResponse } from "@/models/response";
import { VerticalInvitationCard } from "./VerticalInvitationCard";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/shared/utils/toast";
import { queryKeys } from "@/lib/queryKeys";
import type * as lighty from "lighty-type";
import type { GatheringInvitation } from "@/models/gathering";

type ReceivedInvitation =
  lighty.ReceivedGatheringInvitationListResponse["invitations"][number];
type SentInvitation =
  lighty.SentGatheringInvitationListResponse["invitations"][number];
type Invitation = ReceivedInvitation | SentInvitation;

const hasInvitationId = (
  invitation: Invitation
): invitation is ReceivedInvitation =>
  "id" in invitation && typeof invitation.id === "string";

const getInvitationId = (invitation: Invitation) =>
  hasInvitationId(invitation) ? invitation.id : invitation.gatheringId;

export default function InvitationModal({
  selectedTab,
  onClickClose,
}: {
  selectedTab: "1" | "2";
  onClickClose: (value: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const selectedInvitationId = useRecoilValue(selectedInvitationIdAtom);
  const receivedData = queryClient.getQueryData<
    InfiniteData<lighty.ReceivedGatheringInvitationListResponse>
  >(queryKeys.gathering.invitations.received());
  const sentData = queryClient.getQueryData<
    InfiniteData<lighty.SentGatheringInvitationListResponse>
  >(queryKeys.gathering.invitations.sent());

  const selectedInvitationList =
    selectedTab === "1" ? receivedData : sentData;
  const selectedInvitation: Invitation | undefined = selectedInvitationList?.pages
    .map((page) => page.invitations)
    .flat()
    .find((invitation) => {
      return getInvitationId(invitation) === selectedInvitationId;
    });

  const invitationForCard: GatheringInvitation | null = selectedInvitation
    ? {
        id: getInvitationId(selectedInvitation),
        name: selectedInvitation.name,
        description: selectedInvitation.description,
        sender: selectedInvitation.sender,
        createdAt: selectedInvitation.createdAt,
        gatheringDate: selectedInvitation.gatheringDate,
        invitation_image_url: selectedInvitation.invitation_image_url,
        address: selectedInvitation.address,
        groupName: selectedInvitation.groupName,
      }
    : null;

  const { mutate: accept } = useAcceptInvitationToGathering({
    gatheringId: selectedInvitation?.gatheringId || "",
    invitationId:
      selectedInvitation && hasInvitationId(selectedInvitation)
        ? selectedInvitation.id
        : "",
    onSuccess: async (data: SuccessResponse) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.invitations.received(),
      });
      lightyToast.success(data.message);
      onClickClose(false);
    },
  });

  const { mutate: reject } = useRejectInvitationToGathering({
    invitationId:
      selectedInvitation && hasInvitationId(selectedInvitation)
        ? selectedInvitation.id
        : "",
    onSuccess: async (data: SuccessResponse) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.invitations.received(),
      });
      lightyToast.success(data.message);
      onClickClose(false);
    },
  });

  if (!selectedInvitation || !invitationForCard) return null;

  return (
    <Dimmed className={styles.dimmed}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ width: "330px" }}
      >
        <button
          type="button"
          aria-label="초대 모달 닫기"
          className="self-end cursor-pointer p-1 bg-transparent border-0"
          onClick={() => {
            onClickClose(false);
          }}
        >
          <CloseIcon width="32" height="32" />
        </button>
        <Spacing size={8} />
        <VerticalInvitationCard invitation={invitationForCard} />
        {selectedTab === "1" ? (
          <>
            <Spacing size={16} />
            <Flex justify="center">
              <Button className={styles.rejectBtn} onClick={() => reject()}>
                거절
              </Button>
              <Spacing size={15} direction="horizontal" />
              <Button className={styles.acceptBtn} onClick={() => accept()}>
                수락
              </Button>
            </Flex>
          </>
        ) : null}
      </Flex>
    </Dimmed>
  );
}

const styles = {
  dimmed: "flex flex-col justify-center items-center",

  image: "h-[210px] object-cover rounded-xl",
  subContentWrapper: "absolute pl-1 left-[15px] top-[332px]",
  groupMemberImagesWrapper: "absolute bottom-[15px] left-[15px] pl-1",
  fromWrapper: "absolute pr-1 right-[15px] bottom-[22px]",
  rejectBtn:
    "bg-grayscale-100 px-6 py-[14px] rounded-[36px] text-T6 active:bg-grayscale-200",
  acceptBtn:
    "bg-grayscale-900 px-6 py-[14px] text-base-white rounded-[36px] text-T6",
};
