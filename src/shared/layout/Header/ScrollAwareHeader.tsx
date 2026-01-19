"use client";

import { DotWithNumberIcon } from "@/shared/components/Icon/DotIcon";
import MailIcon from "@/shared/components/Icon/MailIcon";
import NoticeIcon from "@/shared/components/Icon/NoticeIcon";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import clsx from "clsx";
import Panel from "@/shared/components/Panel/Panel";
import Header from ".";

interface ScrollAwareHeaderProps extends FeedHeaderProps {
  visible: boolean;
}

interface HeaderProps {
  className?: string;
  selectedTab: "1" | "2";
  setSelectedTab: (tabName: "1" | "2") => void;
}

interface FeedHeaderProps {
  className?: string;
  mailCount: number;
  selectedTab: "1" | "2";
  handleTabClick: (tab: "1" | "2") => void;
  isNewNotification: number;
}

const IconButton = ({
  onClick,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) => (
  <div
    onMouseDown={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className="relative flex justify-center items-center w-10 h-10 p-2 cursor-pointer"
  >
    {children}
  </div>
);

const FeedHeader = React.memo(
  ({
    className,
    mailCount,
    selectedTab,
    handleTabClick,
    isNewNotification,
  }: FeedHeaderProps) => {
    const router = useRouter();
    const handleInvitationClick = useCallback(() => {
      router.push("/invitation");
    }, [router]);
    const handleNoticeClick = useCallback(() => {
      router.push("/notice");
    }, [router]);
    const headerIcon = useMemo(
      () => (
        <div className="flex items-center gap-1">
          <IconButton onClick={handleInvitationClick}>
            <MailIcon
              className="relative"
              width="24"
              height="24"
              color="#0A0A0A"
            />
            {mailCount >= 1 && <DotWithNumberIcon count={mailCount} />}
          </IconButton>
          <IconButton onClick={handleNoticeClick}>
            <NoticeIcon color="#0A0A0A" />
            {isNewNotification >= 1 && (
              <DotWithNumberIcon count={isNewNotification} />
            )}
          </IconButton>
        </div>
      ),
      [handleInvitationClick, handleNoticeClick, mailCount, isNewNotification]
    );
    return (
      <Header
        className={className}
        headerLabel="추억 피드"
        icon={headerIcon}
      >
        <div id="filter">
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="전체"
            title2="마이"
            onClick={handleTabClick}
          />
        </div>
      </Header>
    );
  }
);

FeedHeader.displayName = "FeedHeader";

export const GatheringHeader = React.memo(
  ({ className, selectedTab, setSelectedTab }: HeaderProps) => {
    return (
      <Header className={className} headerLabel="약속">
        <Panel
          selectedTab={selectedTab}
          long="short"
          title1="예정"
          title2="완료"
          onClick={setSelectedTab}
        />
      </Header>
    );
  }
);

GatheringHeader.displayName = "GatheringHeader";

export const SocialHeader = React.memo(
  ({ className, selectedTab, setSelectedTab }: HeaderProps) => {
    return (
      <Header className={className} headerLabel="소셜">
        <Panel
          title1="친구"
          title2="그룹"
          long="short"
          selectedTab={selectedTab}
          onClick={setSelectedTab}
        />
      </Header>
    );
  }
);

SocialHeader.displayName = "SocialHeader";

export function ScrollAwareHeader({
  visible,
  selectedTab,
  handleTabClick,
  isNewNotification,
  mailCount,
}: ScrollAwareHeaderProps) {
  return (
    <FeedHeader
      className={clsx(
        "pt-safe-top bg-base-white/80 backdrop-blur-md transition-transform duration-300 ease-in-out z-20",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
      selectedTab={selectedTab}
      handleTabClick={handleTabClick}
      isNewNotification={isNewNotification}
      mailCount={mailCount}
    />
  );
}
