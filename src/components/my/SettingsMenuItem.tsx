import React, { useState } from "react";
import Flex from "../shared/Flex";
import { SettingsItem } from "./SettingsMenu";
import Link from "next/link";
import Modal from "../shared/Modal/Modal";
import { deleteUser } from "@/remote/users";
import { lightyToast } from "@/utils/toast";

export default function SettingsMenuItem({
  list,
  link,
  user,
  logout,
}: {
  list: SettingsItem;
  link: { href: string; target?: string };
  user: string[];
  logout: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(logout);
  const handleClick = () => {
    if (list.title === "탈퇴하기") {
      setIsModalOpen(true);
    }
  };

  const accountDelete = async () => {
    try {
      await deleteUser();
    } catch (error) {
      if (error instanceof Error) {
        lightyToast.error(error.message);
      } else lightyToast.error(String(error));
    }
  };

  return (
    <Link {...link}>
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
      </li>
      {isModalOpen ? (
        <Modal
          action={accountDelete}
          title="탈퇴하시겠어요?"
          content="탈퇴 시 모든 활동 내용이 삭제되며 해당 정보는 복구할 수 없어요."
          left="닫기"
          right="탈퇴"
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </Link>
  );
}

const liStyle =
  "px-5 flex justify-between items-center py-5 cursor-pointer active:bg-grayscale-10 h-[54px]";
