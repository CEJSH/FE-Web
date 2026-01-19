import Flex from "../Flex";

export default function CalendarSkeleton() {
  return (
    <Flex direction="column" className="gap-2 w-[302px]">
      <Flex className="gap-6 w-full py-2" justify="center" align="center">
        <div className="rounded-lg w-7 h-7 bg-grayscale-10" />
        <div className="w-10 h-7 bg-grayscale-10" />
        <div className="rounded-lg w-7 h-7 bg-grayscale-10" />
      </Flex>
      <Flex direction="column" className="gap-1 w-full">
        <div className="h-10 w-full bg-grayscale-10" />
        <div className="h-[258px] w-full bg-grayscale-10" />
      </Flex>
    </Flex>
  );
}
