import Flex from "@/shared/components/Flex";

export default function FriendToShareSkeleton() {
  return (
    <div className="w-full px-5 bg-grayscale-50 animate-pulse">
      <Flex className="pt-5 px-1 gap-4 pb-8" direction="column">
        <div className="w-6 h-6 rounded-[4px] bg-base-white" />
        <div className="w-[280px] h-[26px] rounded-[4px] bg-base-white" />
        <div className="w-[340px] h-5 rounded-[4px] bg-base-white" />
      </Flex>
      <div className="bg-base-white w-full h-[50px] mb-5 rounded-lg" />
      <Flex className="gap-4" direction="column">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <FriendItemSkeleton key={index} />
          ))}
      </Flex>
    </div>
  );
}

function FriendItemSkeleton() {
  return (
    <Flex className="px-4 py-[14px] w-full h-16 bg-base-white rounded-[20px] gap-2 items-center">
      <div className="w-9 h-9 rounded-full bg-grayscale-50 animate-pulse" />
      <Flex direction="column" className="gap-[2px]">
        <div className="w-[136px] h-[17px] rounded-[4px] bg-grayscale-50 animate-pulse" />
        <div className="w-[31px] h-[14px] rounded-[4px] bg-grayscale-50 animate-pulse" />
      </Flex>
    </Flex>
  );
}
