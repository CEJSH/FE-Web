import Flex from "@/shared/components/Flex";
import { SetterOrUpdater } from "recoil";
import SelectableGroupItem from "./SelectableGroupItem";
import type * as lighty from "lighty-type";

export default function AddGroupSlider({
  group_data,
  gatheringInfo,
  setGatheringInfo,
}: {
  group_data: lighty.Group[];
  gatheringInfo: lighty.CreateGatheringRequest;
  setGatheringInfo: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  if (!group_data) return;
  return (
    <Flex>
      {group_data.map((group, i) => (
        <SelectableGroupItem
          key={`groupItem${i}`}
          groupInfo={group}
          onClickGroup={() => {
            if (gatheringInfo.groupId === group.id) {
              setGatheringInfo((prev) => ({ ...prev, groupId: null }));
              return;
            }
            setGatheringInfo((prev) => ({ ...prev, groupId: group.id }));
          }}
          clicked={gatheringInfo.groupId === group.id}
        />
      ))}
    </Flex>
  );
}
