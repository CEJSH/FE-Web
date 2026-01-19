import "swiper/css";
import Flex from "./Flex";
import type * as lighty from "lighty-type";
import OptimizedImage from "./OptimizedImage";

export default function MemberContainer({
  members,
}: {
  members: lighty.User[];
}) {
  return (
    <div className={styles.memberContainerStyle}>
      {members.map(({ profileImageUrl, accountId, name }, idx) => (
        <Flex
          key={`gatheringMember${idx}`}
          direction="column"
          align="center"
          className={styles.memberWrapper}
        >
          <div className={styles.image}>
            <OptimizedImage
              src={
                profileImageUrl
                  ? profileImageUrl
                  : `https://cdn.lighty.today/default.png`
              }
              alt={`gatheringMember${idx + 1}`}
              width={40}
              height={40}
              loading="eager"
              className="w-10 h-10 object-cover"
            />
          </div>
          <Flex direction="column" align="center" className="text-T5 gap-1">
            <span className="break-words text-center w-full px-2">
              {accountId}
            </span>
            <span className={styles.name}>{name}</span>
          </Flex>
        </Flex>
      ))}
    </div>
  );
}

const styles = {
  image:
    "rounded-full w-10 h-10 border-[1.41px] border-base-white overflow-hidden",

  memberWrapper:
    "min-w-[120px] px-2 py-5 rounded-2xl border-[1px] border-grayscale-100 gap-[6px]",
  memberContainerStyle: "flex overflow-scroll no-scrollbar gap-3 pb-[46px]",

  name: "text-B4 text-grayscale-500",
};
