export default function EmptySquareIcon({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke="#0A0A0A"
        strokeDasharray="2 2"
        style={{
          stroke: "#0A0A0A",
          strokeOpacity: 1,
        }}
      />
    </svg>
  );
}
