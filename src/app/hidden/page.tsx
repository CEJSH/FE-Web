"use client";
import { useRecoilState } from "recoil";
import TabButton from "@/shared/components/Panel/TabButton";
import { BottomLine } from "@/shared/components/BottomLine";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/shared/state/modal";
import { Suspense } from "react";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import { bottomSheetStateAtom } from "@/features/feed/state/feed";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import Spacing from "@/shared/components/Spacing";
import dynamic from "next/dynamic";
import { FeedList } from "@/features/feed/components/FeedPage/FeedList";
import useHiddenFeed from "@/features/feed/components/hooks/useHiddenFeed";
import { NoFeedHidden } from "@/features/feed/components/NoFeed";
const CommentContainer = dynamic(
  () => import("@/features/feed/components/Comment/CommentContainer"),
  { ssr: false }
);
const ModalWithReport = dynamic(
  () => import("@/shared/components/ModalWithReport"),
  { ssr: false }
);

export default function FeedPage() {
  const {
    hiddenFeed,
    isFetching,
    loadMore,
    displayFeed,
    reportComment,
    deleteComment,
    feedId,
  } = useHiddenFeed();

  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);

  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);

  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  useInfiniteScroll({ isFetching, loadMore });

  return (
    <div className="min-h-dvh">
      <HeaderWithBtn headerLabel="숨김 피드" bgColor="white">
        <div className={styles.tabContainerStyle}>
          <div className={styles.tabWrapperStyle}>
            <TabButton
              title={`숨김 피드`}
              onMouseDown={() => {}}
              current={true}
              fresh={"never"}
            />
            <BottomLine />
          </div>
        </div>
      </HeaderWithBtn>
      <Suspense>
        <Spacing size={96} />
        <div className="pt-safe-top pb-14">
          {hiddenFeed && hiddenFeed.length < 1 && <NoFeedHidden />}
          {hiddenFeed && hiddenFeed.length > 0 && (
            <FeedList
              feeds={hiddenFeed}
              userInfo={false}
              isFetching={isFetching}
              isMine={true}
            />
          )}
        </div>
      </Suspense>
      {bottomSheetState && (
        <CommentContainer
          selectedFeedId={feedId}
          onClose={() => setBottomSheetState(false)}
        />
      )}
      <ModalWithReport
        modalState={modalState}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
        setModalState={setModalState}
        reportContent={reportContent}
        setReportContent={setReportContent}
        displayFeed={displayFeed}
        onReport={reportComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}

const styles = {
  tabContainerStyle: "flex w-full px-5 justify-between items-center",
  tabWrapperStyle: "w-fit",
};
