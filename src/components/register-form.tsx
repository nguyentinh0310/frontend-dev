import { RegisterPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputField, PasswordField, RadioOptionField } from "./common";

export interface RegisterFormProps {
  onSubmit: (values: RegisterPayload) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Please enter your full name.")
      .test(
        "should has at least two words",
        "Please enter at least two words.",
        (value: any) => {
          return value.split(" ").length >= 2;
        }
      ),
    account: yup
      .string()
      .required("Tài khoản không để trống")
      .email("Vui lòng nhập email hợp lệ"),
    password: yup
      .string()
      .required("Mật khẩu không để trống")
      .min(6, "Mật khẩu 6 kí tự trở lên"),
    retypePassword: yup
      .string()
      .required("Nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Chọn nam hoặc nữ.")
      .required("Vui lòng chọn giới tính"),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: "",
      account: "",
      password: "",
      retypePassword: "",
      gender: "",
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
      <h1 className="mb-3 text-center title-login">Đăng ký</h1>

      <InputField name="fullname" control={control} placeholder="Họ tên" />
      <InputField name="account" control={control} placeholder="Email" />
      <PasswordField name="password" control={control} placeholder="Mật khẩu" />
      <PasswordField
        name="retypePassword"
        control={control}
        placeholder="Xác nhận mật khẩu"
      />

      <div className="mb-3">
        <label className="form-label mr-3">&nbsp;Giới tính: &nbsp; </label>
        <RadioOptionField
          name="gender"
          control={control}
          options={[
            { label: "Nam", value: "male" },
            { label: "Nữ", value: "female" },
          ]}
        />
      </div>
      <div className="mt-2 mb-3 d-flex justify-content-center">
        <button type="submit" className="btn">
          Đăng ký
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <Link href="/login">Đã có tài khoản. Đăng nhập</Link>
      </div>
    </Form>
  );
}
