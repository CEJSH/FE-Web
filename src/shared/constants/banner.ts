import { AD_IMAGE } from "@/features/home/components/HomeBannerContainer";
import {
  AD_IMAGE2,
  AD_IMAGE3,
  AD_IMAGE4,
  HOME_BANNER,
  HOME_BANNER_BACKGROUND,
} from "./images";

export const BANNER_DATA = [
  {
    id: 1,
    subTitle: "Welcome To Lighty",
    title: "소중한 당신의 추억을 기록하세요",
    image: HOME_BANNER,
    ad_image: null,
    sliceAt: 7,
  },
  {
    id: 2,
    subTitle: "친구 초대 이벤트",
    title: "'찐친' 1명만 추가해도 스티커팩 제공",
    image: HOME_BANNER_BACKGROUND,
    ad_image: {
      src: AD_IMAGE4,
      className: "absolute bottom-[100px] right-5",
      width: 224,
      height: 196,
    } as AD_IMAGE,
    sliceAt: 13,
  },
  {
    id: 3,
    subTitle: "모임 약속 만들기",
    title: "모임 약속을 만들어볼까요?",
    image: HOME_BANNER_BACKGROUND,
    ad_image: {
      src: AD_IMAGE2,
      className: "absolute bottom-[100px] right-0",
      width: 249,
      height: 202,
    } as AD_IMAGE,
    sliceAt: 6,
  },
  {
    id: 4,
    subTitle: "포토 카드 꾸미기",
    title: "다꾸말고 '포꾸'는 어때?",
    image: HOME_BANNER_BACKGROUND,
    ad_image: {
      src: AD_IMAGE3,
      className: "absolute bottom-[50px] right-3",
      width: 278,
      height: 251,
    } as AD_IMAGE,
    sliceAt: 4,
  },
];
