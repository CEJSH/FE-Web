import { useRecoilState } from "recoil";
import Flex from "@/shared/components/Flex";
import LightyLogo from "@/shared/components/Icon/LightyLogo";
import Spacing from "@/shared/components/Spacing";
import useFeedMine from "@/features/feed/components/hooks/useFeedMine";
import { cardSelectedFeedAtom } from "@/features/card/state/card";
import { maxDate, minDate } from "@/shared/constants/time";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { NoFeedToMakeCard } from "@/features/feed/components/NoFeed";
import ClickableGatheringSwiperForDeco from "./ClickableGatheringSwiperForDeco";

export default function ChoosingGatheringToDecorate({
  onNext,
}: {
  onNext: () => void;
}) {
  const router = useRouter();
  const [selectedFeedId, setSelectedFeedId] =
    useRecoilState(cardSelectedFeedAtom);

  const { data } = useFeedMine({
    order: "DESC",
    minDate: minDate(),
    maxDate: maxDate(),
    limit: 20,
  });

  const handleImageClick = (id: string) => {
    setSelectedFeedId((prev) => (prev === id ? "" : id));
  };

  const feeds = data;

  return (
    <Flex
      direction="column"
      justify="space-between"
      className="h-dvh relative pt-safe-top pb-safe-bottom overflow-y-scroll no-scrollbar"
    >
      <Flex direction="column">
        <div className="px-6">
          <Spacing size={76} />
          <LightyLogo />
          <Spacing size={16} />
          <span className="text-T2">어떤 피드의</span>
          <Spacing size={7} />
          <span className="text-T2">포토 카드를 꾸밀까요?</span>
          <Spacing size={16} />
          <span className="text-B3 text-grayscale-500">
            직접 작성한 피드만 카드로 꾸밀 수 있어요.
          </span>
          <Spacing size={20} />
        </div>
        {!feeds || feeds.length < 1 ? (
          <NoFeedToMakeCard />
        ) : (
            <ClickableGatheringSwiperForDeco
              feed={feeds}
              onImageClick={handleImageClick}
              selectedFeedId={selectedFeedId || null}
            />
        )}
      </Flex>
      <div className={styles.buttonWrapper}>
        {feeds && feeds.length < 1 ? (
          <button
            className={styles.button}
            onClick={() => {
              router.push("/record");
            }}
          >
            {"피드 작성하러 가기"}
          </button>
        ) : (
          <button
            className={clsx(
              styles.button,
              selectedFeedId === "" && "!bg-grayscale-200"
            )}
            disabled={selectedFeedId === ""}
            onClick={() => {
              onNext();
            }}
          >
            {"꾸미기 시작!"}
          </button>
        )}
      </div>
    </Flex>
  );
}

const styles = {
  button: `bg-grayscale-900 active:bg-grayscale-700 w-full py-[18px] flex justify-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full`,
  buttonWrapper: `w-full px-5 pt-3 animate-slide-up will-change-transform pb-16`,
};
