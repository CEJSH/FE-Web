export default function MailIcon({
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
      width={width ?? "20"}
      height={height ?? "20"}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="mail-04">
        <path
          id="Icon"
          d="M3.75 8.75H2.5V16.25C2.5 16.9404 3.05964 17.5 3.75 17.5H16.25C16.9404 17.5 17.5 16.9404 17.5 16.25V8.75H16.25M3.75 8.75L10 12.5L16.25 8.75M3.75 8.75V5C3.75 3.61929 4.86929 2.5 6.25 2.5H13.75C15.1307 2.5 16.25 3.61929 16.25 5V8.75"
          stroke={color ?? "white"}
          style={{
            transition: "stroke 0.5s ease",
          }}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
