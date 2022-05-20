import { authApi } from "@/api-client";
import { MainLayout, PasswordField, Seo } from "@/components";
import { useAuth } from "@/hooks";
import { NextPageWithLayout, UpdatePasswordPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const SettingPage: NextPageWithLayout = () => {
  const { mutateAuth } = useAuth();

  const schema = yup.object().shape({
    password_old: yup
      .string()
      .required("Mật khẩu không để trống")
      .min(6, "Mật khẩu 6 kí tự trở lên"),
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
      password_old: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values: UpdatePasswordPayload) => {
    try {
      await authApi.updatePassword(values);
      await mutateAuth();
      toast.success("Đổi mật khẩu thành công");
    } catch (error) {
      toast.error("Mật khẩu không khớp");
    }
  };

  return (
    <>
      <Seo
        data={{
          title: "Cài đặt",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <section className="setting-page">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="change-password needs-validation"
          noValidate
        >
          <h4>Đổi mật khẩu:</h4>
          <div className="mb-2 row">
            <label className="col-lg-3 col-sm-12 col-form-label">
              Mật khẩu hiện tại:
            </label>
            <div className="col-lg-9 col-sm-12">
              <PasswordField
                name="password_old"
                control={control}
                placeholder="******"
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-lg-3 col-sm-12 col-form-label">
              Mật khẩu mới:
            </label>
            <div className="col-lg-9 col-sm-12">
              <PasswordField
                name="password"
                control={control}
                placeholder="******"
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-lg-3 col-sm-12 col-form-label">
              Nhập lại mật khẩu mới:
            </label>
            <div className="col-lg-9 col-sm-12">
              <PasswordField
                name="retypePassword"
                control={control}
                placeholder="******"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-pass"
              disabled={isSubmitting}
            >
              Xác nhận&nbsp;
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </button>
          </div>
        </form>

        <div className="dark-mode">
          <h4>Chế độ màn hình:</h4>
          <div className="btn-toggle-bg">
            <label className="label" htmlFor="theme">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <div className="ball"></div>
            </label>
          </div>
        </div>
      </section>
    </>
  );
};
SettingPage.Layout = MainLayout;

export default SettingPage;
