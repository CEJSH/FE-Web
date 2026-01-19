import ToastSuccess from "@/shared/components/Icon/ToastSuccess";
import ToastError from "@/shared/components/Icon/ToastError";
import { ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

export const lightyToast = {
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...defaultToastOption,
      icon: ToastSuccess,
      ...options,
    });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, {
      ...defaultToastOption,
      icon: ToastError,
      ...options,
    });
  },
};

const defaultToastOption: ToastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: true,
  pauseOnHover: false,
  closeButton: false,
};

export const InvitationToast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...defaultToastOption,
      icon: ToastSuccess,
      ...options,
    });
  },
};
