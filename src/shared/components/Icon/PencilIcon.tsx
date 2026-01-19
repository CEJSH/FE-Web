export default function PencilIcon({
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
      width={width ?? "18"}
      height={height ?? "16"}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="edit-3">
        <path
          id="Vector"
          d="M9 13.3334H15.75"
          stroke={color ?? "white"}
          style={{ strokeOpacity: 1 }}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M12.375 2.33325C12.6734 2.06803 13.078 1.91904 13.5 1.91904C13.7089 1.91904 13.9158 1.95562 14.1088 2.02669C14.3019 2.09776 14.4773 2.20193 14.625 2.33325C14.7727 2.46457 14.8899 2.62047 14.9699 2.79205C15.0498 2.96363 15.091 3.14753 15.091 3.33325C15.091 3.51897 15.0498 3.70287 14.9699 3.87445C14.8899 4.04603 14.7727 4.20193 14.625 4.33325L5.25 12.6666L2.25 13.3333L3 10.6666L12.375 2.33325Z"
          stroke={color ?? "white"}
          style={{ strokeOpacity: 1 }}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
