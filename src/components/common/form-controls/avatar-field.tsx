import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface AvatarFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

export function AvatarField({ name, control }: AvatarFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <>
      <input
        type="file"
        id="file-up"
        accept="image/*"
        onChange={onChange}
        onBlur={onBlur}
      />
     <small style={{ color: "#dc3545", display: "block" }}>{error?.message}</small>
    </>
  );
}
