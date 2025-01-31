import Flex from "../shared/Flex";
import LightyLogoForNavBar from "../shared/Icon/LightyLogoForNavBar";
import PencilIcon from "../shared/Icon/PencilIcon";
import Spacing from "../shared/Spacing";

type NoGatheringType = "ENDED" | "EXPECTING";

export default function NoGathering({ type }: { type: NoGatheringType }) {
  return (
    <Flex direction="column" align="center" className="pt-[200px] h-screen">
      <div className="w-[40px] h-[40px] p-[5px]">
        <LightyLogoForNavBar width="40" height="40" color="#D8D8D8" />
      </div>
      <Spacing size={13} />
      <span className="text-T4 text-grayscale-300">
        {type === "EXPECTING"
          ? "아직 예정된 약속이 없어요"
          : "완료된 약속이 없어요"}
      </span>
    </Flex>
  );
}

export function NoGatheringHome() {
  return (
    <div className="pt-3 grid grid-cols-2 gap-4">
      <div className="bg-grayscale-10 h-[168px] w-[168px] flex flex-col justify-center items-center rounded-[20px] border border-grayscale-200 border-dashed">
        <PencilIcon width="20" height="20" color="#D8D8D8" />
        <Spacing size={6} />
        <span className="text-C1 text-grayscale-300">기록할 모임이 없어요</span>
      </div>
    </div>
  );
}
