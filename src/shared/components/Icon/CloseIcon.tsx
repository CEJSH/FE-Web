export default function CloseIcon({
  className,
  width,
  height,
  color,
  onClick,
}: {
  className?: string;
  width?: string;
  height?: string;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width ?? "20"}
      height={height ?? "20"}
      viewBox="0 0 20 20"
      fill={color ?? "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M15 5L5 15"
          stroke={color ?? "white"}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M5 5L15 15"
          stroke={color ?? "white"}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
