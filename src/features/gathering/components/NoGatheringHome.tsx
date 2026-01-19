import PencilIcon from "@/shared/components/Icon/PencilIcon";
import Spacing from "@/shared/components/Spacing";

export default function NoGatheringHome({ type }: { type?: "slider" }) {
  return (
    <div className="pt-3 grid grid-cols-2 gap-4">
      <div className="bg-grayscale-10 h-[168px] w-[168px] flex flex-col justify-center items-center rounded-[20px] border border-grayscale-200 border-dashed">
        <PencilIcon width="20" height="20" color="#D8D8D8" />
        <Spacing size={6} />
        <span className="text-C1 text-grayscale-300">
          {type == "slider" ? "예정된 약속이 없어요" : "기록할 모임이 없어요"}
        </span>
      </div>
    </div>
  );
}
