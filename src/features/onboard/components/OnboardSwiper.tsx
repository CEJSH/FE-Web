"use client";

import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import Flex from "@/shared/components/Flex";
import type { Swiper as SwiperType } from "swiper";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import OptimizedImage from "@/shared/components/OptimizedImage";

export default function OnboardSwiper() {
  const { setUserInfo } = useAuth();
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [buttonText, setButtonText] = useState("다음");
  const [isLastSlide, setIsLastSlide] = useState(false);
  const router = useRouter();

  const handleNextClick = async () => {
    if (isLastSlide) {
      router.push("/feed?ref=signup");
      return;
    }
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (!!token && !!userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
  }, []);

  return (
    <div className="relative max-w-[430px] w-full h-dvh min-h-[400px] bg-grayscale-50 pt-safe-top">
      <Swiper
        modules={[Pagination, Navigation]}
        className="h-[calc(100dvh-76px)] mb-safe-bottom"
        slidesPerView={1}
        pagination={{ type: "bullets" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const isLast = swiper.isEnd;
          setIsLastSlide(isLast);
          setButtonText(isLast ? "시작하기" : "다음");
        }}
      >
        {onBoardCardContents.map(({ title, description, imageUrl }, idx) => (
          <SwiperSlide className="h-full" key={idx}>
            <Flex
              className="h-full pt-14 gap-10"
              direction="column"
              justify="space-between"
              align="center"
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="gap-4"
              >
                <span className="text-[24px] font-[600] leading-[31.2px]">
                  {title}
                </span>
                {description}
              </Flex>
              <OptimizedImage
                alt={`${title} 이미지`}
                src={imageUrl || "/placeholder.svg"}
                width={390}
                height={460}
                loading="eager"
                className="object-contain h-5/6"
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={styles.buttonWrapper}
        style={{
          zIndex: 20,
        }}
      >
        <button
          type="button"
          ref={nextButtonRef}
          className={styles.button}
          onClick={handleNextClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

const onBoardCardContents = [
  {
    title: "피드 작성",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>추억을 공유하고 싶은 이들을</span>
        <span>선택해서 피드를 작성해요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/1.webp",
  },
  {
    title: "피드 작성",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>내가 선택한 이들에게만</span>
        <span>피드가 보여져요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/2.webp",
  },
  {
    title: "포토 카드",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>오직 라이티만 있는 기능!</span>
        <span>피드를 포토카드로 만들 수 있어요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/3.webp",
  },
  {
    title: "약속 만들기",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>라이티에서는 친구들과</span>
        <span>특별한 약속을 만들 수 있어요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/4.webp",
  },
  {
    title: "초대장 보내기",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>약속 초대는 특별하게!</span>
        <span>귀여운 초대장을 보낼 수 있어요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/5.webp",
  },
];

const styles = {
  buttonWrapper:
    "absolute bottom-0 bg-base-white w-full px-5 py-3 font-[600] text-base text-center leading-[16.8px] pb-safe-bottom",
  button:
    "rounded-full bg-grayscale-900 py-[18px] w-full text-base-white cursor-pointer border-0",
};
