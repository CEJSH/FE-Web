import React, { memo, Suspense } from "react";
import NAV_ITEMS from "@/shared/constants/navBar";
import { useActiveNavigation } from "@/shared/hooks/useActiveNavigation";
import { NavLink } from "./NavLink";
import useUserProfile from "@/features/users/components/hooks/useUserProfile";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { useReactNativeWebView } from "@/shared/components/providers/ReactNativeWebViewProvider";

const FloatingButton = dynamic(
  () => import("@/features/navigation/components/FloatingButton"),
  {
    ssr: false,
  }
);

const MemoizedNavLink = memo(NavLink);
const SHOW_SHEET_PATHS = ["/feed"];

const NavBar = () => {
  const { data: user } = useUserProfile();
  const { pathname, activeBtn } = useActiveNavigation();
  const { isReactNativeWebView } = useReactNativeWebView();
  const showSheetButton =
    SHOW_SHEET_PATHS.some((path) => pathname.startsWith(path)) ||
    pathname.endsWith("/gathering");

  const tooltip = !user?.hasFeed;

  const onMouseDownHandler = (idx: number) => {
    if (activeBtn === idx) {
      window.dispatchEvent(
        new CustomEvent("lighty:navigation-reselect", {
          detail: { href: NAV_ITEMS[idx].href },
        })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const items = NAV_ITEMS.map((item, idx) => (
    <MemoizedNavLink
      name={item.name}
      key={item.href}
      href={item.href}
      isActive={activeBtn === idx}
      onMouseDown={() => onMouseDownHandler(idx)}
      icon={item.icon}
      profileImageUrl={user?.profileImageUrl ?? null}
    />
  ));

  if (!user) {
    return null;
  }

  const navLabel = "하단 내비게이션";

  return (
    <Suspense>
      <nav
        style={{ zIndex: 99 }}
        aria-label={navLabel}
        className={clsx(
          `
        fixed left-0 right-0 bottom-0 bg-base-white w-full max-w-[430px]
        flex justify-between px-3 mx-auto pt-1 pb-1 min-h-[52px]
        border-t border-grayscale-10`,
          isReactNativeWebView ? "!pb-safe-bottom" : ""
        )}
      >
        <ul className="flex w-full justify-between" aria-label={`${navLabel} 목록`}>
          {items.map((item, idx) => (
            <li key={NAV_ITEMS[idx].href} className="list-none">
              {item}
            </li>
          ))}
        </ul>
        {showSheetButton && <FloatingButton tooltip={tooltip} />}
      </nav>
    </Suspense>
  );
};

export default NavBar;
