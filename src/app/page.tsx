"use client";
import HomePage from "@/components/HomePage";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Splash from "@/components/Splash";
import { useEffect, useState } from "react";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return <DotSpinner />;
  }

  return <Splash />;
}
