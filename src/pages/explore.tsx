import { Explore, LeftPanel, MainLayout, RightPanel, Seo } from "@/components";
import { useNotify } from "@/hooks";
import { IPost, ListResponse } from "@/models";
import { GetStaticProps } from "next";
import React, { Fragment } from "react";

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
          url: "https://it-network-pvptd9hy4-nguyentinh0310.vercel.app/",
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
  const response = await fetch(`${process.env.API_URL}/api/v1/posts?limit=15`);
  const data = await response.json();

  return {
    props: {
      initPosts: data,
    },
    revalidate: 60,
  };
};




