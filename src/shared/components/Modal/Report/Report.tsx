import Dimmed from "../../Dimmed";
import Flex from "../../Flex";
import Spacing from "../../Spacing";
import Button from "../../Button/Button";
import clsx from "clsx";
import { ReportContentTypes } from "@/features/report/components/hooks/useReport";
import { SetterOrUpdater } from "recoil";
import { ReportModalType } from "@/models/modal";

export default function Report({
  report,
  setReport,
  handleReport,
  onClose,
  type,
}: {
  report: ReportContentTypes;
  setReport: SetterOrUpdater<ReportContentTypes>;
  handleReport: () => void;
  onClose: () => void;
  type: ReportModalType | null;
}) {
  return (
    <Dimmed className={styles.dimmed}>
      <Flex align="center" direction="column" className={styles.modalWrapper}>
        <>
          <div className="w-full text-T3 text-left">
            신고 사유를 입력해 주세요
          </div>
          <Spacing size={12} />
          <span className="w-full text-B3 text-grayscale-500 mb-2">
            모든 신고는 익명으로 처리돼요.
            <br />
            {`다만, 신고한 
            ${
              type === "FRIEND"
                ? "유저는 차단"
                : type === "FEED"
                ? "피드는 숨김"
                : type === "FEED_COMMENT"
                ? "댓글은 숨김"
                : "그룹은 숨김"
            }
            처리돼요.`}
          </span>
          <textarea
            className={styles.reportTextarea}
            value={report.reason}
            onChange={(e) =>
              setReport &&
              setReport((prev) => ({ ...prev, reason: e.target.value }))
            }
          />
          <Spacing size={24} />
        </>
        <Flex className="w-full gap-3" justify="center">
          <Button
            onClick={onClose}
            className={clsx(styles.button, styles.cancel)}
          >
            취소
          </Button>
          <Button
            onClick={handleReport}
            className={clsx(styles.button, styles.report)}
          >
            신고하기
          </Button>
        </Flex>
      </Flex>
    </Dimmed>
  );
}

const styles = {
  dimmed: "flex justify-center items-center z-200",

  modalWrapper:
    "bg-base-white rounded-[20px] w-[268px] pt-[28px] pb-5 px-[30px] z-201",
  button: "w-[104px] py-[14px] rounded-full text-T6",

  content: "text-B3 text-grayscale-600 text-center max-w-[168px]",
  cancel: "text-grayscale-300 active:bg-grayscale-50",
  report: "bg-grayscale-900 text-base-white active:bg-grayscale-800",
  reportTextarea:
    "h-20 p-2 border-grayscale-200 border-[1px] rounded-[6px] leading-[22.86px] w-full tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none",
};
