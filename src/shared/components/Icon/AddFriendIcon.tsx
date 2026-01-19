export default function AddFriendIcon({
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
      width={width ?? "20"}
      height={height ?? "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 427319951">
        <g id="Group 427319955">
          <path
            id="Icon"
            d="M1 18.4335C2.09864 16.601 4.50651 15.3468 8.26312 15.3468C12.0197 15.3468 14.4276 16.601 15.5262 18.4335M11.2472 8.98395C11.2472 10.632 9.91117 11.968 8.26312 11.968C6.61506 11.968 5.27905 10.632 5.27905 8.98395C5.27905 7.33589 6.61506 5.99988 8.26312 5.99988C9.91117 5.99988 11.2472 7.33589 11.2472 8.98395Z"
            stroke={color ?? "#0A0A0A"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g id="Group 427319953">
            <path
              id="Vector 1"
              d="M16 1V5.36364V7"
              stroke={color ?? "#0A0A0A"}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              id="Vector 2"
              d="M19 4H14.6364H13"
              stroke={color ?? "#0A0A0A"}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
