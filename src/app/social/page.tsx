"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { friendsSelectedTabAtom } from "@/features/friends/state/friends";
import GroupListSkeleton from "@/shared/components/Skeleton/GroupListSkeleton";
import { SocialHeader } from "@/shared/layout/Header/ScrollAwareHeader";
import UserFriendsListContainer from "@/features/friends/components/UserFriendsListContainer";

const Groups = dynamic(() => import("@/features/groups/components/Group"), {
  ssr: false,
  loading: () => <GroupListSkeleton />,
});

export default function FriendsAndGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const tabParam = searchParams?.get("tab");
  const derivedTab = tabParam ? (tabParam === "group" ? "2" : "1") : selectedTab;

  useEffect(() => {
    if (!tabParam) return;
    setSelectedTab(tabParam === "group" ? "2" : "1");
    router.replace("/social");
  }, [router, setSelectedTab, tabParam]);

  return (
    <div className="h-dvh pt-safe-top pb-safe-bottom">
      <SocialHeader selectedTab={derivedTab} setSelectedTab={setSelectedTab} />
      <div className="pt-[87px] pb-16">
        {derivedTab === "1" ? <UserFriendsListContainer /> : <Groups />}
      </div>
    </div>
  );
}
