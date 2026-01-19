import React from "react";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import SettingsMenuItem from "./SettingsMenuItem";
import type { UserDetailResponse } from "lighty-type";

export interface SettingsItem {
  title: string;
  info: null | string[];
  link: { href: string; target?: string };
}

export interface SettingsMenuPropsType {
  logout: () => void;
  user: UserDetailResponse;
  openAskPageFn: () => void;
  openSuggestPageFn: () => void;
}

const SettingsMenu = React.memo(
  ({
    logout,
    user,
    openAskPageFn,
    openSuggestPageFn,
  }: SettingsMenuPropsType) => {
    const clickSettingsListHandler = (list: SettingsItem) => {
      if (list.title === "로그아웃") {
        logout();
      } else if (list.title === "문의하기") {
        openAskPageFn();
      } else if (list.title === "건의하기") {
        openSuggestPageFn();
      }
    };

    return (
      <Flex direction="column" className="pt-8 gap-9">
        {settings.map((setting) => {
          return (
            <ul key={setting.category} className="flex flex-col">
              <span className="px-5 text-C1 text-grayscale-400">
                {setting.category}
              </span>
              {setting.list.map((list: SettingsItem, idx) => {
                return (
                  <ul key={idx} onClick={() => clickSettingsListHandler(list)}>
                    <Spacing size={8} />
                    <SettingsMenuItem
                      list={list}
                      link={list.link}
                      user={[`SNS 로그인(${user.provider})`]}
                    />
                  </ul>
                );
              })}
            </ul>
          );
        })}
      </Flex>
    );
  }
);

SettingsMenu.displayName = "SettingsMenu";

export default SettingsMenu;

const settings = [
  {
    category: "계정관리",
    list: [
      { title: "프로필 편집", info: null, link: { href: "/my/edit" } },
      { title: "피드 관리", info: null, link: { href: "/hidden" } },
    ],
  },
  {
    category: "고객센터",
    list: [
      {
        title: "문의하기",
        info: null,
        link: { href: "" },
      },
      {
        title: "건의하기",
        info: null,
        link: { href: "" },
      },
    ],
  },
  {
    category: "기타",
    list: [
      {
        title: "계정 정보",
        info: ["SNS 로그인(카카오)", "eun2763@naver.com"],
        link: { href: "" },
      },
      { title: "앱버전", info: ["V.1.0(최신버전)"], link: { href: "" } },
      {
        title: "알림 설정",
        info: null,
        link: { href: "/settings/notice" },
      },
      {
        title: "탈퇴하기",
        info: null,
        link: { href: "" },
      },
      {
        title: "로그아웃",
        info: null,
        link: { href: "" },
      },
    ],
  },
];
