export default function MessageIcon({
  width,
  height,
  onClick,
}: {
  width?: string;
  height?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      style={{
        cursor: "pointer",
      }}
      width={width ?? "16"}
      height={height ?? "16"}
      onClick={onClick}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="message-circle">
        <path
          id="Vector"
          d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33333 13.3334C7.45342 13.3356 6.58541 13.1301 5.8 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66437 8.5466 2.66667 7.66669C2.66707 6.61452 2.96041 5.58325 3.51381 4.68839C4.06722 3.79352 4.85884 3.0704 5.8 2.60002C6.58541 2.20331 7.45342 1.99772 8.33333 2.00002H8.66667C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9233 5.94379 14 7.33335V7.66669Z"
          stroke="#AEAEAE"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector 629"
          d="M6 6H10"
          stroke="#AEAEAE"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          id="Vector 630"
          d="M6 9H8"
          stroke="#AEAEAE"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
