"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTabs } from "@/shared/hooks/useTabs";
import useReceivedInvitationToGathering from "@/features/gathering/components/hooks/useReceivedInvitationToGathering";
import useSentInvitationToGathering from "@/features/gathering/components/hooks/useSentInvitationToGathering";
import dynamic from "next/dynamic";
import Panel from "@/shared/components/Panel/Panel";
import { useInfiniteScrollByRef } from "@/shared/hooks/useInfiniteScroll";
import useReadNotification from "@/features/notice/components/hooks/useReadNotification";
import { useQueryClient } from "@tanstack/react-query";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import type * as lighty from "lighty-type";
import type { InfiniteData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import InvitationSwiper from "@/features/invitation/components/InvitationSwiper";

const InvitationModal = dynamic(
  () => import("@/features/invitation/components/InvitationModal"),
  { ssr: false }
);

export default function InvitationPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef_r = useRef<HTMLDivElement>(null);

  const { selectedTab, swiperRef, handleSlideChange, handleTabClick } =
    useTabs();

  const {
    data: received,
    isFetching,
    loadMore,
  } = useReceivedInvitationToGathering();

  const {
    data: sent,
    isFetching: isFetching_s,
    loadMore: loadMore_s,
  } = useSentInvitationToGathering();

  useInfiniteScrollByRef({
    isFetching: isFetching_s,
    loadMore: loadMore_s,
    targetRef: containerRef,
  });

  useInfiniteScrollByRef({
    isFetching,
    loadMore,
    targetRef: containerRef_r,
  });

  const { mutate: read } = useReadNotification({
    onSuccess: () => {
      const now = new Date().toISOString();
      queryClient.setQueryData(
        queryKeys.notification.list(),
        (
          old: InfiniteData<lighty.NotificationListResponse> | undefined | null
        ) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map((n) =>
                n.readAt ? n : { ...n, readAt: now }
              ),
            })),
          };
        }
      );
    },
  });

  useEffect(() => {
    read();
  }, []);

  return (
    <div className={"h-dvh"}>
      <HeaderWithBtn headerLabel="초대장">
        <div className="w-full px-5">
          <Panel
            bgColor="transparent"
            selectedTab={selectedTab}
            title1="받은 초대"
            title2="보낸 초대"
            long="long"
            onClick={handleTabClick}
          />
        </div>
      </HeaderWithBtn>
      <InvitationSwiper
        swiperRef={swiperRef}
        handleSlideChange={handleSlideChange}
        received={received}
        sent={sent}
        isFetchingReceived={isFetching}
        isFetchingSent={isFetching_s}
        onOpenModal={setModalOpen}
        containerRefReceived={containerRef_r}
        containerRefSent={containerRef}
      />
      {isModalOpen ? (
        <InvitationModal
          onClickClose={setModalOpen}
          selectedTab={selectedTab}
        />
      ) : null}
    </div>
  );
}
