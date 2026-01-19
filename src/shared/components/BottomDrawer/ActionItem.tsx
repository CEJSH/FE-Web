import clsx from "clsx";
import Flex from "../Flex";
import ArrowRightIcon from "../Icon/ArrowRightIcon";

export default function ActionItem({
  padding,
  title,
  onClick,
  subTitle,
  icon,
}: {
  padding?: string;
  title: string;
  onClick: () => void;
  subTitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      className={clsx(styles.container, padding)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={styles.button}>{icon}</div>
      <Flex className={styles.descWrapper}>
        <Flex direction="column" className="flex-grow gap-1 items-start">
          <span className="text-T5">{title}</span>
          {subTitle && (
            <>
              <span className={styles.subTitle}>{subTitle}</span>
            </>
          )}
        </Flex>
        <ArrowRightIcon />
      </Flex>
    </button>
  );
}

const styles = {
  container:
    "flex gap-3 py-3 w-full active:bg-grayscale-100 transition duration-75",

  descWrapper: "gap-3 flex-grow cursor-pointer items-center",
  button:
    "bg-grayscale-900 w-10 h-10 flex justify-center items-center rounded-full cursor-default",

  subTitle: "text-C2 text-grayscale-400",
};
