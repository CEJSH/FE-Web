import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import FeedForDisplay from "@/components/feeds/FeedForDisplay";
import NoFeed from "@/components/feeds/NoFeed";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import Spacing from "@/components/shared/Spacing";
import type { Feed } from "@/models/feed";
import { FeedList } from "./FeedList";
import LoadMoreTrigger from "../shared/LoadMoreTrigger";

interface Props {
  feedAll?: Feed[];
  feedMine?: Feed[];
  isFetching: boolean;
  isFetchingMine: boolean;
  handleAll: () => Promise<boolean>;
  handleMine: () => Promise<boolean>;
  loadMoreRef: (node?: Element | null) => void;
  loadMoreMineRef: (node?: Element | null) => void;
  handleFeedSelect: (id: string, feed: Feed) => void;
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

export function FeedSwiper({
  feedAll,
  feedMine,
  isFetching,
  isFetchingMine,
  handleAll,
  handleMine,
  loadMoreRef,
  loadMoreMineRef,
  handleFeedSelect,
  userInfo,
  swiperRef,
  selectedTab,
  setSelectedTab,
  scrollContainerRef,
  scrollContainerRefMine,
}: Props) {
  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => {
        const index = swiper.activeIndex;
        if (selectedTab !== String(index + 1)) {
          setSelectedTab(String(index + 1) as "1" | "2");
        }
      }}
      slidesPerView={1}
      spaceBetween={2}
      direction="horizontal"
      className="custom-swiper !h-dvh w-full"
    >
      {feedAll && feedAll.length > 0 && (
        <SwiperSlide>
          <PullToRefresh
            onRefresh={handleAll}
            pullingContent={<></>}
            refreshingContent={<RefreshingUI />}
          >
            <div ref={scrollContainerRef} className={styles.feedWrapper}>
              <div className="pt-safe-top pb-14">
                <FeedList
                  feeds={feedAll}
                  userInfo={userInfo}
                  onFeedSelect={handleFeedSelect}
                  isFetching={isFetching}
                />
                <LoadMoreTrigger loadMoreRef={loadMoreRef} />
              </div>
            </div>
          </PullToRefresh>
        </SwiperSlide>
      )}
      {feedAll?.length === 0 && (
        <SwiperSlide>
          <div className={styles.feedWrapper}>
            <FeedForDisplay />
          </div>
        </SwiperSlide>
      )}
      {feedMine && feedMine.length > 0 && (
        <SwiperSlide>
          <PullToRefresh
            onRefresh={handleMine}
            pullingContent={<></>}
            refreshingContent={<RefreshingUI />}
          >
            <div ref={scrollContainerRefMine} className={styles.feedWrapper}>
              <div className="pt-safe-top pb-14">
                <FeedList
                  feeds={feedMine}
                  userInfo={userInfo}
                  onFeedSelect={handleFeedSelect}
                  isFetching={isFetchingMine}
                  isMine
                />
                <LoadMoreTrigger loadMoreRef={loadMoreMineRef} />
              </div>
            </div>
          </PullToRefresh>
        </SwiperSlide>
      )}
      {feedMine?.length === 0 && (
        <SwiperSlide>
          <div className={styles.feedWrapper}>
            <NoFeed />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

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
