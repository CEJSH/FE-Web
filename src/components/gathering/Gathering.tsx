"use client";

import GatheringCard from "./GatheringCard";
import clsx from "clsx";
import Message from "../shared/Message";
import { usePathname, useRouter } from "next/navigation";
import { GATHERINGS } from "@/constants/gathering";
import { differenceInDays } from "date-fns";
import { useSetRecoilState } from "recoil";
import { recordGatheringAtom } from "@/atoms/record";
import { useMemo } from "react";

type GatheringProps = {
  className?: string;
  which: "1" | "2";
};

export default function Gathering({ className, which }: GatheringProps) {
  const router = useRouter();
  const setGatheringId = useSetRecoilState(recordGatheringAtom);
  const pathname = usePathname();

  const gatherings = useMemo(() => {
    const now = new Date();
    return GATHERINGS.reduce(
      (acc, gathering) => {
        const isPassed = differenceInDays(now, gathering.date) >= 0;
        if (isPassed) acc.passed.push(gathering);
        else acc.expecting.push(gathering);
        return acc;
      },
      { expecting: [], passed: [] } as {
        expecting: typeof GATHERINGS;
        passed: typeof GATHERINGS;
      }
    );
  }, []);

  const renderGatherings = (
    gatheringsList: typeof GATHERINGS,
    action: (id: string) => void
  ) =>
    gatheringsList.map((gathering, i) => (
      <GatheringCard
        key={`${gathering.name}-${i}`}
        gathering={gathering}
        onClick={() => action(gathering.id)}
        which={which}
      />
    ));

  return (
    <div className={clsx("pt-[155px] pb-[111px] w-full px-[20px]", className)}>
      {which === "2" && pathname.endsWith("gathering") && <Message />}
      <div className="grid grid-cols-2 gap-4">
        {which === "1"
          ? renderGatherings(gatherings.expecting, (id) =>
              router.push(`/gathering/${id}`)
            )
          : renderGatherings(gatherings.passed, setGatheringId)}
      </div>
    </div>
  );
}
