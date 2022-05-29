import { authApi } from "@/api-client";
import { RegisterForm, Seo } from "@/components";
import { RegisterPayload } from "@/models";
import React from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const handleSubmit = async (values: RegisterPayload) => {
    try {
      await authApi.register(values);
      toast.success("Đăng ký thành công, Vui lòng xác nhận email!");
    } catch (error: any) {
      toast.error("Email đã tồn tại");
    }
  };
  return (
    <>
      <Seo
        data={{
          title: "Đăng ký | It Network",
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
          <RegisterForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
