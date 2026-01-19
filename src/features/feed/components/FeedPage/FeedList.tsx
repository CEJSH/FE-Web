import React, { useCallback } from "react";
// import { useInfiniteScrollByRef } from "@/shared/hooks/useInfiniteScroll";
import { useDropdown, useFriendsBox } from "@/shared/hooks/useDropdown";
import FeedCard from "@/features/feed/components/FeedCard";
import InfoBar, { FriendsInfoContainer } from "@/features/feed/components/InfoBar";
import FeedDropdownMenu from "@/shared/components/DropDownMenu/FeedDropDownMenu";
import OptionsSelectIcon from "@/shared/components/Icon/OptionsSelectIcon";
import DotSpinnerSmall from "@/shared/components/Spinner/DotSpinnerSmall";
import { MENU_CONFIGS } from "@/shared/constants/menu-configs";
import { useSetRecoilState } from "recoil";
import { selectedFeedIdAtom } from "@/features/feed/state/feed";
import { UserInfoMini } from "@/shared/components/providers/AuthProvider";
import { FeedSkeleton } from "@/shared/components/Skeleton/FeedSkeleton";

interface FeedListProps {
  feeds: any[];
  userInfo: false | UserInfoMini | null;
  isFetching: boolean;
  isMine?: boolean;
}

const FeedListComponent: React.FC<FeedListProps> = ({
  feeds,
  userInfo,
  isFetching,
  isMine = false,
}) => {
  const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);

  const {
    btnRef,
    toggleDropdown,
    openedDropdownId,
    dropDownRef,
    closeDropdown,
  } = useDropdown();

  const { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox } =
    useFriendsBox();

  const handleListClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      closeDropdown(e);
      closeBox();
    },
    [closeDropdown, closeBox]
  );

  const handleToggleBox = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, feedId: string) => {
      e.stopPropagation();
      toggleBox(feedId);
    },
    [toggleBox]
  );

  const handleOpenMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, feedId: string) => {
      e.stopPropagation();
      toggleDropdown(feedId);
      setSelectedFeedId(feedId);
    },
    [setSelectedFeedId, toggleDropdown]
  );

  return (
    <div
      className="mb-8"
      onClick={handleListClick}
      onMouseDown={handleListClick}
    >
      {feeds.map((feed) => (
        <div key={feed.id} className="relative">
          <FeedCard feed={feed}>
            <InfoBar
              ref={fBtnRef}
              onClick={(e) => handleToggleBox(e, feed.id)}
              withMembers={feed.withMembers}
              feed={feed}
            />
            <div className="absolute top-11 right-14" ref={friendsRef}>
              {openedBoxId === feed.id && (
                <FriendsInfoContainer
                  withMembers={feed.withMembers}
                  isOpen={openedBoxId === feed.id}
                />
              )}
            </div>
          </FeedCard>

          <div
            style={{ width: 24, height: 24 }}
            className="absolute top-5 right-5 cursor-pointer flex justify-center items-center pt-[5.5px] pb-1"
          >
            <button
              type="button"
              ref={btnRef}
              aria-label="피드 옵션"
              aria-haspopup="menu"
              aria-expanded={openedDropdownId === feed.id}
              onClick={(e) => handleOpenMenu(e, feed.id)}
              className="flex justify-center items-center bg-transparent border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-900"
            >
              <OptionsSelectIcon />
            </button>
            {openedDropdownId === feed.id && (
              <FeedDropdownMenu
                feed={feed}
                ref={dropDownRef}
                menuItems={
                  MENU_CONFIGS[
                    userInfo === false
                      ? "hidden"
                      : feed.writer.accountId === userInfo?.accountId || isMine
                      ? "feed_mine"
                      : "feed"
                  ].menuItems
                }
                className={
                  MENU_CONFIGS[
                    userInfo === false
                      ? "hidden"
                      : feed.writer.accountId === userInfo?.accountId || isMine
                      ? "feed_mine"
                      : "feed"
                  ].className
                }
              />
            )}
          </div>
        </div>
      ))}
      {isFetching && (
        <div className="relative">
          <FeedSkeleton />
          <DotSpinnerSmall className="absolute top-0 w-full" />
        </div>
      )}
    </div>
  );
};

export const FeedList = React.memo(FeedListComponent);
