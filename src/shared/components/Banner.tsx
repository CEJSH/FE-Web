import Image from "next/image";
import Flex from "./Flex";
import ArrowRightWithBody from "./Icon/ArrowRightWithBody";
import { AD_BANNER } from "@/shared/constants/images";

export default function Banner() {
  return (
    <Flex className="relative mb-[52px] px-0">
      <Image
        alt="bannerImage"
        className="h-[124px] w-[450px]"
        width={450}
        height={124}
        src={AD_BANNER}
      />
      <Flex className={styles.textWrapper} align="center">
        <Flex direction="column">
          <span className={styles.text}>이 서비스 같이 쓸래? ❤️‍🔥</span>
          <span className={styles.text}>친구 초대하고 꾸미기템 받기</span>
        </Flex>
        <ArrowRightWithBody width="20" height="20" color="white" />
      </Flex>
    </Flex>
  );
}

const styles = {
  text: "text-base-white font-[600] text-base leading-[24px] tracking-[-0.48px]",
  textWrapper: "absolute top-[40px] left-[22px] gap-2",
};
