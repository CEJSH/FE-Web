import Text from "./Text";
import Spacing from "./Spacing";
import { Spinner } from "./Spinner/DotSpinner";

function FullPageLoader({
  message,
  height,
}: {
  message?: string;
  height?: string;
}) {
  return (
    <div
      id="fullPageLoader"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        opacity: 1,
        backgroundColor: "#E9E9E9",
        width: "100dvw",
        height: height ?? "calc(100dvh - 57px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000080",
          padding: "11px",
          borderRadius: "12px",
        }}
      >
        <Spinner />
        {message != null ? (
          <>
            <Spacing size={120} />
            <Text>{message}</Text>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default FullPageLoader;
