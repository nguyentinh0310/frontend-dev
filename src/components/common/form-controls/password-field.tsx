import React, { InputHTMLAttributes, useState } from "react";
import { Control, useController } from "react-hook-form";

export interface PasswordFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  placeholder?: string;
  type?: string;
}

export function PasswordField({
  name,
  control,
  placeholder,
}: PasswordFieldProps) {
  const [showPass, setShowPass] = useState(false);

  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <div className="mb-3 show-pass">
      <input
        type={showPass ? "text" : "password"}
        className={"form-control " + (error ? "is-invalid" : "")}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {!error && (
        <small className="icon-small" onClick={() => setShowPass(!showPass)}>
          {showPass ? (
            <i className="fa-solid fa-eye-slash"></i>
          ) : (
            <i className="fa-solid fa-eye"></i>
          )}
        </small>
      )}
      <div className="invalid-feedback">{error?.message}</div>
    </div>
  );
}
