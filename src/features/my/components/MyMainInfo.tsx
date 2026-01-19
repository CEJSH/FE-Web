import React from "react";
import Flex from "@/shared/components/Flex";
import EmptyLogoIcon from "@/shared/components/Icon/EmptyLogoIcon";
import UserIcon from "@/shared/components/Icon/UserIcon";
import Spacing from "@/shared/components/Spacing";
import { useRouter } from "next/navigation";
import FolderIcon from "@/shared/components/Icon/FolderIcon";

export default function MyMainInfo({
  groupCount,
  feedCount,
  friendsCount,
}: {
  groupCount: number;
  feedCount: number;
  friendsCount: number;
}) {
  const router = useRouter();
  const boxes = [
    {
      label: "친구 그룹",
      icon: <FolderIcon width="16" height="16" color="#979797" />,
      value: groupCount,
      link: "/social?tab=group",
    },
    {
      label: "작성 피드",
      icon: <EmptyLogoIcon />,
      value: feedCount,
      link: "/feed?tab=2",
    },
    {
      label: "친구",
      icon: <UserIcon width="16" height="16" color="#979797" />,
      link: "/social?tab=friends",
      value: friendsCount,
    },
  ];

  const onClickHandler = (box: {
    label: string;
    icon: React.ReactNode;
    value: number;
    link: string;
  }) => {
    router.push(box.link);
  };

  return (
    <Flex className="py-0 px-5 gap-[14px]" justify="center">
      {boxes.map((box, idx) => {
        return (
          <button
            type="button"
            key={idx}
            className={boxStyle}
            onClick={() => onClickHandler(box)}
          >
            <div>{box.icon}</div>
            <Spacing size={4} />
            <span className="text-C1 text-grayscale-400 flex-none">
              {box.label}
            </span>
            <Spacing size={8} />
            <span className="text-T4">{box.value}</span>
          </button>
        );
      })}
    </Flex>
  );
}

const boxStyle =
  "cursor-pointer items-center flex flex-col min-w-[100px] py-4 px-6 bg-grayscale-10 rounded-[20px] active:bg-grayscale-50 border-0";
