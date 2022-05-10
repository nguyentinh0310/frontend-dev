import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioOptionFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  options: RadioOption[];
}

export function RadioOptionField({
  name,
  control,
  options,
}: RadioOptionFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <>
      {options.map((option) => (
        <div className="form-check form-check-inline" key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <label className="form-check-label">{option.label}</label>
        </div>
      ))}
      <small style={{ color: "#dc3545", display: "block" }}>
        {error?.message}
      </small>
    </>
  );
}
