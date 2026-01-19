import TabButton from "@/shared/components/Panel/TabButton";
import { BottomLine } from "@/shared/components/BottomLine";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";

const styles = {
  tabContainerStyle: "flex w-full px-5 justify-between items-center",
  tabWrapperStyle: "w-fit",
};

export default function HiddenFeedPageHeader() {
  return (
    <HeaderWithBtn headerLabel="숨김 피드" bgColor="white">
      <div className={styles.tabContainerStyle}>
        <div className={styles.tabWrapperStyle}>
          <TabButton
            title="숨김 피드"
            onMouseDown={() => {}}
            current={true}
            fresh="never"
          />
          <BottomLine />
        </div>
      </div>
    </HeaderWithBtn>
  );
}
