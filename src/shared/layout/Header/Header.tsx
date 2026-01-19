import clsx from "clsx";
import Flex from "@/shared/components/Flex";

export default function Header({
  px = "px-5",
  icon,
  fixed = true,
  headerLabel,
  className,
  children,
}: {
  px?: string;
  icon?: React.ReactNode;
  fixed?: boolean;
  headerLabel: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header
      style={{
        position: fixed ? "fixed" : undefined,
        top: 0,
        zIndex: 20,
      }}
      className={clsx(
        "pt-safe-top relative max-w-[430px] w-full flex flex-col justify-center",
        headerFont,
        headerColor,
        px ?? "px-5",
        className
      )}
    >
      <Flex className="w-full h-12" align="center" justify="space-between">
        <span>{headerLabel}</span>
        {icon && <div className="ml-2">{icon}</div>}
      </Flex>
      {children}
    </header>
  );
}

const headerFont = "text-[20px] font-[700] leading-[26px] tracking-[-0.3px]";
const headerColor = "bg-base-white";

