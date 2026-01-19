import { registerUser } from "@/features/auth/api/auth";
import { useMutation } from "@tanstack/react-query";
import type * as lighty from "lighty-type";

export interface SignupType {
  email: string;
  name: string;
  accountId: string;
  profileImageUrl: File | string | null;
  provider: lighty.Provider;
}

export default function useSignup({
  formValues,
  termsOfServiceConsent,
  privacyPolicyConsent,
  onSuccess,
  onError,
}: {
  formValues: SignupType;
  termsOfServiceConsent: boolean;
  privacyPolicyConsent: boolean;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["register", formValues.email, formValues.provider],
    mutationFn: () =>
      registerUser({
        ...formValues,
        termsOfServiceConsent,
        privacyPolicyConsent,
      }),
    onSuccess: (data: { message: string } | undefined) => {
      if (data) {
        onSuccess(data);
      }
    },
    onError: (error: Error) => onError(error),
  });
}
