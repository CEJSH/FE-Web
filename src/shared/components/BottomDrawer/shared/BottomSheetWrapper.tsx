import React from "react";
import Dimmed from "../../Dimmed";
import Flex from "../../Flex";
import clsx from "clsx";
import RectIcon from "../../Icon/RectIcon";

export default function BottomSheetWrapper({
  open = true,
  onClose,
  children,
  bar = true,
  bright = false,
  isClosing = false,
  handleAnimationEnd,
  ariaLabel = "Dialog",
}: {
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  bar?: boolean;
  bright?: boolean;
  isClosing?: boolean;
  handleAnimationEnd?: () => void;
  ariaLabel?: string;
}) {
  const handleBackdropClick = () => {
    onClose();
  };

  if (open === false) return null;

  return (
    <Dimmed onClick={handleBackdropClick} isClosing={isClosing} bright={bright}>
      <div
        data-testid="bottom-sheet-wrapper"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={clsx(
          containerStyle,
          `${isClosing ? "animate-slideOut" : "animate-slideIn"}`
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <Flex direction="column" className="pb-safe-bottom">
          <Flex justify="center" className="pt-[6px] pb-[18px]">
            {bar ? <RectIcon /> : null}
          </Flex>
          {children}
        </Flex>
      </div>
    </Dimmed>
  );
}

const containerStyle =
  "max-w-[430px] mx-auto bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-[var(--bottomSheet-zIndex)] pb-[10px]";
