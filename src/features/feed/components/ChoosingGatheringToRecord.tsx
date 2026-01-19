import { useRecoilState } from "recoil";
import Flex from "@/shared/components/Flex";
import LightyLogo from "@/shared/components/Icon/LightyLogo";
import Spacing from "@/shared/components/Spacing";
import { recordGatheringAtom } from "@/features/feed/state/record";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import useGatheringNoFeeds from "@/features/gathering/components/hooks/useGatheringNoFeed";
import NoGatheringToRecord from "@/features/gathering/components/NoGatheringToRecord";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import SelectableGatheringSwiper from "./SelectableGatheringSwiper";

export default function ChoosingGatheringToRecord({
  onNext,
}: {
  onNext: (gatheringId: string) => void;
}) {
  const { data: gathering_noFeed } = useGatheringNoFeeds({ limit: 30 });
  const [selectedGatheringId, setSelectedGatheringId] =
    useRecoilState(recordGatheringAtom);
  const { isReactNativeWebView } = useReactNativeWebView();

  const handleImageClick = (gatheringId: string) =>
    setSelectedGatheringId(gatheringId);

  const paddingX = { paddingLeft: 24, paddingRight: 24 };

  return (
    <>
      <Flex direction="column" style={paddingX}>
        <Spacing size={28} />
        <LightyLogo />
        <Spacing size={16} />
        <span className="text-T2">어떤 약속의</span>
        <Spacing size={7} />
        <span className="text-T2">추억을 기록할까요?</span>
        <Spacing size={16} />
        <span className="text-B3 text-grayscale-500">
          작성한 기록은 약속에 참여한 이들만 볼 수 있어요
        </span>
      </Flex>

      <Spacing size={40} />

      {!gathering_noFeed?.length ? (
        <Flex style={paddingX}>
          <NoGatheringToRecord />
        </Flex>
      ) : (
        <>
          <SelectableGatheringSwiper
            gathering={gathering_noFeed}
            onImageClick={handleImageClick}
            selectedGatheringId={selectedGatheringId}
          />
          <FixedBottomButton
            className={isReactNativeWebView ? "mb-safe-bottom" : ""}
            bgColor="#f4f4f4"
            disabled={!selectedGatheringId}
            label="기록 시작하기"
            onClick={() => selectedGatheringId && onNext(selectedGatheringId)}
          />
        </>
      )}
    </>
  );
}
