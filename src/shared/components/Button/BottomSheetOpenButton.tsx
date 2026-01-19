import clsx from "clsx";
import PlusIcon from "../Icon/PlusIcon";

type PlusCircleButtonProps = {
  onClick?: () => void;
  className?: string;
  style?: { bottom: string; right: string };
  icon?: React.ReactNode;
  /**
   * 아이콘만 있을 때, 스크린 리더에게 읽어줄 라벨
   * ex) "항목 추가", "새 투표 만들기"
   */
  ariaLabel?: string;
  disabled?: boolean;
};

export default function BottomSheetOpenButton({
  style,
  className,
  onClick,
  ariaLabel = "바텀시트열기",
  icon,
  disabled = false,
}: PlusCircleButtonProps) {
  return (
    <button
      type="button"
      data-testid="plus-circle-button"
      style={style}
      className={clsx(PlusButtonStyle, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      // 터치에서 클릭 딜레이 / 더블 탭 확대 방지 때문에 쓰는 거라면 유지,
      // 아니라면 제거 권장
      onTouchStart={(e) => e.preventDefault()}
    >
      {icon ?? <PlusIcon width="23.3" height="23.3" />}
    </button>
  );
}

const PlusButtonStyle =
  "z-999 bg-grayscale-900 rounded-full w-14 h-14 flex items-center justify-center";

export function PlusCircleButtonSmall({
  className,
  style,
  width,
  height,
}: {
  className?: string;
  style?: { bottom: string; right: string };
  width?: string;
  height?: string;
}) {
  return (
    <div
      data-testid="plus-circle-button-small"
      style={style}
      className={clsx(PlusButtonStyleSmall, className)}
    >
      <PlusIcon width={width ?? "13.71"} height={height ?? "13.71"} />
    </div>
  );
}

const PlusButtonStyleSmall =
  "bg-grayscale-900 rounded-full w-6 h-6 flex items-center justify-center";
