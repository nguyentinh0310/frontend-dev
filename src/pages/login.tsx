import { authApi } from "@/api-client";
import { LoginForm, Seo } from "@/components";
import { useAuth } from "@/hooks";
import { LoginPayload } from "@/models";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const handleSubmit = async (values: LoginPayload) => {
    try {
      await login(values);
      router.push("/");
      toast.success("Đăng nhập thành công!");
    } catch (error: any) {
      toast.error("Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  return (
    <>
      <Seo
        data={{
          title: "Đăng nhập | It Network",
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
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
