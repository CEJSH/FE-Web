import { usePathname } from "next/navigation";
import { useMemo } from "react";
import NAV_ITEMS from "@/shared/constants/navBar";

export const useActiveNavigation = () => {
  const pathname = usePathname();

  const activeBtn = useMemo(() => {
    const exactMatch = NAV_ITEMS.findIndex((item) => pathname === item.href);
    if (exactMatch !== -1) return exactMatch;

    const startsWithMatch = NAV_ITEMS.findIndex((item) =>
      pathname.startsWith(item.href)
    );
    return startsWithMatch === -1 ? 0 : startsWithMatch;
  }, [pathname]);

  return {
    activeBtn,
    pathname,
  };
};
