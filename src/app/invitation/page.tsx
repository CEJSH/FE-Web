"use client";
import InvitationCard from "@/components/invitation/InvitationCard";
import Spacing from "@/components/shared/Spacing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTabs } from "@/hooks/useTabs";
import useReceivedInvitationToGathering from "@/components/gathering/hooks/useReceivedInvitationToGathering";
import useSentInvitationToGathering from "@/components/gathering/hooks/useSentInvitationToGathering";
import InvitationModal from "@/components/invitation/InvitationModal";
import Panel from "@/components/shared/Panel/Panel";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import useReadNotification from "@/components/notice/hooks/useReadNotification";
import { useQueryClient } from "@tanstack/react-query";
import NoInvitation from "@/components/invitation/NoInvitation";
import InvitationCardSkeleton from "@/components/shared/Skeleton/InvitationCardSkeleton";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const renderSwiper = useMemo(() => {
    return (
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          handleSlideChange(swiper.activeIndex);
        }}
        slidesPerView={1}
        spaceBetween={2}
        className="custom-swiper w-full !h-dvh"
      >
        <SwiperSlide>
          <div
            ref={containerRef_r}
            className="pt-safe-top h-dvh overflow-y-auto no-scrollbar"
          >
            {received && received.length > 0 ? (
              <>
                <Spacing size={110} />
                {received?.map((invitation) => {
                  return (
                    <React.Fragment key={invitation.id}>
                      <InvitationCard
                        onClickOpen={setModalOpen}
                        invitation={invitation}
                      />
                      <Spacing size={24} />
                    </React.Fragment>
                  );
                })}
                {isFetching && <InvitationCardSkeleton />}
              </>
            ) : (
              <NoInvitation type="RECEIVED" />
            )}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            ref={containerRef}
            className="pt-safe-top h-dvh overflow-y-auto no-scrollbar"
          >
            {sent && sent.length > 0 ? (
              <>
                <Spacing size={110} />
                {sent?.map((invitation) => {
                  return (
                    <React.Fragment key={invitation.gatheringId}>
                      <InvitationCard
                        onClickOpen={setModalOpen}
                        invitation={invitation}
                      />
                      <Spacing size={24} />
                    </React.Fragment>
                  );
                })}
                {isFetching_s && <DotSpinner />}
              </>
            ) : (
              <NoInvitation type="SENT" />
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    );
  }, [
    received,
    sent,
    selectedTab,
    swiperRef,
    handleSlideChange,
    isFetching,
    isFetching_s,
  ]);

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
      {renderSwiper}
      {isModalOpen ? (
        <InvitationModal
          onClickClose={setModalOpen}
          selectedTab={selectedTab}
        />
      ) : null}
    </div>
  );
}
