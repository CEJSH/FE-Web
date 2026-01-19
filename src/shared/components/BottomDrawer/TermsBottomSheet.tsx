import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Button from "../Button/Button";
import CheckInCircleIcon from "../Icon/CheckInCircleIcon";
import { 약관목록 } from "@/shared/constants/terms";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import { contentsOfTerms } from "@/shared/constants/termsContent";
import { useReactNativeWebView } from "../providers/ReactNativeWebViewProvider";
import { openPrivacyPolicyMobile, openTermsMobile } from "@/webview/actions";
import NarrowRightIcon from "../Icon/NArrowRightIcon";

export default function TermsBottomSheet({
  onClose,
  open = true,
  handleSignup,
  termsAgreements,
  setTermsAgreements,
}: {
  onClose: () => void;
  open?: boolean;
  handleSignup: () => void;
  termsAgreements: Record<string, boolean>;
  setTermsAgreements: Dispatch<SetStateAction<Record<string, boolean>>>;
}) {
  const { isReactNativeWebView } = useReactNativeWebView();
  const [rotated, setRotated] = useState<Record<string, boolean>>({
    "01": false,
    "02": false,
    "03": false,
  });

  const isAllChecked = Object.values(termsAgreements).every(
    (isChecked) => isChecked
  );

  const handleAllCheck = useCallback((checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return Object.keys(prevTerms).reduce(
        (prev, key) => ({ ...prev, [key]: checked }),
        {}
      );
    });
  }, []);

  const openTermsPage = () => {
    if (isReactNativeWebView) {
      openTermsMobile();
    }
  };

  const openPrivacyPolicyPage = () => {
    if (isReactNativeWebView) {
      openPrivacyPolicyMobile();
    }
  };

  return (
    <BottomSheetWrapper onClose={onClose} open={open} ariaLabel="약관 동의">
      <Flex direction="column" className="p-6 pt-2 pb-8">
        <Flex direction="column" className="text-T3">
          <span>서비스 이용을 위해</span>
          <Spacing size={7} />
          <span>약관 동의를 진행해 주세요</span>
          <Spacing size={24} />
          <label className="text-B3 p-4 rounded-full border flex items-center border-[#D8D8D8] cursor-pointer">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={(e) => handleAllCheck(e.target.checked)}
              className="sr-only"
            />
            <CheckInCircleIcon width="20" height="20" checked={isAllChecked} />
            <Spacing direction="horizontal" size={12} />
            <span>전체 동의</span>
          </label>
          <Spacing size={24} />
          {약관목록.map(({ title, id }, idx) => {
            const isExpandable = id === "03";
            const detailLabel = isExpandable
              ? rotated[id]
                ? `${title} 닫기`
                : `${title} 열기`
              : `${title} 자세히 보기`;
            return (
              <Fragment key={id}>
                <li className={styles.list}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={termsAgreements[id]}
                      onChange={(e) => {
                        setTermsAgreements((prevTerms) => ({
                          ...prevTerms,
                          [id]: e.target.checked,
                        }));
                      }}
                      className="sr-only"
                    />
                    <CheckInCircleIcon
                      width="20"
                      height="20"
                      checked={termsAgreements[id]}
                    />
                    <Spacing direction="horizontal" size={12} />
                    <span className="flex-grow">{title}</span>
                  </label>
                  <button
                    type="button"
                    aria-label={detailLabel}
                    aria-expanded={isExpandable ? rotated[id] : undefined}
                    className={styles.iconButton}
                    onClick={() => {
                      if (id == "03") {
                        setRotated((prev) => ({
                          ...prev,
                          [id]: !prev[id],
                        }));
                      } else if (id === "01") {
                        openTermsPage();
                      } else if (id === "02") {
                        openPrivacyPolicyPage();
                      }
                    }}
                  >
                    <NarrowRightIcon
                      checked={termsAgreements[id]}
                      rotate={rotated[id]}
                    />
                  </button>
                </li>
                {id === "03" && rotated[id] && contentsOfTerms[idx].contents}
                {idx < 약관목록.length - 1 ? <Spacing size={20} /> : null}
              </Fragment>
            );
          })}
        </Flex>
      </Flex>
      <div className={styles.buttonWrapper}>
        <Button
          color="#0a0a0a"
          className={styles.button}
          onClick={handleSignup}
          disabled={
            termsAgreements["01"] === false || termsAgreements["02"] === false
          }
        >
          라이티 시작하기
        </Button>
      </div>
    </BottomSheetWrapper>
  );
}
const styles = {
  button:
    "rounded-full text-[14px] font-[600] py-[18px] w-full text-base-white",
  buttonWrapper: "pt-3 pb-[10px] px-5",
  list: "text-B3 flex items-center px-3",
  checkboxLabel: "flex items-center flex-grow cursor-pointer",
  iconButton: "p-1 bg-transparent border-0",
};
