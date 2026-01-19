import Flex from "@/shared/components/Flex";
import Image from "next/image";
import Spacing from "@/shared/components/Spacing";
import { Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { BANNER_DATA } from "@/shared/constants/banner";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useRef } from "react";

export interface AD_IMAGE {
  src: string;
  className: string;
  width: number;
  height: number;
}

interface BannerSlide {
  subTitle: string;
  title: string;
  image: string;
  sliceAt: number;
  ad_image: AD_IMAGE | null;
}

const BannerSlide = ({
  subTitle,
  title,
  image,
  sliceAt,
  ad_image,
}: BannerSlide) => (
  <div className="relative w-full">
    <div className="h-[420px] w-full">
      <Image
        priority
        alt="homeBanner"
        src={image}
        width={600}
        height={420}
        className={styles.homeBannerImage}
      />
    </div>
    <Flex direction="column" className={styles.textWrapper}>
      <span className={styles.subTitle}>{subTitle}</span>
      <Flex direction="column">
        <span className={styles.title}>{title.slice(0, sliceAt)}</span>
        <Spacing size={6} />
        <span className={styles.title}>{title.slice(sliceAt)}</span>
      </Flex>
    </Flex>
    {ad_image != null && (
      <Image
        priority
        src={ad_image}
        alt={title}
        className={ad_image.className}
        width={ad_image.width}
        height={ad_image.height}
      />
    )}
  </div>
);

export default function HomeBannerContainer() {
  const targetRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver({
    elementRef: targetRef,
    threshold: 0.68,
  });

  const delaySeconds = 5000;

  return (
    <div ref={targetRef}>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: delaySeconds }}
        pagination={{ type: "fraction" }}
      >
        {BANNER_DATA.map((slide) => (
          <SwiperSlide key={slide.id}>
            <BannerSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  homeBannerImage: "h-[420px] object-cover",

  textWrapper: "absolute bottom-0 left-0 pl-6 pb-8 gap-2",
  subTitle:
    "text-base-white font-[500] text-[14px] leading-[24px] tracking-[-0.42px]",
  title: "text-base-white text-T1",
};
