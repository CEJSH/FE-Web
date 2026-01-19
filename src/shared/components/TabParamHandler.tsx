import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TabParamHandler = ({
  setSelectedTab,
  pathToReplace,
}: {
  setSelectedTab: (num: "1" | "2") => void;
  pathToReplace?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam === "1" || tabParam === "2") {
      setSelectedTab(tabParam);
      if (pathToReplace) {
        router.replace(pathToReplace);
      }
    }
  }, [searchParams, setSelectedTab]);

  return null;
};

export default TabParamHandler;
