import { ProfileLayout, Seo } from "@/components";
import { useAuth } from "@/hooks";
import { IPost, NextPageWithLayout } from "@/models";
import { useRouter } from "next/router";
import React from "react";

const ProfileSavedPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useAuth();

  const onClickToDetailPost = (post: IPost) => {
    router.push(`/posts/${post?._id}`);
  };

  return (
    <>
      <Seo
        data={{
          title: "Đã lưu",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <div className="profile-saved mb-5">
        {auth?._id === id ? (
          <>
            {auth?.saved.length === 0 && (
              <h3 className="text-center mt-2">Chưa lưu bài viết nào cả</h3>
            )}
            {auth?.saved?.map((post: IPost) => (
              <div className="saved-box" key={post?._id}>
                {post?.images.length > 0 ? (
                  <>
                    {post?.images[0]?.url.match(/video/i) ? (
                      <video
                        controls
                        src={post?.images[0]?.url}
                        className="d-block w-100"
                      />
                    ) : (
                      <img
                        src={post?.images[0]?.url}
                        className="d-block w-100"
                        alt={post?.images[0]?.url}
                      />
                    )}
                  </>
                ) : (
                  <img
                    src="https://res.cloudinary.com/dwgximj2j/image/upload/v1652075296/avatars/default-image_wygqce.jpg"
                    alt="post-saved"
                    onClick={() => onClickToDetailPost(post)}
                  />
                )}
                <div className="saved-right">
                  <span
                    className="content"
                    onClick={() => onClickToDetailPost(post)}
                  >
                    {post?.content.length < 80
                      ? post?.content
                      : post?.content.slice(0, 80) + "... "}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <span className="icon-lock">
            <i className="fa-solid fa-lock"></i>
          </span>
        )}
      </div>
    </>
  );
};
ProfileSavedPage.Layout = ProfileLayout;

export default ProfileSavedPage;
