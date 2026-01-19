import Flex from "@/shared/components/Flex";

export default function NoSchedule() {
  return (
    <Flex
      className="w-full h-[140px] bg-grayscale-10 border-[1px] border-dashed border-grayscale-200 rounded-2xl"
      justify="center"
      align="center"
    >
      <span className="text-C1 text-grayscale-300">예정된 모임이 없어요</span>
    </Flex>
  );
}
