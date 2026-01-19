export default function LightyLogo({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      data-testid="lighty-logo"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1321316082">
        <path
          id="Icon"
          d="M12 1.20007L14.9169 9.08309L22.8 12.0001L14.9169 14.9171L12 22.8001L9.08297 14.9171L1.19995 12.0001L9.08297 9.08309L12 1.20007Z"
          fill="#0A0A0A"
          style={{
            fill: "#0A0A0A",
            fillOpacity: 1,
          }}
        />
      </g>
    </svg>
  );
}
