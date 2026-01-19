"use client";
import { useEffect } from "react";
import type React from "react";

import { useRouter, usePathname } from "next/navigation";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import { useAuth } from "@/shared/components/providers/AuthProvider";
import { clearAuthStorage } from "@/shared/utils/authStorage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isInitialized, isAuthenticated } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute =
    pathname === "/" ||
    pathname.includes("kakao") ||
    pathname.includes("oauth") ||
    pathname.includes("google") ||
    pathname.includes("apple") ||
    pathname.includes("/signup") ||
    pathname.includes("/onboard");

  useEffect(() => {
    if (isInitialized && isAuthenticated && pathname === "/") {
      router.replace("/feed");
    }
  }, [pathname, router, isAuthenticated, isInitialized]);

  // ✅ 인증 실패 시 "/"로 보냄
  useEffect(() => {
    if (
      isInitialized &&
      !isAuthenticated &&
      !isPublicRoute
    ) {
      clearAuthStorage();
      router.replace("/");
    }
  }, [isAuthenticated, router, isPublicRoute, isInitialized]);

  if (!isInitialized && !isPublicRoute) {
    return <DotSpinner />;
  }

  if (isInitialized && !isAuthenticated && !isPublicRoute) {
    return <DotSpinner />;
  }

  return <>{children}</>;
}
