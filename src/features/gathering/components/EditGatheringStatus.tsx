import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import Image from "next/image";
import CheckSpinner from "@/shared/components/Spinner/CheckSpinner";
import { HEART_LETTER } from "@/shared/constants/images";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";

export default function EditGatheringStatus({
  isPending,
  setStep,
}: {
  isPending: boolean;
  setStep: (step: number) => void;
}) {
  return (
    <Flex
      direction="column"
      justify="center"
      className="bg-base-white min-h-dvh pt-safe-top"
    >
      <HeaderWithBtn
        headerLabel="약속 수정"
        onClickBackBtn={() => isPending && setStep(1)}
      />
      <Flex direction="column" align="center">
        <Spacing size={140} />
        {isPending === true ? <DotSpinner /> : <CheckSpinner />}
        <Spacing size={20} />
        {isPending === true ? (
          <span className="text-T2">모임을 수정하는 중</span>
        ) : (
          <span className="text-T2">
            약속 <span className="text-[#6795FA]">수정 완료!</span>
          </span>
        )}
        <Spacing size={24} />
        <div className="p-[13px]">
          <Image
            src={`${HEART_LETTER}?w=${110}&q=${95}`}
            unoptimized={true}
            alt="invitation_img"
            width={110}
            height={108}
          />
        </div>
      </Flex>
    </Flex>
  );
}
