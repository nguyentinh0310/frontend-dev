import { notificationApi } from "@/api-client";
import { commentApi } from "@/api-client/comment-api";
import { useAppSelector } from "@/app";
import { useAuth, useNotify } from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser
} from "@/hooks/use-post";
import { IComment, IPost } from "@/models";
import { socket } from "@/utils";
import React, { useEffect, useState } from "react";

export interface LikeCommentProps {
  comment: IComment;
  setShow: Function;
  post: IPost;
}

export function LikeComment({ comment, setShow, post }: LikeCommentProps) {
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
    if (comment?.likes.find((like: any) => like?._id === auth?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [comment?.likes, auth?._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setShow(false);

    setLoadLike(true);
    await commentApi.likeComment(comment?._id);
    await mutatePosts();
    await mutatePostsFl();
    await mutatePost();
    await mutatePostUser();
    socket.emit("like-comment", post);

    // Notify
    const notify: any = {
      id: auth?._id,
      text: "đã thích bình luận của bạn.",
      recipients: [comment?.user?._id],
      url: `/posts/${post?._id}`,
    };
    await notificationApi.create(notify);
    await mutateNotify();
    socket.emit("create-notify", notify);
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setShow(false);

    setLoadLike(true);
    await commentApi.unlikedComment(comment?._id);
    await mutatePosts();
    await mutatePostsFl();
    await mutatePost();
    await mutatePostUser();
    socket.emit("unLike-comment", post);

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
