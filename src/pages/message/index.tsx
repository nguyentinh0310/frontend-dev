import { LeftSide, MainLayout, RightSide, Seo } from "@/components";
import { NextPageWithLayout } from "@/models";
import React from "react";

const MessagePage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: "Tin nhắn",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <div className="messages">
        <div className="message-left-side">
          <LeftSide />
        </div>
        <div className="message-right-side right-mess">
          <RightSide />
        </div>
      </div>
    </>
  );
};
MessagePage.Layout = MainLayout;

export default MessagePage;
