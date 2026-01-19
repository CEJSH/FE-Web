import Spacing from "@/shared/components/Spacing";
import { FeedList } from "@/features/feed/components/FeedPage/FeedList";
import { NoFeedHidden } from "@/features/feed/components/NoFeed";
import LoadMoreTrigger from "@/shared/components/LoadMoreTrigger";

interface Props {
  hiddenFeed: any[];
  isFetching: boolean;
  loadMoreRef: (node?: Element | null) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function HiddenFeedListSection({
  hiddenFeed,
  isFetching,
  loadMoreRef,
  scrollContainerRef,
}: Props) {
  return (
    <>
      <Spacing size={96} />
      <div ref={scrollContainerRef} className="pt-safe-top pb-14">
        {hiddenFeed && hiddenFeed.length < 1 && <NoFeedHidden />}
        {hiddenFeed && hiddenFeed.length > 0 && (
          <FeedList
            feeds={hiddenFeed}
            userInfo={false}
            isFetching={isFetching}
            isMine={true}
          />
        )}
        <LoadMoreTrigger loadMoreRef={loadMoreRef} />
      </div>
    </>
  );
}
