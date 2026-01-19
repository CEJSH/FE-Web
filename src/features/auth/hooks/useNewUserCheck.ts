import { useState, useEffect } from "react";

export function useNewUserCheck() {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");
    if (refParam === "signup") {
      setIsNew(true);
    }
  }, []);

  return { isNew, setIsNew };
}
