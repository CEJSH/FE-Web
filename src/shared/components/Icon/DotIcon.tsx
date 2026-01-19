export function DotIcon({
  display,
  className,
}: {
  display: boolean;
  className?: string;
}) {
  return (
    <svg
      width="4"
      height="26"
      viewBox="0 0 4 26"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1321316008">
        <circle
          id="Ellipse 13"
          cx="2"
          cy="10"
          r="2"
          fill={display ? "#FA6767" : "transparent"}
        />
      </g>
    </svg>
  );
}

export function DotWithNumberIcon({ count }: { count: number }) {
  return (
    <div className="absolute top-1 right-[5px] rounded-xl bg-[#FA6767] px-1 text-C2 text-base-white">
      {count}
    </div>
  );
}
