import React, { useState } from "react";
import Flex from "@/shared/components/Flex";
import { SettingsItem } from "./SettingsMenu";
import Modal from "@/shared/components/Modal/Modal";
import { deleteUser } from "@/features/users/api/users";
import { lightyToast } from "@/shared/utils/toast";
import useUserDetail from "@/features/users/components/hooks/useUserDetail";
import { appleLoginMobile } from "@/webview/actions";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { logger } from "@/shared/utils/logger";

export default function SettingsMenuItem({
  list,
  link,
  user,
}: {
  list: SettingsItem;
  link: { href: string };
  user: string[];
}) {
  const { data: userInfo } = useUserDetail();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (list.title === "탈퇴하기") {
      setIsModalOpen(true);
    } else {
      if (link.href !== "") {
        router.push(link.href);
      }
    }
  };

  const accountDelete = async () => {
    if (userInfo?.provider === "APPLE") {
      appleLoginMobile();
      return;
    }

    try {
      const deleted = await deleteUser();
      if (deleted) {
        logout();
      }
    } catch (error) {
      logger.error("account deletion error", error);
      lightyToast.error("accountdeletion error");
    }
  };

  return (
    <li className={liStyle} onClick={handleClick}>
      <span className="text-T5">{list.title}</span>
      <Flex direction="column" justify="center" style={{ gap: "2px" }}>
        {list.info?.map((info, i) => {
          return (
            <span key={i} className="text-C2 text-grayscale-300">
              {list.title === "계정 정보" ? user[i] : info}
            </span>
          );
        })}
      </Flex>
      {isModalOpen ? (
        <Modal
          action={accountDelete}
          title="탈퇴하시겠어요?"
          content="30일 이내에 로그인 시 계정이 복구되며, 이후엔 불가해요."
          left="닫기"
          right="탈퇴"
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </li>
  );
}

const liStyle =
  "px-5 flex justify-between items-center py-5 cursor-pointer active:bg-grayscale-10 h-[54px]";
