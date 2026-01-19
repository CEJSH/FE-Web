import { useEffect, useCallback, useMemo } from "react";
import { useScrollNew } from "./useScrollNew";
import { useSetRecoilState } from "recoil";
import { scrollProgressAtom } from "@/shared/state/scroll";

export default function useChangeHeaderStyle({
  scrollReady,
}: {
  scrollReady: boolean;
}) {
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);

  const scrollContainer = useMemo(
    () => (scrollReady ? "scrollable-container" : undefined),
    [scrollReady]
  );

  const { scrollProgress } = useScrollNew(scrollContainer, 92);

  const updateScrollState = useCallback(() => {
    setScrollProgress(scrollProgress);
  }, [scrollProgress, setScrollProgress]);

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState]);
}
