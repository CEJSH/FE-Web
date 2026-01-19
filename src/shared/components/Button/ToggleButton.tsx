import clsx from "clsx";

const ToggleButton = ({
  isOn,
  setIsOn,
  ariaLabel = "Toggle",
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  ariaLabel?: string;
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      onClick={() => setIsOn((prev) => !prev)}
      className={clsx(
        styles.tabWrapper,
        isOn ? "bg-grayscale-800" : "bg-grayscale-50"
      )}
    >
      <span
        aria-hidden="true"
        style={{
          boxShadow: "0px 3px 8px 0px #00000026",
        }}
        className={clsx(
          styles.button,
          isOn === true ? "translate-x-7" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default ToggleButton;

const styles = {
  tabWrapper: "p-[2px] rounded-full w-14 h-7",

  button:
    "w-6 h-6 bg-base-white absolute cursor-pointer rounded-full transition-colors duration-300 z-10 transition-transform ease-in-out",
};
