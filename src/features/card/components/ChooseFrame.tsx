import { cardFrameAtom } from "@/features/card/state/card";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import { useRecoilValue } from "recoil";
import SelectFrameSwiper from "./SelectFrameSwiper";

export default function ChooseFrame({ onNext }: { onNext: () => void }) {
  const selectedFrame = useRecoilValue(cardFrameAtom);

  return (
    <Flex
      className="relative h-dvh pt-safe-top pb-safe-bottom overflow-y-scroll no-scrollbar"
      justify="space-between"
      direction="column"
    >
      <div>
        <Spacing size={76} />
        <Flex className="px-6 gap-4" direction="column">
          <span className="text-T2">프레임을 선택해 주세요</span>
          <span className="text-B3">나만의 특별한 카드를 만들어봐요</span>
        </Flex>
        <Spacing size={28} />
        <SelectFrameSwiper />
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          disabled={selectedFrame == null}
          onClick={() => {
            onNext();
          }}
        >
          {"스티커로 꾸미기"}
        </button>
      </div>
    </Flex>
  );
}

const styles = {
  button: `mb-safe-bottom bg-grayscale-900 active:bg-grayscale-700 w-full py-[18px] flex justify-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full`,
  buttonWrapper: `w-full px-5 pt-3 mb-safe-bottom animate-slide-up will-change-transform pb-14`,
};
