import Flex from "./Flex";
import CloseIcon from "./Icon/CloseIcon";
import PencilIcon from "./Icon/PencilIcon";

export default function Message({ onClose }: { onClose: () => void }) {
  return (
    <Flex className={styles.messageContainer}>
      <PencilIcon color="#0A0A0A" />
      <span className={styles.text}>기록으로 약속의 추억을 간직해보세요!</span>
      <button
        type="button"
        aria-label="메시지 닫기"
        className="p-1 cursor-pointer bg-transparent border-0"
        onClick={() => onClose()}
      >
        <CloseIcon color="#AEAEAE" />
      </button>
    </Flex>
  );
}

const styles = {
  messageContainer:
    "gap-2 px-4 py-[14px] rounded-[10px] bg-grayscale-50 items-center mb-5",

  text: "flex-grow text-B3",
};
