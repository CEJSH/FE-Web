export default function NarrowRightIcon({
  width,
  height,
  checked,
  rotate,
}: {
  width?: string;
  height?: string;
  checked?: boolean;
  rotate?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={width ?? "16"}
      height={height ?? "16"}
      style={{
        transform: `rotate(${rotate ? 90 : 0}deg)`,
        transition: "transform 0.3s ease-in-out",
      }}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="chevron-right">
        <path
          id="Vector"
          d="M6 12L10 8L6 4"
          stroke={checked ? "#0A0A0A" : "#D8D8D8"}
          style={{
            color: "color(display-p3 0.0392 0.0392 0.0392)",
            strokeOpacity: 1,
          }}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
