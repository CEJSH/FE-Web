import GrouopItem from "@/features/groups/components/GroupItem";
import useGroup from "@/features/groups/components/hooks/useGroups";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import { useRouter } from "next/navigation";
import type { Group } from "lighty-type";
import useUserDetail from "@/features/users/components/hooks/useUserDetail";
import Link from "next/link";
import GroupSkeleton from "@/shared/components/Skeleton/GroupSkeleton";
import GroupListSkeleton from "@/shared/components/Skeleton/GroupListSkeleton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScrollRestorationOfRef } from "@/shared/hooks/useScrollRestorationOfRef";
import { useIntersectionLoadMore } from "@/features/feed/components/hooks/useIntersectionLoadMore";
import { useInView } from "react-intersection-observer";
import LoadMoreTrigger from "@/shared/components/LoadMoreTrigger";

const GroupList = ({
  groups,
  onItemClick,
}: {
  groups: Group[];
  onItemClick: (groupId: string) => void;
}) => {
  return (
    <ul className="flex flex-col gap-4 pb-20">
      {groups.map((group) => (
        <GrouopItem
          key={`${group.id}`}
          group={group}
          className="cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLLIElement>) => {
            e.preventDefault();
            onItemClick(group.id);
          }}
        />
      ))}
    </ul>
  );
};

export default function Groups() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const { data: detail } = useUserDetail();
  const {
    data: groups,
    isLoading,
    isFetchingNextPage,
    loadMore,
  } = useGroup({ limit: 6 });

  const { restoreScrollPosition } = useScrollRestorationOfRef(
    "social-scroll-tab",
    scrollContainerRef
  );

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    root: rootElement ?? undefined,
  });

  useIntersectionLoadMore({ inView, loadMore });

  useEffect(() => {
    if (scrollContainerRef.current) setRootElement(scrollContainerRef.current);
  }, []);

  useLayoutEffect(() => {
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  const handleItemClick = (groupId: string) => {
    router.push(`/groups/detail?id=${groupId}`);
  };
  return (
    <div
      ref={scrollContainerRef}
      className="h-[calc(100dvh-144px)] px-5 text-T4 mt-3 overflow-y-scroll no-scrollbar"
    >
      <Flex align="center">
        <span>전체 그룹</span>
        <Spacing size={4} direction="horizontal" />
        <span className="flex-grow">{detail?.groupCount}</span>
        <Spacing size={4} direction="horizontal" />
        <Link href="/groups/new" className={styles.button}>
          그룹 추가
        </Link>
      </Flex>
      <Spacing size={16} />

      {groups && <GroupList groups={groups} onItemClick={handleItemClick} />}

      {!groups && isLoading && <GroupListSkeleton />}
      {inView && isFetchingNextPage && <GroupSkeleton />}

      <LoadMoreTrigger loadMoreRef={loadMoreRef} />
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "bg-grayscale-50 py-2 px-3 bg-base-white text-T6 rounded-lg transition-transform cursor-pointer active:bg-grayscale-100",
};
