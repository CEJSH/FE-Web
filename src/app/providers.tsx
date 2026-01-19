"use client";
import { RecoilRoot } from "recoil";
import React, { useEffect } from "react";
interface Props {
  children?: React.ReactNode;
}
declare global {
  interface Window {
    mazeUniversalSnippetApiKey?: string;
  }
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import { ToastContainer, Zoom } from "react-toastify";
import clsx from "clsx";
import { GA_ID } from "../lib/gtm/gtm";
import useMaze from "@/shared/hooks/useMaze";
import useScrollToTop from "@/shared/hooks/useScrollToTop";
import dynamic from "next/dynamic";
import { ReactNativeWebViewProvider } from "@/shared/components/providers/ReactNativeWebViewProvider";

const NavBar = dynamic(() => import("@/shared/layout/NavBar"), {
  ssr: false,
});

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  useMaze();

  return (
    <GoogleOAuthProvider clientId="819938529870-7ng56emjnvtfds459lrb7h1a9g04r4q5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ReactNativeWebViewProvider>{children}</ReactNativeWebViewProvider>
          <ToastContainer
            position="top-center"
            hideProgressBar
            autoClose={2500}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            transition={Zoom}
          />
        </RecoilRoot>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

const DARK_BACKGROUND_PATHS = [
  "/friends",
  "/friends/search",
  "/onboard",
] as const;

const NAVBAR_PATHS = [
  "/feed",
  "/gathering",
  "/card",
  "/social",
  "/my",
] as const;

const isPathIncluded = (path: string, pathList: readonly string[]) =>
  pathList.some((item) => path.startsWith(item));

const isPathEqual = (path: string, pathList: readonly string[]) =>
  pathList.some((item) => path === item);

const NextLayout = ({ children }: Props) => {
  useScrollToTop();
  const pathname = usePathname();
  const showNavBar = isPathEqual(pathname, NAVBAR_PATHS);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", GA_ID || "", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <div
      className={clsx(
        pathname === "/feed" || pathname === "/gathering"
          ? ""
          : "h-dvh overflow-y-scroll no-scrollbar",
        "max-w-[430px] mx-auto my-0",
        isPathIncluded(pathname, DARK_BACKGROUND_PATHS)
          ? "bg-grayscale-50"
          : "bg-base-white"
      )}
    >
      {children}
      {showNavBar && <NavBar />}
    </div>
  );
};

export default NextLayout;
