import React, { Dispatch, SetStateAction } from "react";
import SearchInput from "@/shared/components/Input/SearchBar";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import Flex from "@/shared/components/Flex";
import SelectFriendsContainer from "@/features/friends/components/SelectFriendsContainer";
import SelectableSearchedFriendsListContainer from "@/features/friends/components/SelectableSearchedFriendsListContainer";
import { useRecoilValue } from "recoil";
import { friendToRecordAtom } from "@/features/feed/state/record";
import useDebounce from "@/shared/hooks/debounce";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ChooseFriendToShare({ setStep }: Props) {
  const search = useRecoilValue(friendToRecordAtom);
  const debouncedSearch = useDebounce(search);

  const listContainerClass =
    "!px-0 !h-[calc(100dvh-288px)] overflow-y-scroll no-scrollbar";

  const hasSearch = Boolean(debouncedSearch);

  return (
    <div className="max-w-[430px] bg-grayscale-50 min-h-dvh">
      <Flex direction="column" className="pt-5 px-6 gap-4 text-T2">
        <LightyIcon width="24" height="24" color="#0A0A0A" />
        <span>추억을 공유하고 싶은 사람이 있나요?</span>
        <span className="text-B3 text-grayscale-500 mb-4">
          공유하고 싶은 친구에게만 작성된 피드가 보여요.
        </span>

        <SearchInput
          placeholder="이름/아이디로 검색하기"
          type="record"
          className="!bg-base-white placeholder:!text-grayscale-300 placeholder:!font-[500]"
        />

        {hasSearch ? (
          <SelectableSearchedFriendsListContainer
            className={listContainerClass}
            debouncedSearch={debouncedSearch}
            action={() => setStep(3.5)}
          />
        ) : (
          <SelectFriendsContainer
            className={listContainerClass}
            paddingTop={0}
            type="record"
            setStep={setStep}
          />
        )}
      </Flex>
    </div>
  );
}
