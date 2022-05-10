import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  placeholder?: string;
}

export function InputField({ name, control, placeholder }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    // <div className="mb-3">
    <>
      <input
        type="text"
        className={"mb-3 form-control " + (error ? "is-invalid" : "")}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      <div className="invalid-feedback">{error?.message}</div>
    </>
    // </div>
  );
}
