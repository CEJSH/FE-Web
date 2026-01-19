import Flex from "@/shared/components/Flex";
import ThinLightyLogo from "@/shared/components/Icon/ThinLightyLogo";

export default function NoGatheringToRecord() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="bg-grayscale-10 w-[270px] h-[320px] border-[1px] border-dashed rounded-[20px] border-grayscale-200 gap-2"
    >
      <ThinLightyLogo width="24" height="24" />
      <span className="text-B4 text-grayscale-400">
        기록할 라이티 약속이 없어요!
      </span>
    </Flex>
  );
}
