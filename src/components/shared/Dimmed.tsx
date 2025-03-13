import clsx from "clsx";

function Dimmed({
  children,
  onClick,
  isClosing,
  className,
  bright,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isClosing?: boolean;
  className?: string;
  bright?: boolean;
}) {
  return (
    <div
      data-testid="dimmed-backdrop"
      onClick={onClick}
      className={clsx(
        "max-w-[430px] mx-auto fixed inset-0 z-[var(--dimmed-zIndex)] will-change-[opacity]",
        isClosing ? "animate-fadeOut" : "animate-fadeIn",
        bright ? "bg-[#00000020]" : "bg-[#00000080]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Dimmed;
