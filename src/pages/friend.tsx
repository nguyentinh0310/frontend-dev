import { ListFiend, MainLayout, Seo, SuggestFiend } from "@/components";
import { NextPageWithLayout } from "@/models";
import React from "react";

const FriendPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: "Bạn bè",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <section className="friend-page">
        <ListFiend />
        <SuggestFiend />
      </section>
    </>
  );
};
FriendPage.Layout = MainLayout;

export default FriendPage;
