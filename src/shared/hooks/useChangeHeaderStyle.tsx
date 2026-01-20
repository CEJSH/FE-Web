import { useEffect } from "react";
import { useScrollNew } from "./useScrollNew";
import { useSetRecoilState } from "recoil";
import { scrollProgressAtom } from "@/shared/state/scroll";

export default function useChangeHeaderStyle({
  scrollReady,
}: {
  scrollReady: boolean;
}) {
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);

  const scrollContainer = scrollReady ? "scrollable-container" : undefined;

  const { scrollProgress } = useScrollNew(scrollContainer, 92);

  useEffect(() => {
    setScrollProgress(scrollProgress);
  }, [scrollProgress, setScrollProgress]);
}
