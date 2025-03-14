"use client";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import { useRouter } from "next/navigation";

export default function FriendsPage() {
  const router = useRouter();
  return (
    <div className="bg-grayscale-50 h-dvh overflow-y-scroll no-scrollbar">
      <HeaderWithBtn
        headerLabel="친구 요청"
        bgColor="#F4F4F4"
        onClickBackBtn={() => router.back()}
      />
      <SentReceivedFriendRequestsList />
    </div>
  );
}
