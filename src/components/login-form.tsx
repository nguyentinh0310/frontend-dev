import { LoginPayload } from "@/models";
import Link from "next/link";
import React from "react";
import { Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputField, PasswordField } from "./common";

export interface LoginFormProps {
  onSubmit: (values: LoginPayload) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    account: yup
      .string()
      .required("Tài khoản không để trống")
      .email("Vui lòng nhập email hợp lệ"),
    password: yup
      .string()
      .required("Mật khẩu không để trống")
      .min(6, "Mật khẩu 6 kí tự trở lên"),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      account: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: any) => {
    await onSubmit?.(values);
  };
  return (
    <Form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="needs-validation"
      noValidate
    >
      <div className="logo">
        <h1 className="title">IT Network</h1>
        <p>Mạng xã hội dành cho IT</p>
      </div>
      <h1 className="mb-3 text-center title-login">Đăng nhập</h1>
      <InputField name="account" control={control} placeholder="Email" />
      <PasswordField name="password" control={control} placeholder="Mật khẩu" />

      <div className="mb-3 d-flex justify-content-end">
        <Link href="/forgot-password">Quên mật khẩu?</Link>
      </div>
      <div className="mt-2 mb-3 d-flex justify-content-center">
        <button type="submit" className="btn">
          Đăng nhập
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <Link href="/register">Chưa có tài khoản. Tạo tài khoản mới</Link>
      </div>
    </Form>
  );
}
