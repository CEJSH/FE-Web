"use client";
import SearchInput from "@/features/search/components/SearchBar";
import Spacing from "@/shared/components/Spacing";
import { userSearchAtom } from "@/features/friends/state/friends";
import { useRecoilValue } from "recoil";
import useDebounce from "@/shared/hooks/debounce";
import useSearchUsers from "@/features/users/components/hooks/useSearchUsers";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import Flex from "@/shared/components/Flex";
import Button from "@/shared/components/Button/Button";
import UserListContainer from "@/features/users/components/UserListContainer";
import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import { useRouter } from "next/navigation";
import handleShare from "@/shared/utils/handleShare";

export default function SearchPage() {
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);
  const router = useRouter();

  const {
    data: searchedUsers,
    loadMore,
    isFetching,
  } = useSearchUsers({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 1,
  });

  useInfiniteScroll({ isFetching, loadMore });

  const sharingData = {
    url: `https://lighty.today`,
    text: "친구가 라이티에 초대했어요! 라이티에서 추억을 쌓아볼까요?",
    title: "Lighty, 나만의 프라이빗 일기 SNS",
  };

  return (
    <div className="h-dvh">
      <HeaderWithBtn
        headerLabel="친구 추가"
        onClickBackBtn={() => router.back()}
        bgColor="#f4f4f4"
      >
        <Spacing size={20} />
        <div className={"w-full px-5 pb-5"}>
          <SearchInput
            type="users"
            className="!bg-base-white"
            placeholder="아이디를 검색해보세요."
          />
        </div>
      </HeaderWithBtn>
      {debouncedSearch.length < 1 && (
        <Flex
          direction="column"
          align="center"
          // justify="center"
          className="h-dvh gap-5 pt-safe-top pb-safe-bottom"
        >
          <Spacing size={120} />
          <Flex
            className="h-full pb-5 gap-5 items-center justify-center"
            direction="column"
          >
            <span className="text-B2">
              친구가 아직 라이티를 가입하지 않았다면?
            </span>
            <Button
              color="#0a0a0a"
              className="rounded-xl py-3 px-[14px] text-base-white text-B3"
              onClick={() => handleShare(sharingData)}
            >
              💌 친구 초대하기
            </Button>
          </Flex>
        </Flex>
      )}
      <UserListContainer
        isFetching={isFetching}
        searchedUsers={searchedUsers}
      />
    </div>
  );
}
