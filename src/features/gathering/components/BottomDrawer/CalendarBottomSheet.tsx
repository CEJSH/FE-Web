import type * as lighty from "lighty-type";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "@/shared/components/Button/Button";
import CalendarWithTime from "@/features/gathering/components/Calender/CalendarWithTime";
import Flex from "@/shared/components/Flex";
import {
  gatheringSelectedDateAtom,
  newGatheringInfo,
} from "@/features/gathering/state/gathering";
import { format } from "date-fns";
import makeUTC from "@/shared/utils/makeUTC";
import { useState } from "react";
import BottomSheetWrapper from "@/shared/components/BottomDrawer/shared/BottomSheetWrapper";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import clsx from "clsx";

export default function CalendarBottomSheet({
  setGatheringToEdit,
  open = true,
  onClose,
}: {
  setGatheringToEdit?: React.Dispatch<
    React.SetStateAction<Partial<lighty.CreateGatheringRequest>>
  >;
  open?: boolean;
  onClose: () => void;
}) {
  const selectedDate = useRecoilValue(gatheringSelectedDateAtom);
  const setGatheringInfo = useSetRecoilState(newGatheringInfo);
  const [ampm, setAmpm] = useState<"오전" | "오후">("오전");
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const { isReactNativeWebView } = useReactNativeWebView();

  return (
    <BottomSheetWrapper onClose={onClose} open={open} bar={false}>
      <Flex
        direction="column"
        className={clsx(
          "px-5 gap-10",
          isReactNativeWebView ? "pb-safe-bottom" : ""
        )}
        align="center"
      >
        <CalendarWithTime
          ampm={ampm}
          selectedTime={selectedTime}
          setAmpm={setAmpm}
          setSelectedTime={setSelectedTime}
        />
        <Button
          className={buttonStyle}
          disabled={selectedDate == null}
          onClick={() => {
            if (selectedDate !== null) {
              const converted = makeUTC({
                ampm,
                date: format(new Date(selectedDate.toString()), "yyyy-MM-dd"),
                time: selectedTime,
              });
              if (setGatheringToEdit) {
                setGatheringToEdit((prev) => ({
                  ...prev,
                  gatheringDate: converted,
                }));
              } else {
                setGatheringInfo((prev) => ({
                  ...prev,
                  gatheringDate: converted,
                }));
              }
            }
            onClose();
          }}
        >
          다음
        </Button>
      </Flex>
    </BottomSheetWrapper>
  );
}

const buttonStyle =
  "bg-grayscale-900 w-full py-[18px] text-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full";
