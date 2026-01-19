import Image from "next/image";
import Flex from "../Flex";
import { INVITATION } from "@/shared/constants/images";
import Spacing from "../Spacing";

export default function InvitationCardSkeleton() {
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
        />
        <>
          <Flex direction="column" className={styles.mainContentWrapper}>
            <Flex direction="column" justify="space-between" className="w-full">
              <span className="rounded-[4px] w-[174px] h-[23px] bg-grayscale-50 animate-pulse" />
              <Spacing size={8} />
              <span className="rounded-[4px] w-[118px] h-[14px] bg-grayscale-50 animate-pulse" />
            </Flex>
          </Flex>
          <Flex align="center" className={styles.subContentWrapper}>
            <span className="rounded-[4px] w-[78px] h-5 bg-grayscale-50 animate-pulse" />
          </Flex>
        </>
      </div>
    </Flex>
  );
}

const styles = {
  container: "w-full h-fit px-5",
  mainContentWrapper:
    "h-[173px] w-full max-w-[196px] gap-[54px] absolute py-6 pl-5 left-0 top-0",
  subContentWrapper: "w-full max-w-[188px] absolute pl-5 py-6 left-0 bottom-0",
};
