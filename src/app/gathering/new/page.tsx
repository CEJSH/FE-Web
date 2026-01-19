"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import type * as lighty from "lighty-type";
import { newGatheringInfo } from "@/features/gathering/state/gathering";
import { selectedFriendsAtom } from "@/features/friends/state/friends";
import { lightyToast } from "@/shared/utils/toast";
import useMakeGathering from "@/features/gathering/components/hooks/useMakeGathering";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import GatheringForm from "@/features/gathering/components/GatheringForm";

const components = [
  dynamic(() => import("@/features/gathering/components/MakeGatheringStatus"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  () => <></>,
  dynamic(() => import("@/features/friends/components/InviteFriends"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  dynamic(() => import("@/features/groups/components/StepToInvitation"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
  dynamic(() => import("@/features/gathering/components/MakingInvitation"), {
    loading: () => <DotSpinner />,
    ssr: false,
  }),
];

export default function NewGatheringPage() {
  const [step, setStep] = useState(1);
  const reset = useResetRecoilState(newGatheringInfo);
  const resetFriends = useResetRecoilState(selectedFriendsAtom);
  const [gatheringInfo, setGatheringInfo] =
    useRecoilState<lighty.CreateGatheringRequest>(newGatheringInfo);

  const { mutate: makeGathering, isPending } = useMakeGathering({
    gathering: gatheringInfo,
    onSuccess: (data: { message: string }) => {
      setStep(0);
      lightyToast.success(data.message);
      reset();
    },
  });

  useEffect(() => {
    return () => {
      reset();
      resetFriends();
    };
  }, []);

  const CurrentStepComponent = components[step] || components[0];

  if (step === 1) {
    return (
      <GatheringForm
        formType="new"
        setStep={setStep}
        gathering={gatheringInfo}
        setGathering={setGatheringInfo}
      />
    );
  }

  return (
    <CurrentStepComponent
      isPending={isPending}
      gathering={gatheringInfo}
      setGathering={setGatheringInfo}
      setStep={setStep}
      makeGathering={makeGathering}
      type="gathering"
    />
  );
}
