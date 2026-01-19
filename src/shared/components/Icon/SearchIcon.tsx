export default function SearchIcon({
  width,
  height,
  className,
  color,
}: {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
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
      <g id="icon/type25">
        <g id="Group 427319952">
          <path
            id="Vector"
            d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
            stroke={color ?? "#0A0A0A"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M20 20L16 16"
            stroke={color ?? "#0A0A0A"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
