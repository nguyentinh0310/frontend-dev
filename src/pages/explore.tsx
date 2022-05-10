import { Explore, LeftPanel, MainLayout, RightPanel } from "@/components";
import { IPost, ListResponse } from "@/models";
import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";
import Cookies from "cookies";

export interface ExplorePageProps {
  initPosts: ListResponse<IPost>;
}

export default function ExplorePage({ initPosts }: ExplorePageProps) {
  return (
    <section className="explore-page">
      <LeftPanel />
      <Explore initPosts={initPosts} />
      <RightPanel />
    </section>
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
