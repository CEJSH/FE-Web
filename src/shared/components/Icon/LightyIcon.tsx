export default function LightyIcon({
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
      className={className}
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Icon"
        d="M8 0L10.1607 5.83927L16 8L10.1607 10.1607L8 16L5.83927 10.1607L0 8L5.83927 5.83927L8 0Z"
        fill={color ?? "white"}
        style={{
          fillOpacity: 1,
          transition: "fill 0.5s ease",
        }}
      />
    </svg>
  );
}
