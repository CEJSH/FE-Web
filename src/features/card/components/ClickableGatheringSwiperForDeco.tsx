import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import CheckIcon from "@/shared/components/Icon/CheckIcon";
import Flex from "@/shared/components/Flex";
import { Feed } from "@/models/feed";
import { useState } from "react";
import OptimizedImage from "@/shared/components/OptimizedImage";

interface Props {
  feed: Feed[];
  onImageClick?: (id: string) => void;
  selectedFeedId: string | null;
}

export default function ClickableGatheringSwiperForDeco({
  feed,
  onImageClick,
  selectedFeedId,
}: Props) {
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const handleGatheringClick = (id: string) => {
    if (!onImageClick) return;
    if (selectedFeedId === id) {
      onImageClick("");
      return;
    }
    onImageClick(id);
  };

  const handleImageLoad = (id: string) => {
    setLoadedMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1.4}
        spaceBetween={20}
        grabCursor={true}
        className="custom-swiper w-full h-[340px]"
      >
        {feed.map(({ gathering, id, content, images, createdAt }, idx) => (
          <SwiperSlide
            onClick={() => handleGatheringClick(id)}
            className={clsx(styles.slide, idx === 0 && "ml-5")}
            key={id}
          >
            {images[0] ? (
              <OptimizedImage
                loading={idx === 0 ? "eager" : undefined}
                src={images[0]}
                alt={`image of ${
                  gathering?.name || "feed"
                } created at ${createdAt}`}
                className={clsx(
                  styles.image,
                  "transition-opacity duration-75",
                  loadedMap[id] ? "opacity-100" : "opacity-0"
                )}
                width={270}
                height={320}
                onLoad={() => handleImageLoad(id)}
              />
            ) : (
              <div className="w-[270px] h-[320px] bg-grayscale-100" />
            )}
            {!loadedMap[id] && (
              <div className="absolute bg-grayscale-10 h-full" />
            )}
            <Flex direction="column" className={styles.gatheringInfoWrapper}>
              <span className="text-T3">{gathering?.name}</span>
              <span className={styles.content}>{content}</span>
            </Flex>
            {id === selectedFeedId ? (
              <Flex
                align="center"
                justify="center"
                className={styles.checkWrapper}
              >
                <CheckIcon />
              </Flex>
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  swiperContainer: "relative w-full bg-gray-50",
  slide:
    "relative !h-[320px] my-auto shadow-custom rounded-[20px] overflow-hidden",
  image: "slide-img object-cover w-[270px] h-[320px]",

  gatheringInfoWrapper:
    "gap-[6px] bg-base-white w-full absolute bottom-[-2px] px-5 pt-3 pb-6 rounded-b-[20px] z-10",
  checkWrapper: "absolute rounded-[20px] inset-0 bg-[#00000080] pb-[79px]",
  content:
    "text-C2 text-grayscale-600 text-ellipsis overflow-hidden whitespace-nowrap",
};
