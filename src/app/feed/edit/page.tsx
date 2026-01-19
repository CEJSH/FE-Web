"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import FeedForm from "@/features/feed/components/FeedForm";
import useEditFeed from "@/features/feed/components/hooks/useEditFeed";
import useFeedDetail from "@/features/feed/components/hooks/useFeedDetail";
import { useRouter, useSearchParams } from "next/navigation";
import FullPageLoader from "@/shared/components/FullPageLoader";
import type * as lighty from "lighty-type";
import { lightyToast } from "@/shared/utils/toast";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import { useQueryClient } from "@tanstack/react-query";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import { logger } from "@/shared/utils/logger";
import { queryKeys } from "@/lib/queryKeys";

export default function EditingFeed() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const feedId = searchParams.get("id") ?? "";
  const { data: originalFeedValue } = useFeedDetail({ id: feedId });

  useEffect(() => {
    if (!feedId) {
      router.replace("/feed");
      lightyToast.error("피드 정보를 찾을 수 없습니다.");
    }
  }, [feedId, router]);

  const [feedInfo, setFeedInfo] = useState<lighty.CreateGatheringFeedRequest>({
    gatheringId: "",
    content: "",
    imageUrls: [],
  });

  useEffect(() => {
    if (!originalFeedValue || hasInitializedRef.current) return;
    setFeedInfo({
      gatheringId: originalFeedValue.gathering?.id || "",
      content: originalFeedValue.content || "",
      imageUrls: originalFeedValue.images || [],
    });
    hasInitializedRef.current = true;
  }, [originalFeedValue]);

  const { mutate: editingFeed, isPending } = useEditFeed({
    content: feedInfo.content,
    feedId,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.feed.mine() }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.feed.all(),
        }),
      ]);
      router.replace("/feed");
      lightyToast.success(data.message);
    },
    onError: (error) => {
      logger.error("Failed to edit feed", { error, feedId });
      lightyToast.error("피드 수정에 실패했어요");
    },
  });

  if (!feedId) {
    return null;
  }

  if (!originalFeedValue) {
    return <DotSpinner />;
  }

  return (
    <div className={"bg-base-white h-dvh"} ref={containerRef}>
      <HeaderWithBtn headerLabel="피드 수정" />
      <div className="pt-safe-top">
        {isPending ? (
          <FullPageLoader />
        ) : (
          <Suspense fallback={<DotSpinner />}>
            <FeedForm
              edit={editingFeed}
              originalFeed={originalFeedValue}
              filesToUpload={filesToUpload}
              setFilesToUpload={setFilesToUpload}
              feedInfoToEdit={feedInfo}
              setFeedInfo={setFeedInfo}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
