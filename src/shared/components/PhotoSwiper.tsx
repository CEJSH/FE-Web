import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatToDisplay } from "@/shared/utils/makeUTC";
import { Feed } from "@/models/feed";
import { Lighty } from "@/shared/constants/images";
import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import OptimizedImage from "./OptimizedImage";

const PhotoSwiper = memo(
  ({ feed, percent = 1.077 }: { feed: Feed; percent?: number }) => {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const formattedDate = () => {
      const date = feed.gathering?.gatheringDate
        ? new Date(feed.gathering.gatheringDate)
        : new Date(feed.createdAt);
      return formatToDisplay(date).slice(0, 10);
    };

    return (
      <Swiper
        onClick={() => {
          router.push(`/feed/detail?id=${feed.id}`);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/feed/detail?id=${feed.id}`);
          }
        }}
        slidesPerView={percent}
        spaceBetween={12}
        grabCursor={true}
        style={{ paddingLeft: "20px" }}
        className="custom-swiper w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-900"
        role="link"
        aria-label="피드 상세 보기"
        tabIndex={0}
        onTouchStart={(_, e) => {
          e.stopPropagation();
        }}
        onTouchMove={(_, e) => {
          e.stopPropagation();
        }}
        onTouchEnd={(_, e) => {
          e.stopPropagation();
        }}
      >
        {feed.images.map((image, idx) => (
          <SwiperSlide
            className="relative bg-[#F4F4F4] rounded-2xl"
            key={`slide${idx}`}
          >
            {loaded === false && (
              <div className="absolute inset-0 rounded-2xl bg-grayscale-50" />
            )}
            <OptimizedImage
              loading={idx === 0 ? "eager" : undefined}
              src={image ? image : Lighty}
              alt={`feed image ${idx + 1}`}
              className={styles.image}
              width={340}
              height={360}
              key={`swiperImg${idx + 1}`}
              onLoad={() => setLoaded(true)}
            />

            {idx === 0 && (
              <div className={styles.feedImageInfo}>
                <span>{feed.gathering?.name}</span>
                <span>{formattedDate()}</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
);

PhotoSwiper.displayName = "PhotoSwiper";

export default PhotoSwiper;

const styles = {
  feedImageInfo:
    "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-4 py-[10px] rounded-b-[16px] bg-[#00000080]",
  gatheringImageInfo:
    "flex flex-col justify-between w-full absolute bottom-[-0.5px] text-grayscale-900 text-T5 p-3 pt-2 rounded-b-[16px] bg-base-white",
  image: "slide-img object-cover rounded-2xl aspect-[17/18]",
};
