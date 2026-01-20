import { usePathname } from "next/navigation";
import NAV_ITEMS from "@/shared/constants/navBar";

export const useActiveNavigation = () => {
  const pathname = usePathname();

  const exactMatch = NAV_ITEMS.findIndex((item) => pathname === item.href);
  const startsWithMatch = NAV_ITEMS.findIndex((item) =>
    pathname.startsWith(item.href)
  );
  const activeBtn =
    exactMatch !== -1 ? exactMatch : startsWithMatch === -1 ? 0 : startsWithMatch;

  return {
    activeBtn,
    pathname,
  };
};
