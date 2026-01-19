import React, { useState } from "react";
import type * as lighty from "lighty-type";
import Spacing from "@/shared/components/Spacing";
import Input from "@/shared/components/Input/Input";
import FeedIcon from "@/shared/components/Icon/FeedIcon";
import Flex from "@/shared/components/Flex";
import UserIcon from "@/shared/components/Icon/UserIcon";
import AddGroupSlider from "@/features/groups/components/AddGroupSlider";
import GatheringInput from "@/shared/components/Input/GatheringInput";
import { formatToKoreanTime } from "@/shared/utils/makeUTC";
import MapPinIcon from "@/shared/components/Icon/MapPinIcon";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import { isValid } from "date-fns";
import EmptyLogoIcon from "@/shared/components/Icon/EmptyLogoIcon";
import AnimatedTabButton from "@/shared/components/Button/AnimatedTabButton";
import PencilIcon from "@/shared/components/Icon/PencilIcon";
import CalendarIcon from "@/shared/components/Icon/CalendarIcon";
import { SetterOrUpdater } from "recoil";
import useGroup from "@/features/groups/components/hooks/useGroups";
import FullPageLoader from "@/shared/components/FullPageLoader";
import { lightyToast } from "@/shared/utils/toast";
import dynamic from "next/dynamic";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";

const AddFriendsSlider = dynamic(() => import("@/features/groups/components/AddFriendsSlider"), {
  ssr: false,
});
const CalendarBottomSheet = dynamic(
  () => import("@/shared/components/BottomDrawer/CalendarBottomSheet"),
  { ssr: false }
);

export default function GatheringForm({
  formType = "new",
  setStep,
  gathering,
  setGathering,
  mutate,
}: {
  formType: "new" | "edit";
  setStep: (step: number) => void;
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
  mutate?: () => void;
}) {
  const isGroupInfoValid = () => {
    if (
      gathering.name.length < 1 ||
      gathering.description.length < 1 ||
      gathering.type == null ||
      gathering.gatheringDate == null ||
      gathering.address.length < 1 ||
      (gathering.groupId == null && gathering.type === "GROUP") ||
      (gathering.friendIds == null && gathering.type === "FRIEND")
    ) {
      return false;
    } else return true;
  };

  const [calendarOpen, setCalendarOpen] = useState(false);
  const title = formType === "new" ? "약속 만들기" : "약속 수정";
  const { data: group_data, isFetching } = useGroup({ limit: 50 });

  return (
    <div className="min-h-[calc(100dvh+75px)] bg-base-white">
      <HeaderWithBtn headerLabel={title} bgColor="white" />
      <form className="flex flex-col px-5 pt-safe-top">
        <Spacing size={54} />
        <Flex align="center" className="h-[50px]">
          <EmptyLogoIcon color="#0A0A0A" />
          <Spacing size={4} direction="horizontal" />
          <span className="text-T5 flex-grow">약속 형태</span>
          <AnimatedTabButton />
        </Flex>
        <Spacing size={24} />
        <Input
          name="gatheringName"
          minLength={1}
          displayLength={10}
          value={gathering.name}
          onChange={(e) =>
            setGathering((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="약속 이름을 입력해 주세요."
          label={
            <>
              <PencilIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>약속 이름</span>
            </>
          }
        />
        <Spacing size={36} />
        <Input
          name="gatheringDesc"
          minLength={1}
          displayLength={40}
          value={gathering.description}
          onChange={(e) =>
            setGathering((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="약속 이름을 설명해 주세요."
          label={
            <>
              <FeedIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>약속 설명</span>
            </>
          }
        />
        <Spacing size={36} />
        <Flex align="center" className="text-T5">
          <UserIcon width="16" height="16" color="#0A0A0A" />
          <Spacing direction="horizontal" size={4} />
          <span>
            {gathering.type === "FRIEND" ? "초대할 친구" : "초대할 친구 그룹"}
          </span>
        </Flex>
        <Spacing size={8} />
        {gathering.type === "FRIEND" ? (
          <AddFriendsSlider
            setGathering={setGathering}
            setStep={setStep}
            type="gathering"
          />
        ) : isFetching ? (
          <FullPageLoader />
        ) : group_data ? (
          <div className="w-dwv overflow-x-scroll no-scrollbar">
            <AddGroupSlider
              group_data={group_data}
              setGatheringInfo={setGathering}
              gatheringInfo={gathering}
            />
          </div>
        ) : null}
        <Spacing size={36} />
        <div className="grid grid-cols-2 gap-4">
          <GatheringInput
            type="date"
            value={
              gathering.gatheringDate &&
              isValid(new Date(gathering.gatheringDate)) ? (
                <>
                  <span>
                    {formatToKoreanTime(gathering.gatheringDate).slice(0, 10)}
                  </span>
                  <Spacing size={8} />
                  <span>
                    {formatToKoreanTime(gathering.gatheringDate).slice(10)}
                  </span>
                </>
              ) : (
                "선택하기"
              )
            }
            onClick={() => setCalendarOpen(true)}
            label={
              <>
                <CalendarIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>약속 일정</span>
              </>
            }
          />
          <GatheringInput
            type="address"
            value={gathering.address ? gathering.address : "선택하기"}
            setValue={setGathering}
            label={
              <>
                <MapPinIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>약속 장소</span>
              </>
            }
          />
          <FixedBottomButton
            label={"다음"}
            onClick={() => {
              if (formType === "new") {
                if (isGroupInfoValid() === false) {
                  lightyToast.error("모든 정보를 입력해주세요.");
                } else {
                  setStep(3);
                }
              } else {
                if (mutate) mutate();
              }
            }}
            className="mb-safe-bottom"
          />
        </div>
      </form>
      {calendarOpen && (
        <CalendarBottomSheet
          onClose={() => setCalendarOpen(false)}
          open={calendarOpen}
        />
      )}
    </div>
  );
}
