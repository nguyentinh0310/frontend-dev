import { ProfileLayout } from "@/components";
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
    <div className="profile-saved mb-5">
      {auth?._id === id ? (
        auth?.saved?.map((post: IPost) => (
          <div className="saved-box" key={post?._id}>
            <img
              src={
                post?.images.length > 0
                  ? post?.images[0].url
                  : "https://res.cloudinary.com/dwgximj2j/image/upload/v1652075296/avatars/default-image_wygqce.jpg"
              }
              alt="post-saved"
              onClick={() => onClickToDetailPost(post)}
            />
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
        ))
      ) : (
        <span className="icon-lock">
          <i className="fa-solid fa-lock"></i>
        </span>
      )}
    </div>
  );
};
ProfileSavedPage.Layout = ProfileLayout;

export default ProfileSavedPage;
