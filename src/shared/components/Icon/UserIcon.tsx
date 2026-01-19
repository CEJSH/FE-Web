export default function UserIcon({
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
      <g id="type=users">
        <path
          id="Icon"
          d="M2 18C3.14442 16.084 5.65262 14.7727 9.56575 14.7727C13.4789 14.7727 15.9871 16.084 17.1315 18M17.8555 13.3198C19.9277 14.3598 20.9639 15.3998 22 17.4798M15.7002 5.37054C16.6753 5.89703 17.3382 6.93083 17.3382 8.12003C17.3382 9.27488 16.7131 10.2832 15.7839 10.8226M12.6742 8.12C12.6742 9.84313 11.2825 11.24 9.56575 11.24C7.84902 11.24 6.45734 9.84313 6.45734 8.12C6.45734 6.39687 7.84902 5 9.56575 5C11.2825 5 12.6742 6.39687 12.6742 8.12Z"
          stroke={color ?? "#0A0A0A"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
