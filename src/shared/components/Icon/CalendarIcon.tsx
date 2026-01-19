export default function CalendarIcon({
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
      className={className}
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M6.85714 7.42854H17.0625M6.16071 2V3.62876M17.625 2V3.62856M21 6.62856L21 18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6.62856C3 4.97171 4.34315 3.62856 6 3.62856H18C19.6569 3.62856 21 4.97171 21 6.62856Z"
          stroke={color ?? "#0A0A0A"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
