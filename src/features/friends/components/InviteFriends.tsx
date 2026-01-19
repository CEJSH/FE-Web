import SelectFriendsContainer from "@/features/friends/components/SelectFriendsContainer";
import SearchInput from "@/shared/components/Input/SearchBar";
import Spacing from "@/shared/components/Spacing";
import { Dispatch, SetStateAction } from "react";
import type * as lighty from "lighty-type";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";

export default function InviteFriends({
  setStep,
  type,
  exceptFriends,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  type: "default" | "group" | "gathering" | "groupEdit";
  exceptFriends?: lighty.User[] | null;
}) {
  return (
    <div>
      <HeaderWithBtn
        headerLabel="초대할 친구"
        bgColor="#F4F4F4"
        onClickBackBtn={() => setStep(1)}
      >
        <div className="w-full px-5">
          <Spacing size={20} />
          <SearchInput
            className="!bg-base-white"
            placeholder="이름/아이디로 검색하기"
          />
        </div>
        <Spacing size={16} />
      </HeaderWithBtn>
      <SelectFriendsContainer
        className="pt-safe-top"
        exceptFriends={exceptFriends}
        paddingTop={138}
        setStep={setStep}
        type={type}
      />
    </div>
  );
}
