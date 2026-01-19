import { useRouter } from "next/navigation";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import Image from "next/image";
import CheckSpinner from "@/shared/components/Spinner/CheckSpinner";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import { HEART_LETTER } from "@/shared/constants/images";

export default function MakingGatheringStatus({
  isPending,
}: {
  isPending: boolean;
}) {
  const router = useRouter();
  return (
    <Flex direction="column" className="h-dvh bg-base-white" align="center">
      <Flex
        className="h-[calc(100dvh-120px)]"
        direction="column"
        justify="center"
        align="center"
      >
        {isPending === true ? (
          <DotSpinnerSmall width={28} height={28} />
        ) : (
          <CheckSpinner />
        )}
        <Spacing size={20} />
        {isPending === true ? (
          <span className="text-T2">초대장 보내는 중</span>
        ) : (
          <span className="text-T2">
            초대장 <span className="text-T2 text-[#6795FA]">발송 완료!</span>
          </span>
        )}
        <Spacing size={12} />
        <span className="text-B3 text-grayscale-400">
          생성된 초대장은 [보낸 초대장] 에서
        </span>
        <Spacing size={2} />
        <span className="text-B3 text-grayscale-400">확인할 수 있어요.</span>
        <Spacing size={24} />
        <div className="p-[13px]">
          <Image
            src={HEART_LETTER}
            alt="invitation_img"
            width={110}
            height={108}
          />
        </div>
      </Flex>
      <FixedBottomButton
        label={"홈으로 가기"}
        onClick={() => {
          router.replace("/feed");
        }}
        className="mb-safe-bottom"
      />
    </Flex>
  );
}
