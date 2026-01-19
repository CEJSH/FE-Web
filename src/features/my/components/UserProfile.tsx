import AddPhoto from "@/shared/components/AddPhoto";
import Flex from "@/shared/components/Flex";

export default function UserProfile({
  userProfileImage,
  userAccountId,
  userName,
}: {
  userProfileImage?: string;
  userAccountId?: string;
  userName?: string;
}) {
  const accountId = "antinitony";

  return (
    <Flex align="center" direction="column" className="px-5 pb-3 gap-2">
      <AddPhoto imageUrl={userProfileImage} uploadable={false} />
      <Flex direction="column" align="center" className="gap-1">
        <span className="text-T3 leading-[23px]">
          {userAccountId ? userAccountId : accountId}
        </span>
        <span className="text-B4 text-grayscale-400">{userName}</span>
      </Flex>
    </Flex>
  );
}
