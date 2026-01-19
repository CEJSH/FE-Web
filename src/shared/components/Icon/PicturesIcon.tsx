export default function PicturesIcon({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width ?? "18"}
      height={height ?? "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M6.11993 11.7L8.99993 8.99999L10.9199 10.35L13.6399 7.64999L16.0399 9.89999M1.79993 6.74999V14.85H11.3999M7.55993 5.84999V5.78232M16.1999 11.4833V3.81666C16.1999 3.44847 15.9014 3.14999 15.5333 3.14999H5.34659C4.9784 3.14999 4.67993 3.44847 4.67993 3.81666V11.4833C4.67993 11.8515 4.9784 12.15 5.34659 12.15H15.5333C15.9014 12.15 16.1999 11.8515 16.1999 11.4833Z"
          stroke="white"
          style={{ strokeOpacity: 1 }}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
