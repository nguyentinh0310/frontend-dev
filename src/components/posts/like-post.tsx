import { notificationApi } from "@/api-client";
import { postApi } from "@/api-client/post-api";
import { useAppSelector } from "@/app";
import { useAuth } from "@/hooks";
import { useNotify } from "@/hooks/use-notify";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { IPost } from "@/models";
import { socket } from "@/utils";
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
  const { mutateNotify } = useNotify();

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
    const postLike = await postApi.likePost(post?._id);
    await mutatePosts();
    await mutatePost();
    await mutatePostUser();
    await mutatePostsFl();
    setLoadLike(false);
    socket.emit("like-post", postLike);

    // Notify
    const notify: any = {
      id: post?._id,
      text: "đã thích bài viết của bạn.",
      recipients: [post?.user?._id],
      url: `/posts/${postLike?._id}`,
    };

    await notificationApi.create(notify);
    await mutateNotify();
    socket.emit("create-notify", notify);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    const postUnLike = await postApi.unLikePost(post?._id);
    await mutatePosts();
    await mutatePost();
    await mutatePostsFl();
    await mutatePostUser();
    setLoadLike(false);
    socket.emit("unlike-post", postUnLike);
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
