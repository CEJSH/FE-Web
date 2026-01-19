import React from "react";
import TabButton from "./TabButton";
import Flex from "../Flex";
// import YearFilter from "../YearFilter";

export type PanelLength = "short" | "medium" | "long" | "longer";

function Panel({
  title1,
  title2,
  long,
  onClick,
  bgColor,
  selectedTab,
}: // year = true,
{
  title1?: string;
  title2?: string;
  long: PanelLength;
  bgColor?: string;
  onClick: (tabName: "1" | "2") => void;
  selectedTab: "1" | "2";
  // year?: boolean;
}) {
  return (
    <Flex
      justify="space-between"
      style={{
        backgroundColor: bgColor ? "#fff" : "",
      }}
      className={tabContainerStyle}
    >
      <div className={tabWrapperStyle}>
        <TabButton
          title={title1 ?? "left"}
          onMouseDown={() => onClick("1")}
          current={selectedTab === "1"}
        />
        <TabButton
          title={title2 ?? "mine"}
          onMouseDown={() => onClick("2")}
          current={selectedTab === "2"}
        />
        {long === "long" && <LongBottomLine activeTab={selectedTab} />}
        {long === "longer" && <LongerBottomLine activeTab={selectedTab} />}
        {long === "medium" && <BottomLine activeTab={selectedTab} />}
        {long === "short" && <ShortBottomLine activeTab={selectedTab} />}
      </div>
      {/* {year ? <YearFilter /> : null} */}
    </Flex>
  );
}

export default React.memo(Panel);

const tabContainerStyle = "max-w-[430px] w-full flex items-center";
const tabWrapperStyle = "relative flex gap-4";

function BottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`will-change-transform absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "w-[53px] translate-x-[48px]"
      }`}
    />
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

function ShortBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`will-change-transform absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "translate-x-[46px]"
      }`}
    />
  );
}

function LongerBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`will-change-transform absolute bottom-0 w-[38px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "!w-[68px] translate-x-[59px]"
      }`}
    />
  );
}
