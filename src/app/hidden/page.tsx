"use client";
import FilterBar from "@/components/shared/YearFilter";
import { useRecoilState } from "recoil";
import clsx from "clsx";
import TabButton from "@/components/shared/Panel/TabButton";
import { BottomLine } from "@/components/shared/BottomLine";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import getHeader from "@/utils/getHeader";
import { recordModalAtom } from "@/atoms/modal";
import Feed from "@/components/feeds/Feed";
import useFeedHidden from "@/components/feeds/hooks/useFeedHidden";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

export default function FeedPage() {
  const [isClient, setIsClient] = useState(false);
  const header = getHeader("/hidden");
  const isPast = useScrollThreshold();
  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const {
    data: hiddenFeed,
    hasNextPage,
    loadMore,
  } = useFeedHidden({ limit: 2 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <FullPageLoader />;

  return (
    <div
      className="h-vh pt-[48px] overflow-y-scroll no-scrollbar"
      id="scrollableDiv"
    >
      {header}
      {!hiddenFeed ? (
        <FullPageLoader />
      ) : (
        <>
          <div
            className={clsx(filterWrapperStyle, isPast ? "shadow-bottom" : "")}
          >
            <div
              style={{
                backgroundColor: "#fff",
              }}
              className={tabContainerStyle}
            >
              <div className={tabWrapperStyle}>
                <TabButton
                  title={`숨김 피드`}
                  onMouseDown={() => {}}
                  current={true}
                  fresh={"never"}
                />
                <BottomLine />
              </div>
              <FilterBar />
            </div>
          </div>
          <InfiniteScroll
            dataLength={hiddenFeed?.length ?? 0}
            hasMore={hasNextPage}
            loader={<DotSpinnerSmall />}
            next={loadMore}
            scrollThreshold="50px"
            scrollableTarget="scrollableDiv"
          >
            <Feed
              feeds={hiddenFeed}
              onClickFeed={() => {}}
              className="!pt-[48px]"
            />
          </InfiniteScroll>
        </>
      )}

      {recordModalOpen ? (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      ) : null}
    </div>
  );
}

const filterWrapperStyle =
  "max-w-[430px] fixed z-10 flex w-full bg-base-white transition-shadow duration-300";

const tabContainerStyle = "flex w-full px-5 justify-between";
const tabWrapperStyle = "w-fit";
