import { authApi } from "@/api-client";
import { Seo } from "@/components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const ActivationEmail = () => {
  const router = useRouter();
  const { token } = router.query;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          await authApi.activeAccount({ active_token: token });
          setSuccess("Tài khoản kích hoạt thành công!");
        } catch (error: any) {
          setError("Tài khoản đã được kích hoạt!");
          router.push("/login");
        }
      })();
    }
  }, [token]);

  return (
    <>
      <Seo
        data={{
          title: "Kích hoạt tài khoản",
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
          <div className="logo">
            <h1 className="title">IT Network</h1>
            <p>Mạng xã hội dành cho IT</p>
          </div>
          <div className="active_page">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <div className="mt-2 mb-3 d-flex justify-content-center">
              <button className="btn" onClick={() => router.push("/login")}>
                Đi tới trang đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivationEmail;
