import { ProfileBody, ProfileLayout, Seo } from "@/components";
import { useAuth, useNotify } from "@/hooks";
import { IPost, ListResponse } from "@/models";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { Fragment } from "react";

export interface ProfilePageProps {
  initPosts: ListResponse<IPost>;
}
export default function ProfilePage({ initPosts }: ProfilePageProps) {
  const { auth } = useAuth();
  const { notifies } = useNotify();

  return (
    <Fragment>
      <Seo
        data={{
          title: `
          ${notifies?.totalRows > 0 ? `(${notifies?.totalRows} )` : ""}
          ${auth?.fullname} | Trang cá nhân `,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
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
    fallback: "blocking", // or true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ProfilePageProps> = async ({
  params,
}) => {
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
