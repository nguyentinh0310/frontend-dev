import { ProfileLayout, Seo } from "@/components";
import { useNotify } from "@/hooks";
import { usePostUser } from "@/hooks/use-post";
import { IPost, ListResponse } from "@/models";
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
  const [postArr, setPostArr] = useState<any>(initPosts);
  const [loading, setLoading] = useState(false);

  const { postUser, isLoading } = usePostUser(id);
  const { notifies } = useNotify();

  useEffect(() => {
    if (postUser) {
      setPostArr(postUser);
      setLoading(true);
    }
  }, [postUser]);

  return (
    <>
      <Seo
        data={{
          title: `${
            notifies?.totalRows > 0 ? `(${notifies?.totalRows})` : ""
          } Ảnh/video`,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <div className="profile-media mb-5">
        <div className="img-post-media">
          {loading && isLoading ? (
            <div className="media-col">
              <Skeleton width="100%" height="100%" />
            </div>
          ) : (
            <>
              {postArr?.data.map(
                (post: IPost) =>
                  // {
                  //   post?.images.length === 0 && (
                  //     <h3 className="text-center mt-2">Chưa có hình ảnh nào cả</h3>
                  //   );
                  // }
                  post?.images.length > 0 && (
                    <Link href={`/posts/${post?._id}`} key={post?._id}>
                      <div className="media-col">
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
                            loading="lazy"
                            alt={post?.images[0]?.url}
                          />
                        )}
                      </div>
                    </Link>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
ProfileMediaPage.Layout = ProfileLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/api/v1/posts`);
  const data = await response.json();

  return {
    paths: data.data.map((post: IPost) => ({
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
