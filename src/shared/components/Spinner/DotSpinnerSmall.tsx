export default function DotSpinnerSmall({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: 1,
        backgroundColor: "transparent",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        style={{
          width: width ?? 28,
          height: height ?? 28,
        }}
      >
        <style jsx>{`
          .dot {
            fill: #e9e9e9;
          }

          #dot1 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: 0s;
          }
          #dot2 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.7s;
          }
          #dot3 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.6s;
          }
          #dot4 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.5s;
          }
          #dot5 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.4s;
          }
          #dot6 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.3s;
          }
          #dot7 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.2s;
          }
          #dot8 {
            animation: rotate 0.8s infinite steps(1);
            animation-delay: -0.1s;
          }

          @keyframes rotate {
            0%,
            99.99% {
              fill: #e9e9e9;
            }
            12.5%,
            24.99% {
              fill: #000;
            }
            25%,
            100% {
              fill: #e9e9e9;
            }
          }
        `}</style>

        <circle className="dot" id="dot1" cx="50" cy="20" r="6" />
        <circle className="dot" id="dot2" cx="70.7107" cy="29.2893" r="6" />
        <circle className="dot" id="dot3" cx="80" cy="50" r="6" />
        <circle className="dot" id="dot4" cx="70.7107" cy="70.7107" r="6" />
        <circle className="dot" id="dot5" cx="50" cy="80" r="6" />
        <circle className="dot" id="dot6" cx="29.2893" cy="70.7107" r="6" />
        <circle className="dot" id="dot7" cx="20" cy="50" r="6" />
        <circle className="dot" id="dot8" cx="29.2893" cy="29.2893" r="6" />
      </svg>
    </div>
  );
}
