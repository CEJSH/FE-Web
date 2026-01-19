interface SpacingProps {
  size: number;
  color?: string;
  direction?: "horizontal" | "vertical";
}

const Spacing: React.FC<SpacingProps> = ({
  size,
  color,
  direction = "vertical",
}) => {
  const style =
    direction === "vertical"
      ? { height: `${size}px`, backgroundColor: color }
      : { width: `${size}px`, backgroundColor: color };

  return <div className="flex-shrink-0" style={style} />;
};

export default Spacing;
