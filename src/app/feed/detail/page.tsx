"use client";

import { useRecoilState, useSetRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";
import type { User } from "lighty-type";
import Flex from "@/shared/components/Flex";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import FeedCard from "@/features/feed/components/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/features/feed/components/InfoBar";
import OptionsSelectIcon from "@/shared/components/Icon/OptionsSelectIcon";
import FeedDropdownMenu from "@/shared/components/DropDownMenu/FeedDropDownMenu";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import { MENU_CONFIGS } from "@/shared/constants/menu-configs";
import { useDropdown, useFriendsBox } from "@/shared/hooks/useDropdown";
import { bottomSheetStateAtom, selectedFeedIdAtom } from "@/features/feed/state/feed";
import useFeedDetail from "@/features/feed/components/hooks/useFeedDetail";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import FeedPageSkeleton from "@/shared/components/Skeleton/FeedSkeleton";
import dynamic from "next/dynamic";
import useFeed from "@/features/feed/hooks/useFeed";

const CommentContainer = dynamic(
  () => import("@/shared/components/Comment/CommentContainer"),
  { ssr: false }
);
const ModalWithReport = dynamic(
  () => import("@/shared/components/ModalWithReport"),
  { ssr: false }
);

export type GroupEditProps = {
  id: string;
  name: string;
  description: string;
  groupImageUrl: string;
  members?: User[];
};

export default function FeedDetailPage() {
  const searchParams = useSearchParams();
  const { userInfo } = useAuth();
  const id = searchParams.get("id");

  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetStateAtom);

  const { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox } =
    useFriendsBox();
  const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);

  const { data: selectedFeed, isFetching } = useFeedDetail({
    id: id || "",
  });

  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const { deleteFeed, deleteComment, hideFeed, report } = useFeed();

  if (!selectedFeed) {
    return <FeedPageSkeleton />;
  }

  return (
    <Flex direction="column" className="w-full min-h-dvh">
      <HeaderWithBtn headerLabel="피드 상세" fontColor="black" />
      <div className={styles.feedWrapper}>
        {/**바로 아래의 pb를 높일수록 스크롤에 빨리 반응 */}
        <div className="pt-safe-top pb-14">
          <div
            className="mb-8"
            onClick={(e) => {
              closeDropdown(e);
              closeBox();
            }}
            onMouseDown={(e) => {
              closeDropdown(e);
              closeBox();
            }}
          >
            <div key={id} className="relative">
              <FeedCard feed={selectedFeed}>
                <InfoBar
                  ref={fBtnRef}
                  onClick={(e) => {
                    if (id) {
                      e.stopPropagation();
                      toggleBox(id);
                    }
                  }}
                  withMembers={selectedFeed.withMembers}
                  feed={selectedFeed}
                />
                <div className="absolute top-11 right-14" ref={friendsRef}>
                  {openedBoxId === id && (
                    <FriendsInfoContainer
                      withMembers={selectedFeed.withMembers}
                      isOpen={openedBoxId === id}
                    />
                  )}
                </div>
              </FeedCard>
              <div
                style={{ width: 24, height: 24 }}
                className={styles.optionWithDropdownContainer}
              >
                <button
                  type="button"
                  ref={btnRef}
                  aria-label="피드 옵션"
                  aria-haspopup="menu"
                  aria-expanded={openedDropdownId === selectedFeed.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(selectedFeed.id);
                    setSelectedFeedId(selectedFeed.id);
                  }}
                  className="flex justify-center items-center bg-transparent border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-900"
                >
                  <OptionsSelectIcon />
                </button>
                {openedDropdownId === selectedFeed.id && (
                  <FeedDropdownMenu
                    feed={selectedFeed}
                    ref={dropDownRef}
                    menuItems={
                      MENU_CONFIGS[
                        selectedFeed.writer.accountId === userInfo?.accountId
                          ? "feed_mine"
                          : "feed"
                      ].menuItems
                    }
                    className={
                      MENU_CONFIGS[
                        selectedFeed.writer.accountId === userInfo?.accountId
                          ? "feed_mine"
                          : "feed"
                      ].className
                    }
                  />
                )}
              </div>
            </div>
            {isFetching && <DotSpinnerSmall />}
          </div>
        </div>
      </div>

      {bottomSheetState && id && (
        <CommentContainer
          selectedFeedId={id}
          onClose={() => setBottomSheetState(false)}
        />
      )}

      <ModalWithReport
        onReport={report}
        deleteFeed={deleteFeed}
        deleteComment={deleteComment}
        hideFeed={hideFeed}
      />
    </Flex>
  );
}

const styles = {
  feedWrapper: "h-full overflow-y-scroll no-scrollbar pt-12 pb-14",
  optionWithDropdownContainer:
    "absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1",
};
