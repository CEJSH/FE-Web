import React from "react";

export default function FolderIcon({
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
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M3.87479 3.86133V2.74453C3.87479 2.33334 4.21058 2 4.62481 2H11.75C12.1642 2 12.5 2.33334 12.5 2.74453V5.72265M2.00033 12.5109L2.00039 6.8498C2.00039 6.28276 2.00018 5.47511 2 4.89032C1.99987 4.47901 2.33571 4.14598 2.75005 4.14598H6.32401L8.05219 5.97854H13.25C13.6642 5.97854 14 6.31189 14 6.72309L13.9998 12.511C13.9998 13.3334 13.3282 14 12.4998 14L3.50037 14C2.67192 14 2.00033 13.3333 2.00033 12.5109Z"
          stroke={color ?? "#979797"}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
