"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { recordStepAtom } from "@/features/feed/state/record";
import ChoosingKindOfMemory from "@/features/feed/components/ChoosingKindOfMemory";
import ChoosingGatheringToRecord from "@/features/feed/components/ChoosingGatheringToRecord";
import CreatingFeed from "@/features/feed/components/CreatingFeed";
import CreatingFeedNoGathering from "@/features/feed/components/CreatingFeedNoGathering";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import { useRouter, useSearchParams } from "next/navigation";
import Spacing from "@/shared/components/Spacing";
import clsx from "clsx";
import FriendToShareSkeleton from "@/shared/components/Skeleton/FriendToShareSkeleton";

const ChooseFriendToShare = dynamic(
  () => import("@/features/feed/components/ChooseFriendToShare"),
  {
    loading: () => <FriendToShareSkeleton />,
    ssr: false,
  }
);

const DynamicComponents = {
  1: ChoosingKindOfMemory,
  2: ChoosingGatheringToRecord,
  2.5: ChooseFriendToShare,
  3: CreatingFeed,
  3.5: CreatingFeedNoGathering,
};

export default function Record() {
  const router = useRouter();
  const [step, setStep] = useRecoilState(recordStepAtom);
  const searchParams = useSearchParams();
  const from = searchParams?.get("ref");
  const [add, setAdd] = useState<number>(from === "gathering" ? 1 : 0);

  const clickBackBtnHandler = () => {
    if (step === 1) {
      router.back();
    }
    if (step === 2.5) {
      setStep(step - 1.5);
    } else if (step > 1) {
      if (from === "gathering") {
        setStep(1);
        router.back();
        return;
      }
      setStep(step - 1);
    }
  };

  const CurrentStepComponent = DynamicComponents[step] || DynamicComponents[1];

  return (
    <div
      className={clsx(
        "min-h-dvh pt-safe-top",
        step === 2.5 ? "bg-grayscale-50" : "bg-base-white"
      )}
    >
      <HeaderWithBtn
        headerLabel="기록하기"
        onClickBackBtn={clickBackBtnHandler}
        bgColor={step === 2.5 ? "#F4F4F4" : "white"}
      />
      <Spacing size={48} />
      <CurrentStepComponent
        add={add}
        setAdd={setAdd}
        setStep={setStep}
        onNext={() => setStep((prev) => prev + 1)}
      />
    </div>
  );
}
