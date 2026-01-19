export default function LightyLogoForNavBar({
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
      width={width ?? "25"}
      height={height ?? "24"}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <g id="Icon">
          <path
            d="M15.1471 3L16.8629 7.63707L21.5 9.35294L16.8629 11.0688L15.1471 15.7059L13.4312 11.0688L8.79412 9.35294L13.4312 7.63707L15.1471 3Z"
            stroke={color ?? "#AEAEAE"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M7.20588 13.5882L8.70478 15.7952L10.9118 17.2941L8.70478 18.793L7.20588 21L5.70698 18.793L3.5 17.2941L5.70698 15.7952L7.20588 13.5882Z"
            stroke={color ?? "#AEAEAE"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
