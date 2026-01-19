"use client";
import { useState } from "react";
import LightySelect from "./Select/LightySelect";

const yearOptions = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

export type SelectOptionType = {
  value: string;
  label: string;
};

export default function YearFilter() {
  const [selectedYear, setSelectedYear] = useState<SelectOptionType | null>({
    value: "2026",
    label: "2026",
  });

  return (
    <LightySelect
      criterion="right"
      options={yearOptions}
      selected={selectedYear}
      setSelected={setSelectedYear}
      placeholder="년도"
      borderColor="#E9E9E9"
    />
  );
}
