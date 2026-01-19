import MODAL_CONFIGS from "@/shared/constants/modal-configs";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/shared/components/Modal/Modal"), {
  ssr: false,
});
const Report = dynamic(() => import("@/shared/components/Modal/Report/Report"));

interface Props {
  onReport: (r: any) => void;
  deleteComment?: () => void;
  modalState?: any;
  reportModalOpen?: any;
  reportContent?: any;
  setModalState?: (v: any) => void;
  setReportContent?: (v: any) => void;
  setReportModalOpen?: (v: any) => void;
  displayFeed?: () => void;
  deleteFeed?: () => void;
  deleteFriend?: () => void;
  hideFeed?: () => void;
  deleteGroup?: () => void;
  exitGroup?: () => void;
}

export default function ModalWithReport(props: Props) {
  const {
    onReport,
    deleteComment,
    modalState,
    reportModalOpen,
    reportContent,
    setModalState,
    setReportContent,
    setReportModalOpen,
    displayFeed,
    deleteFeed,
    deleteFriend,
    hideFeed,
    deleteGroup,
    exitGroup,
  } = props;

  const modalActions: Record<string, (() => void) | undefined> = {
    deleteGroup,
    exitGroup,
    deleteFriend,
    deleteFeed,
    hideFeed,
    displayFeed,
    deleteComment,
    deleteFeedComment: deleteComment,
  };

  const closeModal = () => setModalState?.({ type: null, isOpen: false });
  const closeReportModal = () =>
    setReportModalOpen?.((prev: any) => ({
      ...prev,
      type: null,
      isOpen: false,
    }));

  return (
    <>
      {modalState?.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={modalActions[modalState.type]}
          onClose={closeModal}
        />
      )}

      {reportModalOpen?.isOpen && setReportContent && setReportModalOpen && (
        <Report
          type={reportModalOpen.type}
          report={reportContent}
          setReport={setReportContent}
          handleReport={() => {
            onReport(reportContent);
            closeReportModal();
          }}
          onClose={closeReportModal}
        />
      )}
    </>
  );
}
