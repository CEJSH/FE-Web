"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import NewGroupForm from "@/features/groups/components/NewGroupForm";
import { useSetRecoilState } from "recoil";
import { newGroupAtom } from "@/features/groups/state/group";
import { CreateGroupRequest } from "@/models/group";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";

const InviteFriends = dynamic(
  () => import("@/features/friends/components/InviteFriends"),
  { ssr: false, loading: () => <DotSpinner /> }
);

export default function NewGroupPage() {
  const [step, setStep] = useState(1);
  const setNewGroup = useSetRecoilState<CreateGroupRequest>(newGroupAtom);

  useEffect(() => {
    return setNewGroup({
      name: "",
      description: "",
      friendIds: null,
      groupImageUrl: "",
    });
  }, []);

  if (step === 2) {
    return <InviteFriends setStep={setStep} type="group" />;
  }
  return (
    <div className="min-h-[calc(100dvh+74px)] bg-base-white">
      <HeaderWithBtn headerLabel="그룹 생성" bgColor="white" />
      <NewGroupForm step={step} setStep={setStep} />
    </div>
  );
}
