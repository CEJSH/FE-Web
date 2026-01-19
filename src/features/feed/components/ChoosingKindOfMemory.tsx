import Flex from "@/shared/components/Flex";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import Spacing from "@/shared/components/Spacing";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect } from "react";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";

interface ChoosingKindOfMemoryProps {
  add: number;
  setAdd: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ChoosingKindOfMemory({
  add,
  setAdd,
  setStep,
}: ChoosingKindOfMemoryProps) {
  const { isReactNativeWebView } = useReactNativeWebView();

  useEffect(() => {
    setStep(1);
  }, []);

  return (
    <>
      <Flex direction="column" className="pt-5 px-6 gap-4 text-T2">
        <LightyIcon width="24" height="24" color="#0A0A0A" />
        <span>어떤 추억을 기록할까요?</span>
        <span className="text-B3 text-grayscale-500">
          기록하고 싶은 추억을 선택해 주세요.
        </span>
      </Flex>
      <Spacing size={36} />
      <Flex direction="column" className="px-6 gap-5 text-T5">
        <Item
          title="일반 추억"
          subTitle="자유롭게 나의 추억을 기록해요"
          onClick={() => setAdd(1.5)}
          clicked={add === 1.5}
        />
        <Item
          title="라이티 약속 추억"
          subTitle="라이티에서 만든 약속의 추억을 기록해요"
          onClick={() => setAdd(1)}
          clicked={add === 1}
        />
      </Flex>
      <FixedBottomButton
        bgColor="#f4f4f4"
        disabled={add < 1}
        label={"다음"}
        className={isReactNativeWebView ? "mb-safe-bottom" : ""}
        onClick={() => {
          setStep((prev) => prev + add);
        }}
      />
    </>
  );
}

const Item = ({
  title,
  subTitle,
  onClick,
  clicked,
}: {
  title: string;
  subTitle: string;
  onClick: () => void;
  clicked: boolean;
}) => {
  return (
    <Flex
      onClick={onClick}
      className={clsx(
        "bg-base-white rounded-2xl px-4 py-5 gap-3 cursor-pointer border-[1px] border-grayscale-100 transition-colors duration-300 ease-in-out",
        clicked && "border-[1px] border-grayscale-900"
      )}
    >
      <div className="rounded-lg flex justify-center items-center w-10 h-10 bg-grayscale-100">
        <LightyIcon width="11" height="11" />
      </div>
      <Flex direction="column" className="gap-[6px]">
        <span>{title}</span>
        <span className="text-C2 text-grayscale-400">{subTitle}</span>
      </Flex>
    </Flex>
  );
};
