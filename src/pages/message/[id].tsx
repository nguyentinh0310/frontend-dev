import { LeftSide, MainLayout, RightSide, Seo } from "@/components";
import { NextPageWithLayout } from "@/models";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useUser } from "@/hooks/use-user";

const Coversation: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser(id);
  return (
    <Fragment>
      <Seo
        data={{
          title: `${user?.fullname} | Tin nhắn`,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />

      <div className="messages">
        <div className="message-left-side left-mess">
          <LeftSide />
        </div>
        <div className="message-right-side">
          <RightSide />
        </div>
      </div>
    </Fragment>
  );
};
Coversation.Layout = MainLayout;

export default Coversation;
