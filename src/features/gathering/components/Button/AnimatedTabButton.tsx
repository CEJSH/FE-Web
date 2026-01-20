import { newGatheringInfo } from "@/features/gathering/state/gathering";
import type * as lighty from "lighty-type";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { GatheringType } from "@/models/gathering";

const AnimatedTabButton = () => {
  const [selectedGathering, setSelectedGathering] =
    useRecoilState<lighty.CreateGatheringRequest>(newGatheringInfo);

  const tabs = [
    { id: GatheringType.FRIEND, label: "일반 약속" },
    { id: GatheringType.GROUP, label: "그룹 약속" },
  ];

  return (
    <div className={styles.tabWrapper} role="tablist" aria-label="약속 종류">
      <div
        role="presentation"
        style={{
          boxShadow: "2px 0px 8px 0px #0000000F",
        }}
        className={clsx(
          styles.slider,
          selectedGathering.type === "GROUP"
            ? "translate-x-full"
            : "translate-x-0"
        )}
      />

      <div className="relative flex">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            role="tab"
            aria-selected={selectedGathering.type === tab.id}
            tabIndex={selectedGathering.type === tab.id ? 0 : -1}
            onClick={() =>
              setSelectedGathering((prev) => ({
                ...prev,
                type: tab.id,
              }))
            }
            className={clsx(
              styles.button,
              "bg-transparent border-0",
              selectedGathering.type === tab.id
                ? "text-grayscale-900"
                : "text-grayscale-500 active:text-grayscale-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabButton;

const styles = {
  tabWrapper: "relative p-1 bg-grayscale-10 rounded-full w-[158px]",

  slider:
    "absolute h-8 w-[75px] py-[10px] bg-base-white rounded-full shadow-md transition-transform ease-in-out",

  button:
    "cursor-pointer flex items-center h-8 px-4 py-[10px] rounded-full text-C1 transition-colors duration-300 z-10",
};
