"use client";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import {
  modalStateAtom,
  recordModalAtom,
  reportInfoAtom,
  reportModalAtom,
} from "@/shared/state/modal";
import { useInView } from "react-intersection-observer";
import { useTabs } from "@/shared/hooks/useTabs";
import { bottomSheetStateAtom } from "@/features/feed/state/feed";
import { ScrollAwareHeader } from "@/shared/layout/Header/ScrollAwareHeader";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import TabParamHandler from "@/shared/components/TabParamHandler";
import useFeed from "@/features/feed/hooks/useFeed";
import { useIntersectionLoadMore } from "@/features/feed/components/hooks/useIntersectionLoadMore";
import { useNotificationListener } from "@/features/feed/components/hooks/useNotificationListener";
import { FeedSwiper } from "@/features/feed/components/FeedPage/FeedSwiper";

const CommentContainer = dynamic(
  () => import("@/shared/components/Comment/CommentContainer"),
  { ssr: false }
);
const MemoriesBottomSheet = dynamic(
  () => import("@/shared/components/BottomDrawer/MemoriesBottomSheet"),
  { ssr: false }
);
const ModalWithReport = dynamic(
  () => import("@/shared/components/ModalWithReport"),
  { ssr: false }
);

export default function FeedPage() {
  useNotificationListener();

  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const [recordModalOpen, setRecordModalOpen] = useRecoilState(recordModalAtom);
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  const {
    feedId,
    feedAll,
    feedMine,
    isFetching,
    isFetchingMine,
    loadMore,
    loadMoreMine,
    handleRefreshAll,
    handleRefreshMine,
    deleteFeed,
    deleteComment,
    hideFeed,
    report,
    isNewNotification,
    mailCount,
    userInfo,
  } = useFeed();

  const { selectedTab, handleTabClick, swiperRef, setSelectedTab } = useTabs();
  const scrollContainerRef_m = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const [rootElement_m, setRootElement_m] = useState<HTMLElement | null>(null);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    root: rootElement ?? undefined,
  });
  const { ref: loadMoreMineRef, inView: inViewMine } = useInView({
    threshold: 0.5,
    root: rootElement_m ?? undefined,
  });

  const { visible } = useScrollDirection({
    elementRef: selectedTab === "1" ? scrollContainerRef : scrollContainerRef_m,
    selectedTab,
  });

  useIntersectionLoadMore({ inView, inViewMine, loadMore, loadMoreMine });

  useEffect(() => {
    if (swiperRef.current && typeof swiperRef.current.slideTo === "function") {
      const targetIndex = Number(selectedTab) - 1;
      if (swiperRef.current.activeIndex !== targetIndex) {
        swiperRef.current.slideTo(targetIndex);
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    if (scrollContainerRef.current) setRootElement(scrollContainerRef.current);
    if (scrollContainerRef_m.current)
      setRootElement_m(scrollContainerRef_m.current);
  }, []);

  useEffect(() => {
    const onNavReselect = (event: Event) => {
      const customEvent = event as CustomEvent<{ href?: string }>;
      if (customEvent.detail?.href !== "/feed") return;

      const targetRef =
        selectedTab === "1" ? scrollContainerRef : scrollContainerRef_m;
      targetRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener(
      "lighty:navigation-reselect",
      onNavReselect as EventListener
    );
    return () => {
      window.removeEventListener(
        "lighty:navigation-reselect",
        onNavReselect as EventListener
      );
    };
  }, [selectedTab]);

  return (
    <div className="h-dvh pb-safe-bottom">
      <ScrollAwareHeader
        visible={visible}
        mailCount={mailCount.length}
        isNewNotification={isNewNotification.length}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      <FeedSwiper
        feedAll={feedAll}
        feedMine={feedMine}
        isFetching={isFetching}
        isFetchingMine={isFetchingMine}
        handleAll={handleRefreshAll}
        handleMine={handleRefreshMine}
        loadMoreRef={loadMoreRef}
        loadMoreMineRef={loadMoreMineRef}
        userInfo={userInfo}
        swiperRef={swiperRef}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        scrollContainerRef={scrollContainerRef}
        scrollContainerRefMine={scrollContainerRef_m}
      />

      <TabParamHandler setSelectedTab={setSelectedTab} pathToReplace="/feed" />

      {recordModalOpen && (
        <MemoriesBottomSheet
          onClose={() => setRecordModalOpen(false)}
          open={recordModalOpen}
        />
      )}
      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={feedId}
          onClose={() => setBottomSheetState(false)}
        />
      )}
      <ModalWithReport
        modalState={modalState}
        setModalState={setModalState}
        reportContent={reportContent}
        setReportContent={setReportContent}
        deleteFeed={deleteFeed}
        deleteComment={deleteComment}
        hideFeed={hideFeed}
        onReport={report}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
      />
    </div>
  );
}
