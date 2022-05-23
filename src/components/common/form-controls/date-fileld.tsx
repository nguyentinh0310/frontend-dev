import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface DateFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

export function DateField({ name, control }: DateFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
      <div className="mb-3">
        <input
          type="date"
          className={"form-control " + (error ? "is-invalid" : "")}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="invalid-feedback">{error?.message}</div>
      </div>
  );
}
