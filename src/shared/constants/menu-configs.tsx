import { MENU_TYPES } from "@/models/dropdown";

export const MENU_CONFIGS = {
  [MENU_TYPES.FEED_MINE]: {
    menuItems: ["숨기기", "수정하기", "삭제하기"],
    className: "z-100 absolute -bottom-[142px] right-[4px]",
  },
  [MENU_TYPES.FEED]: {
    menuItems: ["숨기기", "신고하기"],
    className: "z-100 absolute -bottom-[94px] right-[4px]",
  },
  [MENU_TYPES.HIDDEN]: {
    menuItems: ["숨김 해제"],
    className: "z-100 absolute -bottom-[42px] right-[4px]",
  },
  [MENU_TYPES.COMMENT]: {
    items: ["신고하기"],
  },
  [MENU_TYPES.COMMENT_MINE]: {
    items: ["삭제하기"],
  },
  [MENU_TYPES.GATHERING]: {
    items: ["약속 삭제하기", "약속 수정하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
  [MENU_TYPES.GATHERING_ENDED]: {
    items: ["약속 삭제하기"],
    className: "absolute -bottom-[44px] -right-[4px]",
  },
  [MENU_TYPES.FRIEND]: {
    items: ["친구 삭제", "유저 신고하기"],
    className: "absolute -bottom-[104px] -right-[4px]",
  },
};
