import {
  ListFollowers,
  ListFollowings,
  MainLayout,
  Seo,
  SuggestFiend
} from "@/components";
import { useNotify } from "@/hooks";
import { NextPageWithLayout } from "@/models";
import React from "react";

const FriendPage: NextPageWithLayout = () => {
  const { notifies } = useNotify();

  return (
    <>
      <Seo
        data={{
          title: `${
            notifies?.totalRows > 0 ? `(${notifies?.totalRows})` : ""
          } Bạn bè`,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "https://it-network-pvptd9hy4-nguyentinh0310.vercel.app/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <section className="friend-page">
        <SuggestFiend />
        <ListFollowers />
        <ListFollowings />
      </section>
    </>
  );
};
FriendPage.Layout = MainLayout;

export default FriendPage;
