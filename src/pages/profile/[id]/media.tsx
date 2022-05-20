import { ProfileLayout } from "@/components";
import { usePostUser } from "@/hooks/use-post";
import { IPost, ListResponse } from "@/models";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export interface ProfileMediaPageProps {
  initPosts: ListResponse<IPost>;
}

export default function ProfileMediaPage({ initPosts }: ProfileMediaPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const [postArr, setPostArr] = useState(initPosts);
  const [loading, setLoading] = useState(false);

  const { postUser, isLoading } = usePostUser(id);

  useEffect(() => {
    if (postUser) {
      setPostArr(postUser);
      setLoading(true);
    }
  }, [postUser]);

  return (
    <div className="profile-media mb-5">
      <div className="row">
        {loading && isLoading ? (
          <div className="col-lg-4 col-sm-6 media-col">
            <Skeleton width="100%" height="100%" />
          </div>
        ) : (
          <>
           {postArr?.data.length === 0 && <h3 className="text-center mt-2">Chưa có hình ảnh nào cả</h3>}
            {postArr?.data.map((post: IPost) => (
              <Link href={`/posts/${post?._id}`} key={post?._id}>
                <div className="col-lg-4 col-sm-6 media-col">
                  {post?.images[0]?.url.match(/video/i) ? (
                    <video
                      controls
                      src={post?.images[0]?.url}
                      className="d-block w-100 h-100"
                    />
                  ) : (
                    <img
                      src={post?.images[0]?.url}
                      className="w-100"
                      alt={post?.images[0]?.url}
                    />
                  )}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
ProfileMediaPage.Layout = ProfileLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.API_URL}/api/v1/posts`);
  return {
    paths: res.data.data.map((post: IPost) => ({
      params: { id: post?.user?._id },
    })),
    fallback: "blocking", // or true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ProfileMediaPageProps> = async ({
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
