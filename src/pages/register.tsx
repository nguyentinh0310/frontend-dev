import { authApi } from "@/api-client";
import { RegisterForm } from "@/components";
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
    <div className="wrapper">
      <div className="wrapper-left">
        <div className="background"></div>
      </div>
      <div className="wrapper-right">
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
