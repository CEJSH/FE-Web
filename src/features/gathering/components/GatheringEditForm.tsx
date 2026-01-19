import React, { Dispatch, SetStateAction, useState } from "react";
import type * as lighty from "lighty-type";
import Spacing from "@/shared/components/Spacing";
import Input from "@/shared/components/Input/Input";
import FeedIcon from "@/shared/components/Icon/FeedIcon";
import GatheringInput from "@/shared/components/Input/GatheringInput";
import { formatToKoreanTime } from "@/shared/utils/makeUTC";
import MapPinIcon from "@/shared/components/Icon/MapPinIcon";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import CalendarBottomSheet from "@/shared/components/BottomDrawer/CalendarBottomSheet";
import { isValid } from "date-fns";
import PencilIcon from "@/shared/components/Icon/PencilIcon";
import CalendarIcon from "@/shared/components/Icon/CalendarIcon";

export default function GatheringEditForm({
  type,
  setStep,
  gathering,
  setGathering,
  mutate,
}: {
  type: "new" | "edit";
  setStep: (step: number) => void;
  gathering: Partial<lighty.CreateGatheringRequest>;
  setGathering: Dispatch<
    SetStateAction<Partial<lighty.CreateGatheringRequest>>
  >;
  mutate?: () => void;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const isGroupInfoValid = () => {
    return (
      gathering.name &&
      gathering.description &&
      gathering.gatheringDate &&
      gathering.address &&
      gathering.name.length > 2 &&
      gathering.description.length > 1 &&
      gathering.address.length >= 1
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGathering((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGathering((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = () => {
    if (type === "new") {
      setStep(3);
    } else {
      setStep(0);
      mutate?.();
    }
  };

  if (!gathering) {
    return null;
  }
  return (
    <form className="flex flex-col px-5 pt-safe-top">
      <Spacing size={68} />
      <Input
        name="gatheringName"
        minLength={2}
        displayLength={10}
        value={gathering.name || ""}
        onChange={handleNameChange}
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
        minLength={10}
        displayLength={40}
        value={gathering.description || ""}
        onChange={handleDescriptionChange}
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
          type="editAddress"
          value={gathering.address ? gathering.address : "선택하기"}
          setEditValue={setGathering}
          label={
            <>
              <MapPinIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>약속 장소</span>
            </>
          }
        />
        <FixedBottomButton
          label={"수정 완료"}
          disabled={!isGroupInfoValid()}
          onClick={handleSubmit}
          className="mb-safe-bottom"
        />
      </div>
      <CalendarBottomSheet
        setGatheringToEdit={setGathering}
        onClose={() => setCalendarOpen(false)}
        open={calendarOpen}
      />
    </form>
  );
}
