import { useRouter } from "next/navigation";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import CheckSpinner from "@/shared/components/Spinner/CheckSpinner";
import NewGroupContainer from "./NewGroupContainer";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import FullPageLoader from "@/shared/components/FullPageLoader";
import { CreateGroupRequest } from "@/models/group";
import Header from "@/shared/layout/Header/Header";

export default function MakingGroupSuccess({
  group,
  isPending,
}: {
  group: CreateGroupRequest;
  isPending: boolean;
}) {
  const router = useRouter();

  return (
    <div className={"flex flex-col bg-base-white h-full pt-safe-top"}>
      <Header headerLabel="그룹 생성" />
      {isPending ? (
        <FullPageLoader />
      ) : (
        <Flex direction="column" className="h-screen pt-[106px]" align="center">
          <CheckSpinner />
          <Spacing size={17} />
          <span className="text-T2">그룹 생성 완료!</span>
          <Spacing size={12} />
          <span className="text-B3">
            앞으로 그룹 별로 약속을 만들 수 있어요
          </span>
          <Spacing size={48} />
          <NewGroupContainer className="shadow-sm" group={group} />
          <FixedBottomButton
            label={"홈으로 이동하기"}
            onClick={() => router.replace("/feed")}
            className={"mb-safe-bottom"}
          />
        </Flex>
      )}
    </div>
  );
}
