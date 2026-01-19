import Image from "next/image";
import Button from "@/shared/components/Button/Button";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import { useSetRecoilState } from "recoil";
import { selectedInvitationIdAtom } from "@/features/invitation/state/invitation";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { INVITATION } from "@/shared/constants/images";

type InvitationItem = {
  id?: string;
  gatheringId: string;
  name: string;
  description: string;
  sender: string;
  createdAt: string;
};

export default function InvitationCard({
  invitation,
  onClickOpen,
}: {
  invitation: InvitationItem;
  onClickOpen: (value: boolean) => void;
}) {
  const setSelectedInvitationId = useSetRecoilState(selectedInvitationIdAtom);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { name, description, sender, createdAt } = invitation;
  const date = new Date(createdAt);
  const diff = differenceInCalendarDays(new Date(), new Date(date));

  if (!invitation) return null;
  return (
    <Flex className={styles.container} justify="center">
      <div className="relative">
        <Image
          priority
          src={INVITATION}
          className="!h-[169px] w-[350px] flex-grow"
          width={350}
          height={169}
          alt="invitationImage"
          onLoad={() => setImageLoaded(true)}
        />

        {imageLoaded && (
          <>
            <Flex direction="column" className={styles.mainContentWrapper}>
              <Flex
                direction="column"
                justify="space-between"
                className="w-full"
              >
                <span className="text-T3">{name} ♡✧。</span>
                <Spacing size={8} />
                <span className="text-C2 text-grayscale-500">
                  {description}
                </span>
              </Flex>
            </Flex>
            <Flex align="center" className={styles.subContentWrapper}>
              <span className="text-B4 text-grayscale-300">from</span>
              <Spacing size={4} direction="horizontal" />
              <span className="text-B4 flex-grow">{sender}</span>
              <Spacing size={4} direction="horizontal" />
              <span className="text-C2 text-grayscale-300">
                {diff <= 0 ? `${Math.abs(diff)}일 전` : `${diff}일 지남`}
              </span>
            </Flex>
            <Button
              onClick={() => {
                const invitationId = invitation.id ?? invitation.gatheringId;
                setSelectedInvitationId(invitationId);
                onClickOpen(true);
              }}
              color="#0A0A0A"
              className={styles.button}
            >
              열기
            </Button>
          </>
        )}
      </div>
    </Flex>
  );
}

const styles = {
  container: "w-full h-fit px-5",
  mainContentWrapper:
    "h-[173px] w-full max-w-[196px] gap-[54px] absolute py-6 pl-5 left-0 top-0",
  subContentWrapper: "w-full max-w-[188px] absolute pl-5 py-6 left-0 bottom-0",

  button:
    "absolute right-[20px] bottom-[24px] h-fit text-C1 flex-none px-6 py-3 rounded-[36px] text-base-white active:animate-shrink-grow-less",
};
