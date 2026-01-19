import Flex from "@/shared/components/Flex";
import ArrowLeftIcon from "@/shared/components/Icon/ArrowLeftIcon";
import InvitationCardSkeleton from "@/shared/components/Skeleton/InvitationCardSkeleton";
import Spacing from "@/shared/components/Spacing";

export default function Loading() {
  return (
    <div className={"h-dvh pt-safe-top pb-safe-bottom"}>
      <div
        id="filter"
        className={
          "max-w-[430px] pt-safe-top fixed flex flex-col w-full bg-base-white"
        }
      >
        <div
          className={
            "min-w-[320px] max-w-[430px] w-full flex justify-between items-center h-12 text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px] gap-[6px] pl-[0px] pr-5"
          }
          style={{
            zIndex: 30,
            position: "fixed",
            top: 0,
          }}
        >
          <button className={"w-10 h-10 py-[10px] pl-[17px] pr-[3px]"}>
            <ArrowLeftIcon />
          </button>
          <div className="flex-1">초대장</div>
        </div>
        <div className="w-full px-5">
          <Flex
            justify="space-between"
            className={"max-w-[430px] w-full flex items-center"}
          >
            <div className={"relative flex gap-4"}>
              <div className={"flex cursor-pointer"}>
                <div
                  className={
                    "h-[39px] pt-[10px] pb-2 flex items-center text-T4 text-grayscale-900"
                  }
                >
                  받은 초대
                </div>
              </div>
              <div className={"flex cursor-pointer"}>
                <div className="h-[39px] pt-[10px] pb-2 flex items-center text-T4 text-grayscale-300">
                  보낸 초대
                </div>
              </div>
              <LongBottomLine activeTab={"1"} />
            </div>
          </Flex>
        </div>
      </div>
      <div className="h-dvh pt-safe-top">
        <Spacing size={110} />
        <InvitationCardSkeleton />
        <Spacing size={24} />
        <InvitationCardSkeleton />
        <Spacing size={24} />
        <InvitationCardSkeleton />
      </div>
    </div>
  );
}

function LongBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`will-change-transform absolute bottom-0 w-[58px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "translate-x-[76px]"
      }`}
    />
  );
}
