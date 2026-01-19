import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFriendAtom } from "@/features/friends/state/friends";
import FriendsListContainer from "./FriendsListContainer";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/shared/state/modal";
import { lightyToast } from "@/shared/utils/toast";
import useReport from "@/features/report/components/hooks/useReport";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import useFriends from "./hooks/useFriends";
import Flex from "@/shared/components/Flex";
import Link from "next/link";
import ArrowRightIcon from "@/shared/components/Icon/ArrowRightIcon";
import useFriendsRequestTotalCount from "./hooks/useFriendsRequestCount";
import ModalWithReport from "@/shared/components/ModalWithReport";
import { queryKeys } from "@/lib/queryKeys";

export default function UserFriendsListContainer() {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();

  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModalOpen, setReportModalOpen] = useRecoilState(reportModalAtom);
  const [reportContent, setReportContent] = useRecoilState(reportInfoAtom);
  const selectedFriendId = useRecoilValue(selectedFriendAtom);

  const { data: requestCount = { count: 0 }, isFetching: isFetching_c } =
    useFriendsRequestTotalCount();

  const {
    data: friends,
    loadMore,
    isFetching,
  } = useFriends({
    userId: userInfo?.accountId || "",
  });

  const deleteSuccessHandler = async (data: { message: string }) => {
    lightyToast.success(data.message);
    await queryClient.invalidateQueries({
      queryKey: queryKeys.friends.list(userInfo?.accountId ?? ""),
    });
  };

  const { mutate: deleteFriend } = useDeleteFriend({
    friendId: selectedFriendId,
    onSuccess: deleteSuccessHandler,
  });

  const { mutate: reportFriend } = useReport({
    onSuccess: deleteSuccessHandler,
    onError: (error) => lightyToast.error(error.message),
  });

  useInfiniteScroll({ isFetching, loadMore });

  if (!friends) {
    return <UserFriendsListSkeleton />;
  }

  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        className="px-5 gap-4 mt-3 pb-4"
      >
        <Flex justify="space-between" align="center" className="w-full">
          <span className="text-T4" id="friendList">
            {`친구 ${friends.length}`}
          </span>
          <Link className={styles.button} href="/friends/search">
            친구 추가
          </Link>
        </Flex>
        <Link href="/friends" className={styles.li}>
          <span>
            {`요청`}
            {isFetching_c ? (
              <span className="bg-grayscale-10 w-16 animate-pulse" />
            ) : (
              <span className="text-[#FA6767] ml-1">{`${requestCount.count}`}</span>
            )}
          </span>
          <ArrowRightIcon />
        </Link>
      </Flex>
      <FriendsListContainer friends={friends} isFetching={isFetching} />
      <ModalWithReport
        modalState={modalState}
        setModalState={setModalState}
        reportModalOpen={reportModalOpen}
        setReportModalOpen={setReportModalOpen}
        setReportContent={setReportContent}
        reportContent={reportContent}
        deleteFriend={deleteFriend}
        onReport={reportFriend}
      />
    </>
  );
}

const styles = {
  button:
    "py-2 px-3 bg-grayscale-50 text-T6 rounded-lg cursor-pointer active:bg-grayscale-100 transition duration-75",
  li: "text-T5 w-full flex py-5 px-6 rounded-[20px] items-center cursor-pointer border border-grayscale-100 justify-between alien-center active:bg-grayscale-50 transition duration-75",
};

function UserFriendsListSkeleton() {
  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        className={"px-5 gap-4 mt-3 pb-4 pt-safe-top"}
      >
        <Flex
          justify="space-between"
          align="center"
          className="w-full h-[33px]"
        >
          <span className="text-T4" id="friendList">
            친구
          </span>
          <span className="w-[71px] h-[33px] py-2 px-3 bg-grayscale-50 animate-pulse text-T6 rounded-lg" />
        </Flex>
        <div className="bg-grayscale-50 animate-pulse w-full py-5 px-6 rounded-lg" />
      </Flex>
      <Flex direction="column" className="px-5 gap-4 w-full" align="center">
        <Flex className="px-4 py-[14px] w-full gap-2">
          <div className="w-9 h-9 bg-grayscale-50 animate-pulse rounded-full" />
          <Flex direction="column" className="gap-[2px]">
            <div className="bg-grayscale-50 animate-pulse w-[143px] h-[17px] rounded-[4px]" />
            <div className="bg-grayscale-50 animate-pulse w-[31px] h-[14px] rounded-[4px]" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
