export default function CheckInCircleIcon({
  width,
  height,
  checked,
}: {
  width?: string;
  height?: string;
  checked?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={width ?? "32"}
      height={height ?? "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Vector"
          d="M15.9998 29.3333C23.3636 29.3333 29.3332 23.3638 29.3332 16C29.3332 8.63619 23.3636 2.66666 15.9998 2.66666C8.63604 2.66666 2.6665 8.63619 2.6665 16C2.6665 23.3638 8.63604 29.3333 15.9998 29.3333Z"
          fill={checked ? "#0A0A0A" : "#D8D8D8"}
          stroke={checked ? "#0A0A0A" : "#D8D8D8"}
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="icon_2">
          <path
            id="Icon"
            d="M21.3334 11.5555L12.7155 20.4444L9.77783 17.4145"
            stroke="white"
            style={{
              stroke: "white",
            }}
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
