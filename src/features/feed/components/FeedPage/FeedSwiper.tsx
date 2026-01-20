"use client";

import React, { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import FeedForDisplay from "@/features/feed/components/FeedForDisplay";
import NoFeed from "@/features/feed/components/NoFeed";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import Spacing from "@/shared/components/Spacing";
import { FeedList } from "./FeedList";
import LoadMoreTrigger from "@/shared/components/LoadMoreTrigger";
import type { Feed } from "@/models/feed";

const PullToRefresh = dynamic(
  () => import("react-simple-pull-to-refresh").then((mod) => mod.default),
  { ssr: false }
);

interface FeedSwiperProps {
  feedAll?: Feed[];
  feedMine?: Feed[];
  isFetching: boolean;
  isFetchingMine: boolean;
  handleAll: () => Promise<boolean>;
  handleMine: () => Promise<boolean>;
  loadMoreRef: (node?: Element | null) => void;
  loadMoreMineRef: (node?: Element | null) => void;
  userInfo: any;
  swiperRef: React.MutableRefObject<any>;
  selectedTab: "1" | "2";
  setSelectedTab: (tab: "1" | "2") => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  scrollContainerRefMine: React.RefObject<HTMLDivElement>;
}

const styles = {
  feedWrapper: "h-dvh overflow-y-scroll no-scrollbar pt-[90px] pb-14",
};

// 공통 Feed 슬라이드 컴포넌트
interface FeedSlideProps {
  feeds?: Feed[];
  isFetching: boolean;
  onRefresh: () => Promise<boolean>;
  loadMoreRef: (node?: Element | null) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  userInfo: any;
  isMine?: boolean;
  emptyComponent?: React.ReactNode;
}

const FeedSlide = React.memo(function FeedSlide({
  feeds,
  isFetching,
  onRefresh,
  loadMoreRef,
  scrollRef,
  userInfo,
  isMine,
  emptyComponent,
}: FeedSlideProps) {
  if (!feeds || feeds.length === 0) {
    return (
      <div className={styles.feedWrapper}>
        {emptyComponent || <FeedForDisplay />}
      </div>
    );
  }

  return (
    <PullToRefresh
      onRefresh={onRefresh}
      pullingContent={<></>}
      refreshingContent={<RefreshingUI />}
    >
      <div ref={scrollRef} className={styles.feedWrapper}>
        <div className="pt-safe-top pb-14">
          <FeedList
            feeds={feeds}
            userInfo={userInfo}
            isFetching={isFetching}
            isMine={isMine}
          />
          <LoadMoreTrigger loadMoreRef={loadMoreRef} />
        </div>
      </div>
    </PullToRefresh>
  );
});

FeedSlide.displayName = "FeedSlide";

const FeedSwiperComponent = ({
  feedAll,
  feedMine,
  isFetching,
  isFetchingMine,
  handleAll,
  handleMine,
  loadMoreRef,
  loadMoreMineRef,
  userInfo,
  swiperRef,
  selectedTab,
  setSelectedTab,
  scrollContainerRef,
  scrollContainerRefMine,
}: FeedSwiperProps) => {
  const handleSwiper = useCallback(
    (swiper: React.MutableRefObject<any>["current"]) => {
      swiperRef.current = swiper;
    },
    [swiperRef]
  );
  const handleSlideChange = useCallback(
    (swiper: { activeIndex: number }) => {
      const index = swiper.activeIndex;
      const tab = (index + 1).toString() as "1" | "2";
      if (selectedTab !== tab) setSelectedTab(tab);
    },
    [selectedTab, setSelectedTab]
  );
  return (
    <Swiper
      onSwiper={handleSwiper}
      onSlideChange={handleSlideChange}
      slidesPerView={1}
      spaceBetween={2}
      direction="horizontal"
      className="custom-swiper !h-dvh w-full"
    >
      <SwiperSlide>
        <FeedSlide
          feeds={feedAll}
          isFetching={isFetching}
          onRefresh={handleAll}
          loadMoreRef={loadMoreRef}
          scrollRef={scrollContainerRef}
          userInfo={userInfo}
          emptyComponent={<FeedForDisplay />}
        />
      </SwiperSlide>

      <SwiperSlide>
        <FeedSlide
          feeds={feedMine}
          isFetching={isFetchingMine}
          onRefresh={handleMine}
          loadMoreRef={loadMoreMineRef}
          scrollRef={scrollContainerRefMine}
          userInfo={userInfo}
          isMine
          emptyComponent={<NoFeed />}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export const FeedSwiper = React.memo(FeedSwiperComponent);

function RefreshingUI() {
  return (
    <div className="flex justify-center pt-safe-top">
      <div className="p-2">
        <Spacing size={90} />
        <DotSpinnerSmall />
      </div>
    </div>
  );
}
