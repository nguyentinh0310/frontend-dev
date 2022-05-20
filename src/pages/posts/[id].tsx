import { MainLayout, PostSkeletonList, Seo, StatusModal } from "@/components";
import { Post } from "@/components/posts";
import { usePost } from "@/hooks/use-post";
import { IPost } from "@/models";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface PostIdPageProps {
  postDetail: IPost;
}

export default function PostIdPage({ postDetail }: PostIdPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const { post, isLoading } = usePost(id);
  const [data, setData] = useState(postDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setData(post);
      setLoading(true);
    }
  }, [post]);

  return (
    <>
      <Seo
        data={{
          title: "Chi tiết bài viết",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />

      <div className="postId-page">
        {loading && isLoading ? (
          <PostSkeletonList length={2} />
        ) : (
          <Post post={data} />
        )}
        <StatusModal />
      </div>
    </>
  );
}
PostIdPage.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.API_URL}/api/v1/posts`);
  return {
    paths: res.data.data.map((post: IPost) => ({ params: { id: post?._id } })),
    fallback: false, // or true or 'blocking'
  };
};
export const getStaticProps: GetStaticProps<PostIdPageProps> = async ({
  params,
}) => {
  const postId = params?.id;
  if (!postId) return { notFound: true };

  const response = await fetch(`${process.env.API_URL}/api/v1/posts/${postId}`);
  const data = await response.json();

  return {
    props: {
      postDetail: data,
    },
    revalidate: 60,
  };
};
