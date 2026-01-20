import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  name: string;
  isActive: boolean;
  onMouseDown: () => void;
  icon: (isActive: boolean, profileUrl: string) => React.ReactNode;
  profileImageUrl?: string | null;
}

export const NavLink = ({
  href,
  name,
  isActive,
  onMouseDown,
  icon,
  profileImageUrl,
}: NavLinkProps) => {
  const router = useRouter();
  return (
    <Link
      aria-label={`${name} 페이지로 이동`}
      aria-current={isActive ? "page" : undefined}
      href={href}
      prefetch={false}
      onMouseEnter={() => void router.prefetch(href)}
      onFocus={() => void router.prefetch(href)}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown();
      }}
    >
      <div className="flex justify-center w-16 h-11 items-center active:animate-shrink-grow">
        {icon(isActive, profileImageUrl ?? "")}
      </div>
    </Link>
  );
};
