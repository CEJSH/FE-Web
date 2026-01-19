import React from "react";

export default function ThinLightyLogo({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width ?? "40"}
      height={height ?? "40"}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <g id="Icon">
          <path
            d="M24.4118 5L27.2715 12.7285L35 15.5882L27.2715 18.448L24.4118 26.1765L21.552 18.448L13.8235 15.5882L21.552 12.7285L24.4118 5Z"
            stroke="#D8D8D8"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M11.1765 22.6471L13.6746 26.3254L17.3529 28.8235L13.6746 31.3217L11.1765 35L8.6783 31.3217L5 28.8235L8.6783 26.3254L11.1765 22.6471Z"
            stroke="#D8D8D8"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
