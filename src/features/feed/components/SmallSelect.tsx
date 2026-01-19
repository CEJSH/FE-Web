import dynamic from "next/dynamic";
import type { StylesConfig } from "react-select";
import { Dispatch, SetStateAction } from "react";
import { SelectOptionType } from "@/shared/components/YearFilter";
import useNoKeyboardUp from "@/shared/hooks/useNoKeyboardUp";

const Select = dynamic(() => import("react-select").then((m) => m.default), {
  ssr: false,
});

interface SelectProps {
  options: SelectOptionType[];
  selected: SelectOptionType | null;
  setSelected: Dispatch<SetStateAction<SelectOptionType | null>> | null;
  placeholder: string;
  borderColor?: string;
  width?: string;
}
export default function SmallSelect({
  options,
  selected,
  setSelected,
  borderColor,
  width,
}: SelectProps) {
  const styles: StylesConfig = {
    menu: (baseStyles) => ({
      ...baseStyles,
      willChange: "transform opacity",
      animation: "selectMenuBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      zIndex: 20,
      paddingTop: "14px",
      paddingBottom: "14px",
      paddingLeft: "16px",
      paddingRight: "44px",
      borderRadius: "12px",
      borderColor: "#F4F4F4",
      borderWidth: "1.4px",
      boxShadow: "0px 0px 16px 0px #0000001F",
      width: "fit-content",
      "& > div": {
        padding: 0,
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        "& > div:last-child": {
          //   borderColor: "white",
          flex: "none",
        },
        "& > div": {
          width: width ? width : "full",
          fontWeight: 500,
          color: "#0A0A0A",
          fontSize: "13px",
          lineHeight: "14px",
          letterSpacing: "-0.39px",
          padding: 0,
          flex: "none",
          "&:hover": {
            backgroundColor: "white",
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
      width: "fit-content",
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "12px",
      paddingRight: "8px",
      borderRadius: "12px",
      borderWidth: "1.4px",
      borderColor: state.isFocused ? borderColor : borderColor || "#E9E9E9",
      boxShadow: state.isFocused ? "none" : "none", // react-select는 boxShadow로 outline을 표현
      "&:hover": {
        borderColor: state.isFocused ? borderColor : borderColor || "#E9E9E9",
        cursor: "pointer",
      },
      "& > div:first-child": {
        padding: 0,
        fontWeight: 600,
        fontSize: "13px",
        lineHeight: "16.9px",
        letterSpacing: "-3%",
        marginRight: "4px",

        "& > div": {
          color: "#0A0A0A",
        },

        "& > div:last-child": {
          padding: 0,
          margin: 0,

          "& > input": {
            caretColor: "transparent",
          },
        },
      },
      "& > div:last-child": {
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
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="3명 작성 완료"
      defaultValue={selected}
      onChange={(newValue) =>
        setSelected && setSelected(newValue as SelectOptionType)
      }
      options={options}
      styles={styles}
    />
  );
}
