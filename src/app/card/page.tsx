"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import FramePageSkeleton from "@/shared/components/Skeleton/FramePageSkeleton";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";

import ChoosingGatheringToDecorate from "@/features/card/components/ChoosingGatheringToDecorate";

const ChooseFrame = dynamic(() => import("@/features/card/components/ChooseFrame"), {
  ssr: false,
  loading: () => <FramePageSkeleton />,
});

const DecorateWithStickers = dynamic(
  () => import("@/features/card/components/DecorateWithStickers"),
  {
    ssr: false,
    loading: () => <DotSpinner />,
  }
);

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const handleGatheringChange = () => {
    setStep(step + 1);
  };

  const getHeaderName = () => {
    if (step === 1) {
      return "포토 카드";
    } else if (step === 2) {
      return "프레임 선택";
    } else return "포토 카드";
  };

  const clickBackBtnHandler = () => {
    if (step === 1) {
      router.back();
    }
    setStep(step - 1);
  };

  return (
    <div className="h-dvh">
      <HeaderWithBtn
        headerLabel={getHeaderName()}
        onClickBackBtn={clickBackBtnHandler}
        bgColor="white"
      />
      {step === 1 && (
        <ChoosingGatheringToDecorate onNext={handleGatheringChange} />
      )}
      {step === 2 && <ChooseFrame onNext={handleGatheringChange} />}
      {step === 3 && <DecorateWithStickers />}
    </div>
  );
}
