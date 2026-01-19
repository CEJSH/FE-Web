import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { HEART_LETTER } from "@/shared/constants/images";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";

export default function StepToInvitation({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Flex direction="column" className="h-dvh bg-base-white pt-safe-top">
      <HeaderWithBtn
        headerLabel="초대장 생성"
        onClickBackBtn={() => setStep((prev) => prev - 1)}
        bgColor="white"
      />
      <Flex direction="column" className="h-dvh" align="center">
        <Spacing size={140} />
        <span className="text-T2">이제 초대장을 만들 차례에요!</span>
        <Spacing size={12} />
        <span className="text-B3 text-grayscale-400">
          초대장을 통해 친구들을 약속에 초대해요.
        </span>
        <Spacing size={48} />
        <Image
          priority
          src={HEART_LETTER}
          alt="invitation_img"
          width={110}
          height={108}
          className="w-[110px] h-[108px]"
        />
        <FixedBottomButton
          label={"초대장 만들기"}
          onClick={() => setStep(4)}
          className="mb-safe-bottom"
        />
      </Flex>
    </Flex>
  );
}
