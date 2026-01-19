import React from "react";

export default function CheckIcon({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width ?? "56"}
      height={height ?? "56"}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M42.0001 16.3333L19.378 39.6666L11.6667 31.713"
          stroke="white"
          style={{
            stroke: "white",
            strokeOpacity: 1,
          }}
          strokeWidth="4.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
