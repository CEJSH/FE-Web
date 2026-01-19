export default function ArrowLeftIcon({
  width,
  height,
  color,
}: {
  width?: string;
  height?: string;
  color?: string;
}) {
  return (
    <svg
      width={width ?? "20"}
      height={height ?? "20"}
      viewBox="0 0 20 20"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M13.3334 16.6667L7.05886 9.999L13.3334 3.33342"
          stroke={color ? color : "#0A0A0A"}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeOpacity: 1,
          }}
        />
      </g>
    </svg>
  );
}
