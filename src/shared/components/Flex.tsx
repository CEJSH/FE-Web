import React, { MouseEvent, TouchEvent } from "react";

interface FlexProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onClick" | "onMouseDown" | "onTouchStart"
  > {
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  ref?: React.LegacyRef<HTMLDivElement>;
}

const Flex: React.FC<FlexProps> = ({
  align,
  justify,
  direction,
  style,
  children,
  onClick,
  onMouseDown,
  onTouchStart,
  ref,
  ...rest
}) => {
  const flexStyle: React.CSSProperties = {
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    ...style,
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={flexStyle}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Flex;
