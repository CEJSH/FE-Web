import Flex from "@/shared/components/Flex";
import ThinLightyLogo from "@/shared/components/Icon/ThinLightyLogo";

type NoGatheringType = "ENDED" | "EXPECTING";

export default function NoGathering({ type }: { type: NoGatheringType }) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-full gap-[13px]"
    >
      <div className="w-10 h-10 p-[5px]">
        <ThinLightyLogo />
      </div>
      <span className="text-T4 text-grayscale-300">
        {type === "EXPECTING"
          ? "아직 예정된 약속이 없어요"
          : "완료된 약속이 없어요"}
      </span>
    </Flex>
  );
}
