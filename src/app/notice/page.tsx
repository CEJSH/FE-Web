"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import useReadNotification from "@/features/notice/components/hooks/useReadNotification";
import Flex from "@/shared/components/Flex";
import NoticeContainer from "@/features/notice/components/NoticeContainer";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import type * as lighty from "lighty-type";
import type { InfiniteData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function NoticePage() {
  const queryClient = useQueryClient();
  const { mutate: read } = useReadNotification({
    onSuccess: () => {
      const now = new Date().toISOString();
      queryClient.setQueryData(
        queryKeys.notification.list(),
        (
          old:
            | InfiniteData<lighty.NotificationListResponse>
            | undefined
            | null
        ) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map((n) =>
                n.readAt ? n : { ...n, readAt: now }
              ),
            })),
          };
        }
      );
    },
  });

  useEffect(() => {
    read();
  }, []);

  return (
    <Flex direction="column" className="h-dvh bg-grayscale-50">
      <Suspense>
        <HeaderWithBtn headerLabel="알림" bgColor="#F4F4F4" />
        <NoticeContainer />
      </Suspense>
    </Flex>
  );
}
