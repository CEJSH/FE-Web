"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./shared/providers/AuthProvider";
import DotSpinner from "./shared/Spinner/DotSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && pathname === "/") {
      router.push("/feed");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // 로딩 중이 아니고, 인증되지 않았으며, 로그인/회원가입 페이지가 아닌 경우
    if (
      !isLoading &&
      !isAuthenticated &&
      pathname !== "/" &&
      !pathname.includes("kakao") &&
      !pathname.includes("google") &&
      !pathname.includes("apple") &&
      !pathname.includes("/signup")
    ) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
