export default function EmptyLogoIcon({
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
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M8 2L9.62054 6.37946L14 8L9.62054 9.62054L8 14L6.37946 9.62054L2 8L6.37946 6.37946L8 2Z"
          stroke={color ?? "#979797"}
          style={{
            strokeOpacity: 1,
          }}
          strokeWidth="1.33"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
