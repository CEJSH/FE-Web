import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import CheckIcon from "@/shared/components/Icon/CheckIcon";
import Flex from "@/shared/components/Flex";
import OptimizedImage from "@/shared/components/OptimizedImage";
import { Gathering } from "@/models/gathering";

interface Props {
  gathering: Gathering[];
  onImageClick?: (gatheringId: string) => void;
  selectedGatheringId: string;
}

export default function SelectableGatheringSwiper({
  gathering,
  onImageClick,
  selectedGatheringId,
}: Props) {
  const handleClick = (id: string) => {
    if (!onImageClick) return;
    onImageClick(selectedGatheringId === id ? "" : id);
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        className={styles.swiper}
        slidesPerView={1.4}
        spaceBetween={12}
        grabCursor
        slidesOffsetBefore={20} // 첫 슬라이드 좌측 여백
      >
        {gathering.map(({ invitationImageUrl, id, name, description }) => (
          <SwiperSlide
            className={styles.slide}
            key={id}
            onClick={() => handleClick(id)}
          >
            <OptimizedImage
              className={styles.image}
              src={invitationImageUrl}
              alt={`Invitation image of ${name}`}
              width={270}
              height={320}
            />
            <Flex className={styles.infoWrapper} direction="column">
              <span className="text-T3">{name}</span>
              <span className="text-C2 text-grayscale-600">{description}</span>
            </Flex>
            {id === selectedGatheringId && (
              <Flex
                className={styles.checkOverlay}
                align="center"
                justify="center"
              >
                <CheckIcon />
              </Flex>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  swiperContainer: "relative w-full bg-gray-50",
  swiper: "custom-swiper w-full h-[340px]",
  slide:
    "relative !h-[320px] my-auto shadow-custom rounded-[20px] overflow-hidden",
  image: "w-[270px] h-[320px] object-cover",
  infoWrapper:
    "absolute bottom-0 left-0 w-full bg-base-white pl-5 pt-3 pb-6 gap-[6px] rounded-b-[20px] z-10",
  checkOverlay:
    "absolute inset-0 rounded-[20px] bg-[#00000080] pb-[79px] flex items-center justify-center",
};
