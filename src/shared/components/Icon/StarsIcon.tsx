export default function StarsIcon({
  width,
  height,
  color,
  className,
}: {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={width ?? "24"}
      height={height ?? "24"}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <g id="Icon">
          <path
            d="M14.6471 3L16.3629 7.63707L21 9.35294L16.3629 11.0688L14.6471 15.7059L12.9312 11.0688L8.29412 9.35294L12.9312 7.63707L14.6471 3Z"
            stroke={color ?? "#0A0A0A"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M6.70588 13.5882L8.20478 15.7952L10.4118 17.2941L8.20478 18.793L6.70588 21L5.20698 18.793L3 17.2941L5.20698 15.7952L6.70588 13.5882Z"
            stroke={color ?? "#0A0A0A"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
