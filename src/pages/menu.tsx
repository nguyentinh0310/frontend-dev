import { MainLayout, Menu, Seo } from "@/components";
import React, { Fragment } from "react";

export default function MenuPage() {
  return (
    <Fragment>
      <Seo
        data={{
          title: "Danh mục",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="not-support-menu">
            <span>Không hỗ trợ</span>
          </div>
        </div>
      </div>
      <Menu />
    </Fragment>
  );
}
MenuPage.Layout = MainLayout;
