import { Explore, LeftPanel, MainLayout, RightPanel, Seo } from "@/components";
import { IPost, ListResponse } from "@/models";
import axios from "axios";
import { GetStaticProps } from "next";
import React, { Fragment } from "react";
import Cookies from "cookies";
import { useNotify } from "@/hooks";

export interface ExplorePageProps {
  initPosts: ListResponse<IPost>;
}

export default function ExplorePage({ initPosts }: ExplorePageProps) {
  const { notifies } = useNotify();

  return (
    <Fragment>
     <Seo
        data={{
          title: `${
            notifies?.totalRows > 0 ? `(${notifies?.totalRows})` : ""
          } Khám phá | It Network`,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
    <section className="explore-page">
      <LeftPanel />
      <Explore initPosts={initPosts} />
      <RightPanel />
    </section>
    </Fragment>
  );
}
ExplorePage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<ExplorePageProps> = async () => {
  const res = await axios.get(`${process.env.API_URL}/api/v1/posts?limit=15`);

  return {
    props: {
      initPosts: res.data,
    },
  };
};
