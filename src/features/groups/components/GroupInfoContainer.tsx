import type * as lighty from "lighty-type";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";

interface Props {
  group: lighty.Group;
}

export default function GroupInfoContainer({ group }: Props) {
  const { name, description } = group;

  return (
    <div className={styles.container}>
      <Flex align="center">
        <span className="text-T1">{name}</span>
        <Spacing size={6} direction="horizontal" />
        <span className={styles.descWrapper}>{description}</span>
      </Flex>
    </div>
  );
}

const styles = {
  container: "w-full py-[20px] px-[24px] bg-base-white",

  descWrapper: "text-T4 text-grayscale-300",
};
