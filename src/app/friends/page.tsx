"use client";
import SentReceivedFriendRequestsList from "@/features/friends/components/SentReceivedFriendRequestsList";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import { useRouter } from "next/navigation";

export default function FriendsPage() {
  const router = useRouter();
  return (
    <div className="bg-grayscale-50 h-dvh">
      <HeaderWithBtn
        headerLabel="친구 요청"
        bgColor="#F4F4F4"
        onClickBackBtn={() => router.back()}
      />
      <SentReceivedFriendRequestsList />
    </div>
  );
}
