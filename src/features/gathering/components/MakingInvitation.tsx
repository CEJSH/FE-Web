import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import type * as lighty from "lighty-type";
import { SetterOrUpdater } from "recoil";
import UploadableVerticalInvitationCard from "@/features/invitation/components/VerticalInvitationCard";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import { lightyToast } from "@/shared/utils/toast";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import { Dispatch, SetStateAction } from "react";

export default function MakingInvitation({
  gathering,
  setGathering,
  makeGathering,
  setStep,
}: {
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
  makeGathering: () => void;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const { userInfo } = useAuth();

  const handleMakeGathering = () => {
    if (gathering.invitationImageUrl !== "") {
      makeGathering();
    }
    if (gathering.invitationImageUrl == "") {
      lightyToast.error("이미지가 업로드되지 않았어요.");
    }
  };
  return (
    <Flex direction="column" className="bg-grayscale-50 h-full pt-12">
      <HeaderWithBtn
        headerLabel="초대장 만들기"
        bgColor="#F4F4F4"
        onClickBackBtn={() => setStep((prev: number) => prev - 1)}
      />
      <Flex
        direction="column"
        className="min-h-[calc(100dvh+20px)] pt-safe-top"
        align="center"
      >
        <Spacing size={40} />
        <span className="text-T2">초대장에 이미지를 채워주세요!</span>
        <Spacing size={30} />
        <UploadableVerticalInvitationCard
          userId={userInfo?.accountId}
          gathering={gathering}
          setGathering={setGathering}
        />
        <FixedBottomButton
          bgColor="bg-grayscale-50"
          label={"초대장 보내기"}
          onClick={handleMakeGathering}
          className={"mb-safe-bottom"}
        />
      </Flex>
    </Flex>
  );
}
