import Flex from "@/shared/components/Flex";
import PencilIcon from "@/shared/components/Icon/PencilIcon";
import { Gathering, GatheringInWhichType } from "@/models/gathering";
import { differenceInCalendarDays, format } from "date-fns";
import React, { MouseEvent, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { recordGatheringAtom, recordStepAtom } from "@/features/feed/state/record";
import { gatheringImageUrlAtom } from "@/features/gathering/state/gathering";
import clsx from "clsx";
import OptimizedImage from "@/shared/components/OptimizedImage";

const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty.jpg";

export default function GatheringCard({
  pencil = false,
  gathering,
  where,
  ended,
}: {
  pencil?: boolean;
  gathering: Gathering;
  where: GatheringInWhichType;
  ended: boolean;
  tabIndex: number;
}) {
  const setStep = useSetRecoilState(recordStepAtom);
  const setGatheringId = useSetRecoilState(recordGatheringAtom);
  const setInvitationUrl = useSetRecoilState(gatheringImageUrlAtom);
  const router = useRouter();
  const { date, diff } = useMemo(() => {
    const date = new Date(gathering.gatheringDate);
    const diff = differenceInCalendarDays(new Date(), date);
    return { date, diff };
  }, [gathering.gatheringDate]);

  const handleClickGathering = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setInvitationUrl(gathering.invitationImageUrl);
      setGatheringId(gathering.id);
      router.push("/record?ref=gathering");
      setStep(3);
    },
    [gathering, setGatheringId, setInvitationUrl, router, setStep]
  );

  const { invitationImageUrl, name } = gathering;
  return (
    <div
      className={styles.gatheringWrapper}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/gathering/detail?id=${gathering.id}?tab=2`);
      }}
    >
      <OptimizedImage
        loading="eager"
        style={{
          transformOrigin: "center center",
          transitionDuration: "50ms",
          zIndex: 0,
        }}
        src={!invitationImageUrl ? DEFAULT_IMAGE : invitationImageUrl}
        className={clsx(styles.image, "scale-110")}
        alt={name}
        width={200}
        height={200}
      />
      <div
        style={{
          background: styles.gradation,
        }}
        className="absolute bottom-0 left-0 right-0 h-[73.8%] dur"
      />
      <Flex direction="column" className={styles.textWrapper}>
        <span className="text-T4 truncate">{name}</span>
        <Flex className={styles.date}>
          <span className="flex-grow">{format(date, "yyyy.MM.dd")}</span>
          {where == "HOME" && (
            <span className="tracking-widest">
              {diff >= 0 ? `D+${diff}` : `D${diff}`}
            </span>
          )}
        </Flex>
      </Flex>
      {pencil || (!gathering.isFeedPosted && ended) ? (
        <div className={styles.button} onMouseDown={handleClickGathering}>
          <PencilIcon color="#0A0A0A" />
        </div>
      ) : null}
    </div>
  );
}

const styles = {
  gatheringWrapper:
    "group relative overflow-hidden rounded-2xl aspect-square cursor-pointer",
  image:
    "object-cover object-center group-hover:animate-smaller transition w-[200px] h-[200px]",
  gradation:
    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.9) 100%)",
  textWrapper:
    "z-10 absolute bottom-0 inset-x-0 p-[16px] pt-0 text-base-white gap-1",
  date: "w-full text-C2 text-grayscale-100 gap-1",

  button:
    "z-10 absolute top-[10px] right-[10px] bg-base-white rounded-[9.6px] p-2 active:bg-grayscale-100",
};
