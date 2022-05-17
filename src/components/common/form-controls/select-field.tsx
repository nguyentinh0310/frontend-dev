import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  name: string;
}

export interface SelectFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  options: SelectOption[];
}

export function SelectField({ name, control, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <>
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-label="Default select example"
        required
      >
        <option value="">--</option>
        {options.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
      <small style={{color:"red"}}>{error?.message}</small>

    </>
  );
}
