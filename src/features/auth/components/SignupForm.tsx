"use client";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import type * as lighty from "lighty-type";
import AddPhoto, { RegisterRequestType } from "@/shared/components/AddPhoto";
import Input from "@/shared/components/Input/Input";
import FixedBottomButton from "@/shared/components/Button/FixedBottomButton";
import Spacing from "@/shared/components/Spacing";
import Flex from "@/shared/components/Flex";
import STORAGE_KEYS from "@/shared/constants/storageKeys";
import TermsBottomSheet from "@/shared/components/BottomDrawer/TermsBottomSheet";
import useSignup from "@/features/users/components/hooks/useSignup";
import { lightyToast } from "@/shared/utils/toast";
import { getIdAvailability } from "@/features/users/api/users";
import validateForm from "@/shared/utils/validateSignupForm";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";
import { 약관목록 } from "@/shared/constants/terms";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import { useRouter } from "next/navigation";

export type Provider = "GOOGLE" | "KAKAO" | "APPLE";

const INITIAL_FORM_STATE: RegisterRequestType = {
  email: "",
  name: "",
  accountId: "",
  profileImageUrl: null,
  provider: "GOOGLE",
  termsOfServiceConsent: false,
  privacyPolicyConsent: false,
};

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] =
    useState<RegisterRequestType>(INITIAL_FORM_STATE);
  const [idNotAvailable, setIdNotAvailable] = useState(false);
  const { isReactNativeWebView } = useReactNativeWebView();
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({ ...prev, [term.id]: false }),
      {}
    );
  });
  const router = useRouter();

  const handleAccountIdChange = useCallback(async (value: string) => {
    if (value.length <= 40) {
      setFormValues((prev) => ({ ...prev, accountId: value }));
      if (value.length > 3) {
        const response = await getIdAvailability({ accountId: value });
        setIdNotAvailable(!response.ok);
      }
    }
  }, []);

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "accountId") {
        handleAccountIdChange(value);
      } else {
        setFormValues((prev) => ({ ...prev, [name]: value }));
      }
    },
    [handleAccountIdChange]
  );

  const { mutate } = useSignup({
    formValues,
    termsOfServiceConsent: true,
    privacyPolicyConsent: true,
    onSuccess: (data) => {
      lightyToast.success(data.message);
      setIsLoading(false);
      router.replace("/onboard");
    },
    onError: (error: Error) => {
      lightyToast.error(error.message);
      setIsLoading(false);
      router.replace("/");
    },
  });

  const handleSignup = () => {
    setIsLoading(true);
    mutate();
  };
  const errors = useMemo(() => validateForm(formValues), [formValues]);
  const isValidate = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const isButtonDisabled = useMemo(() => {
    return (
      !isValidate ||
      formValues.profileImageUrl == null ||
      formValues.accountId.length < 4 ||
      formValues.name == null ||
      idNotAvailable
    );
  }, [
    isValidate,
    formValues.profileImageUrl,
    formValues.accountId,
    formValues.name,
    idNotAvailable,
  ]);

  useEffect(() => {
    const session = sessionStorage.getItem(STORAGE_KEYS.OAUTH_DATA);

    if (session) {
      try {
        const user_info: lighty.LoginFailResponse = JSON.parse(session);
        setFormValues((prev) => ({
          ...prev,
          name: user_info.name,
          provider: user_info.provider,
          email: user_info.email,
        }));
      } catch (error) {
        console.error("Failed to parse OAuth data:", error);
      }
    }
  }, []);

  const signupNextHandler = () => {
    if (isButtonDisabled) {
      if (formValues.profileImageUrl == null) {
        lightyToast.error("프로필 사진을 등록해주세요.");
      } else if (formValues.accountId == null) {
        lightyToast.error("계정 아이디를 입력해주세요.");
      } else if (idNotAvailable || errors.accountId) {
        lightyToast.error("올바른 형식의 아이디를 입력해주세요");
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <Flex direction="column">
      <div className="mx-auto w-21 py-3">
        <AddPhoto setImageUrl={setFormValues} uploadable={true} />
      </div>
      <Spacing size={16} />

      <Input
        name="name"
        label="이름"
        placeholder="이름을 입력해주세요."
        onChange={handleFormValues}
        value={formValues.name}
        helpMessage={errors.name}
      />

      <Spacing size={30} />
      <Input
        idNotAvailable={idNotAvailable}
        name="accountId"
        label="계정 아이디"
        placeholder="영문 소문자, 숫자, 특수기호 (_)만 입력 가능"
        onChange={handleFormValues}
        displayLength={15}
        value={formValues.accountId}
        helpMessage={errors.accountId}
      />
      <Spacing size={6} />

      {idNotAvailable && (
        <span className="text-[#FA6767] text-C2 px-2">
          중복되는 계정 아이디에요
        </span>
      )}
      <span className="text-C2 text-grayscale-500 px-2">
        *계정 아이디는 프로필에 노출되며, 친구 추가 시 활용돼요!
      </span>
      <FixedBottomButton
        label="다음"
        onClick={signupNextHandler}
        className={isReactNativeWebView ? "mb-safe-bottom" : ""}
      />
      {modalOpen && (
        <TermsBottomSheet
          termsAgreements={termsAgreements}
          setTermsAgreements={setTermsAgreements}
          onClose={() => setModalOpen(false)}
          handleSignup={handleSignup}
        />
      )}
      {isLoading && (
        <div
          style={{
            zIndex: 300,
          }}
          className="absolute inset-0 bg-grayscale-900 bg-opacity-50 flex justify-center items-center"
        >
          <DotSpinner />
        </div>
      )}
    </Flex>
  );
}
