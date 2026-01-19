export default function ArrowRightIcon({
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
      data-testid="arrow-right-icon"
      width={width ?? "20"}
      height={height ?? "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M7.5 16.6667L13.7745 9.99893L7.5 3.33335"
          stroke={color ?? "#D8D8D8"}
          style={{
            strokeOpacity: 1,
          }}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
