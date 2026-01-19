import { bottomSheetStateAtom, selectedFeedIdAtom } from "@/features/feed/state/feed";
import Flex from "@/shared/components/Flex";
import MessageIcon from "@/shared/components/Icon/MessageIcon";
import Spacing from "@/shared/components/Spacing";
import { useSetRecoilState } from "recoil";

export default function ContentWithComments({
  feedId,
  content,
  commentCount,
}: {
  feedId: string;
  content: string;
  commentCount: number;
}) {
  const setBottomSheetState = useSetRecoilState(bottomSheetStateAtom);
  const setSelectedFeedId = useSetRecoilState(selectedFeedIdAtom);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{content}</div>
      <Spacing size={4} />
      <Flex align="center">
        <button
          type="button"
          aria-label={`댓글 ${commentCount}개 보기`}
          onClick={() => {
            setSelectedFeedId(feedId);
            setBottomSheetState(true);
          }}
          className="flex items-center bg-transparent border-0 p-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-900"
        >
          <MessageIcon />
          <Spacing direction="horizontal" size={2} />
          <span className="text-B4 text-grayscale-600">{commentCount}</span>
        </button>
      </Flex>
    </div>
  );
}
const styles = {
  wrapper: "pl-6 pr-4 max-w-[430px]",
  content:
    "break-words whitespace-normal overflow-wrap-anywhere text-B4 text-grayscale-800 pr-3",
};
