import dynamic from "next/dynamic";
import type { StylesConfig } from "react-select";
import type { SelectOptionType } from "../YearFilter";
import { Dispatch, SetStateAction } from "react";
import useNoKeyboardUp from "@/shared/hooks/useNoKeyboardUp";

const Select = dynamic(() => import("react-select").then((m) => m.default), {
  ssr: false,
});

interface SelectProps {
  options: SelectOptionType[];
  selected: SelectOptionType | null;
  setSelected: Dispatch<SetStateAction<SelectOptionType | null>>;
  placeholder: string;
  borderColor?: string;
  width?: string;
  criterion: "left" | "right";
}
export default function LightySelect({
  options,
  selected,
  setSelected,
  borderColor,
  width,
  criterion,
}: SelectProps) {
  const styles: StylesConfig = {
    menu: (baseStyles) => ({
      ...baseStyles,
      willChange: "opacity transform",
      animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      right: criterion === "right" ? 0 : "",
      left: criterion === "left" ? 0 : "",
      zIndex: 30,
      padding: "4px 16px",
      borderRadius: "12px",
      borderColor: "#F4F4F4",
      borderWidth: "1px",
      boxShadow: "0px 0px 16px 0px #0000001F",
      width: "fit-content",
      fontWeight: 500,
      color: "#0A0A0A",
      fontSize: "13px",
      lineHeight: "20px",
      letterSpacing: "-0.39px",
      "& > div": {
        padding: 0,
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        "& > div:last-child": {
          borderColor: "white",
          flex: "none",
        },
        "& > div": {
          width: width ?? "99px",
          fontWeight: 500,
          color: "#0A0A0A",
          padding: 0,
          paddingTop: "12px",
          paddingBottom: "12px",
          borderBottomWidth: "1px",
          borderBottomColor: "#F4F4F4",
          flex: "none",
          "&:hover": {
            color: "#808080",
            backgroundColor: "#F4F4F4",
            transition: "color 0.3s ease",
            cursor: "pointer",
          },
          "&.react-select__option--is-selected": {
            backgroundColor: "white",
          },
          "&.react-select__option--is-focused": {
            backgroundColor: "white",
          },
        },
      },
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      minHeight: "30px !important",
      paddingTop: "6.5px",
      paddingBottom: "6.5px",
      paddingLeft: "10.5px",
      paddingRight: "8.5px",
      borderRadius: "12px",
      borderWidth: "1.5px !important",
      borderColor: state.isFocused ? borderColor : borderColor || "#E9E9E9",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: state.isFocused ? borderColor : borderColor || "#E9E9E9",
        cursor: "pointer",
      },
      "& > div:first-child": {
        padding: 0,
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "14px",
        letterSpacing: "-3%",
        marginRight: "4px",
        "& > div:last-child": {
          height: "14px",
          padding: 0,
          margin: 0,
          "& > input": {
            lineHeight: "14px",
            caretColor: "transparent",
          },
        },
      },
      "& > div:last-child": {
        height: "16px",
        "& > div": {
          padding: 0,
          "&>svg": {
            fill: "#686868",
            width: "16px",
            height: "16px",
          },
        },
      },
    }),
  };
  useNoKeyboardUp();
  return (
    <Select
      className="react-select-container w-fit"
      classNamePrefix="react-select"
      placeholder="년도"
      defaultValue={selected}
      onChange={(newValue) => setSelected(newValue as SelectOptionType)}
      options={options}
      styles={styles}
    />
  );
}
