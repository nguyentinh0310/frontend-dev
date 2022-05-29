import { authApi } from "@/api-client";
import { PasswordField, Seo } from "@/components";
import { ResetPasswordPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Mật khẩu không để trống")
      .min(6, "Mật khẩu 6 kí tự trở lên"),
    retypePassword: yup
      .string()
      .required("Nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: ResetPasswordPayload) => {
    try {
      await authApi.resetPassword(values, {
        headers: { Authorization: token },
      });
      toast.success("Đổi mật khẩu thành công");
      router.push("/login");
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <Seo
        data={{
          title: "Khôi phục mật khẩu",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "https://it-network-pvptd9hy4-nguyentinh0310.vercel.app/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <div className="wrapper">
        <div className="wrapper-left">
          <div className="background"></div>
        </div>
        <div className="wrapper-right">
          <Form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="needs-validation"
            noValidate
          >
            <div className="logo">
              <h1 className="title">IT Network</h1>
              <p>Mạng xã hội dành cho IT</p>
            </div>
            <h1 className="mb-3 text-center title-login">Đặt lại mật khẩu</h1>
            <PasswordField
              name="password"
              control={control}
              placeholder="Mật khẩu"
            />
            <PasswordField
              name="retypePassword"
              control={control}
              placeholder="Xác nhận mật khẩu"
            />

            <div className="mt-2 mb-3 d-flex justify-content-center">
              <button type="submit" className="btn">
                Xác nhận
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
