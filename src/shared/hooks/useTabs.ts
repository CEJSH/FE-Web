import {
  feedTabState,
  gatheringTabState,
  invitationTabState,
} from "@/shared/state/tab";
import { usePathname } from "next/navigation";
import { useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { Swiper as SwiperType } from "swiper";

const getTabAtomForPath = (path: string) => {
  if (path.startsWith("/gathering")) {
    return gatheringTabState;
  } else if (path.startsWith("/feed")) {
    return feedTabState;
  } else if (path.startsWith("/invitation")) {
    return invitationTabState;
  }
  return feedTabState;
};

export const useTabs = () => {
  const pathname = usePathname();
  const tabAtom = getTabAtomForPath(pathname || "");
  const [selectedTab, setSelectedTab] = useRecoilState(tabAtom);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = useCallback(
    (index: number) => {
      setSelectedTab(String(index + 1) as "1" | "2");
    },
    [setSelectedTab]
  );

  const handleTabClick = useCallback(
    (tabName: "1" | "2") => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(Number(tabName) - 1);
      }

      setTimeout(() => {
        setSelectedTab(tabName);
      }, 300);
    },
    [setSelectedTab]
  );

  return {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
    setSelectedTab,
  };
};
