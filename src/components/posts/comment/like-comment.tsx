import { commentApi } from "@/api-client/comment-api";
import { useAppSelector } from "@/app";
import { useAuth } from "@/hooks";
import { usePost, usePosts, usePostsFollow, usePostUser } from "@/hooks/use-post";
import { IComment, IPost } from "@/models";
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
    await mutatePostsFl()
    await mutatePost();
    await mutatePostUser();

    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setShow(false);

    setLoadLike(true);
    await commentApi.unlikedComment(comment?._id);
    await mutatePosts();
    await mutatePostsFl()
    await mutatePost();
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
