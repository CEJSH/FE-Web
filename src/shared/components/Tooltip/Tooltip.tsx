import { useState } from "react";
import CloseIcon from "../Icon/CloseIcon";
import clsx from "clsx";

export default function Tooltip({
  direction,
  className,
  color,
  title,
  closeButton,
  id,
}: {
  id?: string;
  direction: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight";
  className?: string;
  color?: string;
  title?: string;
  closeButton: boolean;
}) {
  const [closeClicked, setCloseClicked] = useState(false);

  const onButtonClick = () => {
    setCloseClicked(true);
  };
  return (
    <div
      id={id}
      role="tooltip"
      className={clsx(tooltipWrapperStyle, className, closeClicked && "hidden")}
      style={{ backgroundColor: color }}
    >
      <span className="flex-none" id={id ? `${id}-label` : undefined}>
        {title}
      </span>
      {closeButton && (
        <button
          type="button"
          aria-label="툴팁 닫기"
          onClick={onButtonClick}
          className="flex-none cursor-pointer bg-transparent border-0 p-[2px]"
        >
          <CloseIcon width="16" height="16" />
        </button>
      )}
      {direction === "bottom" && <BottomDirIcon color={color} />}
      {direction === "top" && <TopDirIcon color={color} />}
      {direction === "topLeft" && <TopLeftDirIcon color={color} />}
      {direction === "topRight" && <TopRightDirIcon color={color} />}
      {direction === "left" && <LeftDirIcon color={color} />}
      {direction === "right" && <RightDirIcon color={color} />}
    </div>
  );
}

const tooltipWrapperStyle = `z-10 relative flex items-center justify-between gap-3 text-base-white text-C1 px-4 py-3 rounded-xl bg-grayscale-900`;

function BottomDirIcon({
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
      className="absolute -translate-x-1/2 left-1/2 -bottom-[9px]"
      width={width ?? "49"}
      height={height ?? "9"}
      viewBox="0 0 49 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="break" clipPath="url(#clip0_24_3357)">
        <path
          id="Polygon 1"
          d="M24.4394 5.74827C24.7378 6.08391 25.2622 6.08391 25.5606 5.74827L31 -0.3711H19L24.4394 5.74827Z"
          fill={color ?? "#fff"}
        />
      </g>
      <defs>
        <clipPath id="clip0_24_3357">
          <rect
            width="48"
            height="9"
            fill="white"
            transform="matrix(1 0 0 -1 0.5 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function TopDirIcon({
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
      width={width || "49"}
      height={height || "9"}
      className="absolute -top-[9px] left-1/2 -translate-x-1/2 "
      viewBox="0 0 49 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="break" clipPath="url(#clip0_15_2497)">
        <path
          id="Polygon 1"
          d="M24.4394 3.25173C24.7378 2.91609 25.2622 2.91609 25.5606 3.25173L31 9.3711H19L24.4394 3.25173Z"
          fill={color ?? "#0A0A0A"} // apply fill directly
        />
      </g>
      <defs>
        <clipPath id="clip0_15_2497">
          <rect width="48" height="9" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TopRightDirIcon({
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
      width={width || "49"}
      height={height || "9"}
      className="absolute -top-[9px] right-1/4 translate-x-1/2 "
      viewBox="0 0 49 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="break" clipPath="url(#clip0_15_2497)">
        <path
          id="Polygon 1"
          d="M24.4394 3.25173C24.7378 2.91609 25.2622 2.91609 25.5606 3.25173L31 9.3711H19L24.4394 3.25173Z"
          fill={color ?? "#0A0A0A"} // apply fill directly
        />
      </g>
      <defs>
        <clipPath id="clip0_15_2497">
          <rect width="48" height="9" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TopLeftDirIcon({
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
      width={width || "49"}
      height={height || "9"}
      className="absolute -top-[9px] left-1/4 -translate-x-1/2 "
      viewBox="0 0 49 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="break" clipPath="url(#clip0_15_2497)">
        <path
          id="Polygon 1"
          d="M24.4394 3.25173C24.7378 2.91609 25.2622 2.91609 25.5606 3.25173L31 9.3711H19L24.4394 3.25173Z"
          fill={color ?? "#0A0A0A"} // apply fill directly
        />
      </g>
      <defs>
        <clipPath id="clip0_15_2497">
          <rect width="48" height="9" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function LeftDirIcon({
  width = "9",
  height = "48",
  color = "#0A0A0A",
}: {
  width?: string;
  height?: string;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      className="absolute top-1/2 -left-[8px] -translate-y-1/2 "
      viewBox="0 0 9 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="break" clipPath="url(#clip0_15_2513)">
        <path
          id="Polygon 1"
          d="M0.840836 25.2474C0.393321 24.8496 0.393321 24.1504 0.840836 23.7526L9 16.5L9 32.5L0.840836 25.2474Z"
          fill={color} // Use the `color` prop to dynamically set the fill color
        />
      </g>
      <defs>
        <clipPath id="clip0_15_2513">
          <rect
            width="48"
            height="9"
            fill="white"
            transform="matrix(0 -1 1 0 0 48)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function RightDirIcon({
  width = "9",
  height = "48",
  color = "#0A0A0A",
}: {
  width?: string;
  height?: string;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      className="absolute top-1/2 -right-[8px] -translate-y-1/2"
      viewBox="0 0 9 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="break" clipPath="url(#clip0_24_3360)">
        <path
          id="Polygon 1"
          d="M5.74827 23.9394C6.08391 24.2378 6.08391 24.7622 5.74827 25.0606L-0.3711 30.5L-0.3711 18.5L5.74827 23.9394Z"
          fill={color ?? "red"}
        />
      </g>
      <defs>
        <clipPath id="clip0_24_3360">
          <rect
            width="48"
            height="9"
            fill="white"
            transform="matrix(0 1 -1 0 9 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
