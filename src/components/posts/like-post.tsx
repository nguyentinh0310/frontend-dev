import { postApi } from "@/api-client/post-api";
import { useAppSelector } from "@/app";
import { useAuth } from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { IPost } from "@/models";
import React, { useEffect, useState } from "react";

export interface LikePostProps {
  post: IPost;
}

export function LikePost({ post }: LikePostProps) {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const { limit } = useAppSelector((state) => state.posts);

  const { auth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(post?._id);
  const { mutatePostUser } = usePostUser(post?.user?._id);

  // Likes
  useEffect(() => {
    if (post?.likes.find((like: any) => like?._id === auth?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post?.likes, auth?._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await postApi.likePost(post?._id);
    await mutatePosts();
    await mutatePost();
    await mutatePostUser();
    await mutatePostsFl()
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await postApi.unLikePost(post?._id);
    await mutatePosts();
    await mutatePost();
    await mutatePostsFl()
    await mutatePostUser();
    setLoadLike(false);
  };
  return (
    <>
      {isLike ? (
        <i className="fas fa-heart text-danger" onClick={handleUnLike} />
      ) : (
        <i className="far fa-heart" onClick={handleLike} />
      )}
    </>
  );
}
