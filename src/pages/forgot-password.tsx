import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputField, Seo } from "@/components";
import { toast } from "react-toastify";
import { authApi } from "@/api-client";

const ForgotPasswordPage = () => {
  const schema = yup.object().shape({
    account: yup
      .string()
      .required("Tài khoản không để trống")
      .email("Vui lòng nhập email hợp lệ"),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      account: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: any) => {
    try {
      await authApi.forgotPassword(values);
      toast.success("Gửi xác nhận thành công");
    } catch (error) {
      toast.error("Email không hợp lệ");
    }
  };
  return (
    <Fragment>
     <Seo
        data={{
          title: "Quên mật khẩu",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
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
          <h1 className="mb-3 text-center title-login">Quên mật khẩu</h1>
          <div className="mb-3">
            <label className="mb-2">
              &nbsp;Vui lòng nhập email để tìm kiếm tài khoản.
            </label>
            <InputField name="account" control={control} placeholder="Email" />
          </div>
          <div className="mt-2 mb-3 d-flex justify-content-center">
            <button type="submit" className="btn">
              Gửi xác nhận
            </button>
          </div>
        </Form>
      </div>
    </div>
    </Fragment>
  );
};

export default ForgotPasswordPage;
