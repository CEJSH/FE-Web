export default function MapPinIcon({
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
      width={width ?? "14"}
      height={height ?? "15"}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="map-pin" clipPath="url(#clip0_969_1108)">
        <path
          id="Vector"
          d="M12.25 6.33334C12.25 10.4167 7 13.9167 7 13.9167C7 13.9167 1.75 10.4167 1.75 6.33334C1.75 4.94095 2.30312 3.60559 3.28769 2.62103C4.27226 1.63646 5.60761 1.08334 7 1.08334C8.39239 1.08334 9.72774 1.63646 10.7123 2.62103C11.6969 3.60559 12.25 4.94095 12.25 6.33334Z"
          stroke={color ?? "#AEAEAE"}
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M7 8.08334C7.9665 8.08334 8.75 7.29983 8.75 6.33334C8.75 5.36684 7.9665 4.58334 7 4.58334C6.0335 4.58334 5.25 5.36684 5.25 6.33334C5.25 7.29983 6.0335 8.08334 7 8.08334Z"
          stroke={color ?? "#AEAEAE"}
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_969_1108">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
