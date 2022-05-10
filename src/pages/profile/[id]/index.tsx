import { ProfileBody, ProfileLayout } from "@/components";
import { IPost, ListResponse } from "@/models";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { Fragment } from "react";

export interface ProfilePageProps {
  initPosts: ListResponse<IPost>;
}
export default function ProfilePage({initPosts}: ProfilePageProps) {
  return (
    <Fragment>
      <ProfileBody initPosts={initPosts} />
    </Fragment>
  );
}
ProfilePage.Layout = ProfileLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.API_URL}/api/v1/posts`);
  return {
    paths: res.data.data.map((post: IPost) => ({
      params: { id: post?.user?._id },
    })),
    fallback: 'blocking', // or true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ProfilePageProps> = async ({ params }) => {
  const postId = params?.id;
  if (!postId) return { notFound: true };

  const response = await fetch(
    `${process.env.API_URL}/api/v1/posts/user-posts/${postId}`
  );
  const data = await response.json();
  return {
    props: {
      initPosts: data,
    },
    revalidate: 60,
  };
};
