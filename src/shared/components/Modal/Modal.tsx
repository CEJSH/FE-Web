import clsx from "clsx";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Button from "../Button/Button";
import React from "react";

interface ModalProps {
  title?: string;
  content?: React.ReactNode;
  onClose: () => void;
  action?: () => void;
  left?: string;
  right?: string;
}

export default function Modal({
  title,
  content,
  action,
  left = "취소",
  right,
  onClose,
}: ModalProps) {
  const ariaLabel =
    typeof title === "string" && title.trim().length > 0 ? title : "Dialog";
  return (
    <ModalWrapper>
      <Flex
        align="center"
        direction="column"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={styles.modalContainer}
      >
        <div className="text-T3 text-center">{title}</div>
        <Spacing size={12} />
        <div className={styles.content}>{content}</div>
        <Spacing size={24} />
        <Flex className="w-full" justify="center">
          {left ? (
            <Button
              onClick={onClose}
              className={clsx(styles.button, styles.cancel)}
            >
              {left}
            </Button>
          ) : null}
          {right ? (
            <>
              <Spacing size={12} direction="horizontal" />
              <Button
                onClick={() => {
                  if (action) {
                    action();
                    onClose();
                  }
                }}
                className={clsx(styles.button, styles.report)}
              >
                {right}
              </Button>
            </>
          ) : null}
        </Flex>
      </Flex>
    </ModalWrapper>
  );
}

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Dimmed className={styles.dimmed}>{children}</Dimmed>;
};

const styles = {
  dimmed: "flex justify-center items-center z-200",

  modalContainer:
    "bg-base-white rounded-[20px] w-[268px] pt-[28px] pb-5 px-[30px] z-201",
  button: "w-[104px] py-[14px] rounded-full text-T6",

  content: "text-B3 text-grayscale-600 text-center max-w-[168px]",
  cancel: "text-grayscale-300 active:bg-grayscale-50",
  report: "bg-grayscale-900 text-base-white active:bg-grayscale-800",
};
