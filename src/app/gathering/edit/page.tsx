"use client";
import { Suspense, useEffect, useState } from "react";
import type * as lighty from "lighty-type";
import useEditGathering from "@/features/gathering/components/hooks/useEditGathering";
import { lightyToast } from "@/shared/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";
import GatheringEditForm from "@/features/gathering/components/GatheringEditForm";
import EditGatheringStatus from "@/features/gathering/components/EditGatheringStatus";
import { useQueryClient } from "@tanstack/react-query";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import useGatheringDetail from "@/features/gathering/components/hooks/useGatheringDetail";
import { queryKeys } from "@/lib/queryKeys";

export default function GatheringEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const selectedGatheringId = searchParams.get("id") ?? "";
  const { data: selectedGathering } = useGatheringDetail({
    id: selectedGatheringId,
  });

  const editSuccessHandler = async (data: { message: string }) => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all(),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.detail(selectedGatheringId ?? ""),
      }),
    ]);
    router.replace("/gathering");
    lightyToast.success(data.message);
  };

  const [gatheringInfo, setGatheringInfo] = useState<
    Partial<lighty.CreateGatheringRequest>
  >({});

  const { mutate: editingFeed, isPending } = useEditGathering({
    gathering: gatheringInfo,
    gatheringId: selectedGatheringId,
    onSuccess: editSuccessHandler,
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  useEffect(() => {
    if (!selectedGatheringId) {
      router.replace("/gathering");
      lightyToast.error("약속 정보를 찾을 수 없습니다.");
    }
  }, [router, selectedGatheringId]);

  useEffect(() => {
    if (!selectedGathering) return;
    setGatheringInfo((prev) =>
      Object.keys(prev).length > 0
        ? prev
        : {
            name: selectedGathering.name ?? "",
            description: selectedGathering.description ?? "",
            gatheringDate: selectedGathering.gatheringDate ?? "",
            address: selectedGathering.address ?? "",
          }
    );
  }, [selectedGathering]);

  if (!selectedGatheringId) return null;
  if (!selectedGathering) return <DotSpinner />;

  if (isPending || step === 0) {
    return <EditGatheringStatus isPending={isPending} setStep={setStep} />;
  }
  if (step === 1) {
    return (
      <Suspense fallback={<DotSpinner />}>
        <div className="h-dvh bg-base-white">
          <HeaderWithBtn headerLabel="약속 수정" />
          <GatheringEditForm
            type="edit"
            gathering={gatheringInfo}
            setGathering={setGatheringInfo}
            setStep={setStep}
            mutate={editingFeed}
          />
        </div>
      </Suspense>
    );
  }
  return null;
}
