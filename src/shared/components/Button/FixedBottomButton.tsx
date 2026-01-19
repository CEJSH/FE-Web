import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface FixedBottomButtonProps {
  label: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
  bgColor?: string;
}

const FixedBottomButton: React.FC<FixedBottomButtonProps> = ({
  label,
  onClick,
  color,
  bgColor,
  className,
  disabled,
}: FixedBottomButtonProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const $portalRoot = document.getElementById("root-portal");
  if ($portalRoot == null) return null;

  return createPortal(
    <div
      className={clsx(
        buttonWrapperStyle,
        bgColor ? `bg-[${bgColor}]` : "bg-base-white"
      )}
    >
      <Button
        color={color}
        onClick={() => {
          if (onClick) {
            onClick();
          } else return;
        }}
        disabled={disabled}
        className={clsx(
          buttonStyle,
          disabled
            ? `bg-grayscale-300 cursor-default`
            : `bg-grayscale-900 active:bg-blue-700`,
          className
        )}
      >
        {label}
      </Button>
    </div>,
    $portalRoot
  );
};

const buttonStyle = `w-full py-[18px] flex justify-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full hover:bg-grayscale-700 active:bg-grayscale-700`;
const buttonWrapperStyle = `max-w-[430px] w-full px-5 pb-[10px] pt-3 animate-slide-up will-change-transform`;

export default FixedBottomButton;
