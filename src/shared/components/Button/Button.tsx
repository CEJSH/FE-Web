import Spacing from "../Spacing";
import Text from "../Text";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  name?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseDown?: () => void;
  color?: string;
}

const BaseButton = ({
  color,
  className,
  name,
  disabled,
  children,
  onClick,
  onMouseDown,
}: ButtonProps) => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else return;
  }
  return (
    <button
      type="button"
      name={name}
      style={{
        backgroundColor: disabled ? "#D8D8D8" : color,
      }}
      className={clsx(
        "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayscale-900",
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  );
};

function ButtonGroup({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {title != null ? (
        <>
          <Text>{title}</Text>
          <Spacing size={8} />
        </>
      ) : null}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup;
};
Button.Group = ButtonGroup;

export default Button;
