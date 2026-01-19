"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Spacing from "@/shared/components/Spacing";
import InvitationCard from "@/features/invitation/components/InvitationCard";
import NoInvitation from "@/features/invitation/components/NoInvitation";
import InvitationCardSkeleton from "@/shared/components/Skeleton/InvitationCardSkeleton";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import type * as lighty from "lighty-type";

type ReceivedInvitation =
  lighty.ReceivedGatheringInvitationListResponse["invitations"][number];
type SentInvitation =
  lighty.SentGatheringInvitationListResponse["invitations"][number];

type Props = {
  swiperRef: React.MutableRefObject<any>;
  handleSlideChange: (activeIndex: number) => void;
  received?: ReceivedInvitation[];
  sent?: SentInvitation[];
  isFetchingReceived: boolean;
  isFetchingSent: boolean;
  onOpenModal: (value: boolean) => void;
  containerRefReceived: React.RefObject<HTMLDivElement>;
  containerRefSent: React.RefObject<HTMLDivElement>;
};

export default function InvitationSwiper({
  swiperRef,
  handleSlideChange,
  received,
  sent,
  isFetchingReceived,
  isFetchingSent,
  onOpenModal,
  containerRefReceived,
  containerRefSent,
}: Props) {
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
          ref={containerRefReceived}
          className="pt-safe-top h-dvh overflow-y-auto no-scrollbar"
        >
          {received && received.length > 0 ? (
            <>
              <Spacing size={110} />
              {received.map((invitation) => (
                <React.Fragment key={invitation.id}>
                  <InvitationCard
                    onClickOpen={onOpenModal}
                    invitation={invitation}
                  />
                  <Spacing size={24} />
                </React.Fragment>
              ))}
              {isFetchingReceived && <InvitationCardSkeleton />}
            </>
          ) : (
            <NoInvitation type="RECEIVED" />
          )}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          ref={containerRefSent}
          className="pt-safe-top h-dvh overflow-y-auto no-scrollbar"
        >
          {sent && sent.length > 0 ? (
            <>
              <Spacing size={110} />
              {sent.map((invitation) => (
                <React.Fragment key={invitation.gatheringId}>
                  <InvitationCard
                    onClickOpen={onOpenModal}
                    invitation={invitation}
                  />
                  <Spacing size={24} />
                </React.Fragment>
              ))}
              {isFetchingSent && <DotSpinner />}
            </>
          ) : (
            <NoInvitation type="SENT" />
          )}
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
