import React, { useEffect, useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import { useRouter } from "next/navigation";
import Text from "../Text";
import UserIcon from "../Icon/UserIcon";
import PencilIcon from "../Icon/PencilIcon";
import ActionItem from "./ActionItem";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import { useSetRecoilState } from "recoil";
import { recordStepAtom } from "@/features/feed/state/record";

export default function MemoriesBottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const setStep = useSetRecoilState(recordStepAtom);
  const [isClosing, setIsClosing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    router.prefetch("/record");
    router.prefetch("/gathering/new");
  }, [router]);

  const handleActionClick = (link: string) => {
    if (isNavigating) return;

    setIsNavigating(true);
    setIsClosing(true);
    if (link === "/record") {
      setStep(1);
    }
    router.push(link);

    setTimeout(() => {
      onClose();
      setIsNavigating(false);
    }, 50);
  };
  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <BottomSheetWrapper
      onClose={() => setIsClosing(true)}
      open={open}
      isClosing={isClosing}
      handleAnimationEnd={handleAnimationEnd}
    >
      <Flex direction="column" className="p-6 pt-1">
        <Text className="text-T3">추억을 만들어볼까요?</Text>
        {actions.map((action) => {
          return (
            <React.Fragment key={`${action.title}`}>
              <Spacing size={20} />
              <ActionItem
                onClick={() => handleActionClick(action.link)}
                icon={action.icon}
                title={action.title}
                subTitle={action.subTitle}
              />
            </React.Fragment>
          );
        })}
      </Flex>
    </BottomSheetWrapper>
  );
}

const actions = [
  {
    icon: <PencilIcon />,
    title: "추억 기록하기",
    subTitle: "소중한 약속 추억을 기록하고 공유할 수 있어요",
    link: "/record",
  },
  {
    icon: <UserIcon width="18" height="18" color="#fff" />,
    title: "모임 약속 만들기",
    subTitle: "모임 약속을 만들고 친구들에게 약속 초대장을 보내요",
    link: "/gathering/new",
  },
];
