import { commentApi } from "@/api-client/comment-api";
import { useAppSelector } from "@/app";
import { Icons } from "@/components/common";
import { useAuth } from "@/hooks";
import { usePost, usePosts, usePostsFollow, usePostUser } from "@/hooks/use-post";
import { IPost } from "@/models";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export interface CommentInputProps {
  children?: any;
  post: IPost;
  userReply?: any;
  setOnReply?: Function;
}

export function CommentInput({
  children,
  post,
  userReply,
  setOnReply,
}: CommentInputProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { limit } = useAppSelector((state) => state.posts);

  const { auth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(post?._id);
  const { mutatePostUser } = usePostUser(post?.user?._id);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setShow(false);
  };

  // thêm comment
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!content) {
      if (setOnReply) return setOnReply(false);
      return;
    }
    try {
      // payload comment
      const newComment = {
        content,
        user: auth,
        postId: post?._id,
        postUserId: post?.user?._id,
        createdAt: new Date().toISOString(),
        reply: userReply && userReply?.commentId,
        tag: userReply && userReply?.user,
      };

      await commentApi.create(newComment);
      await mutatePosts();
      await mutatePostsFl()
      await mutatePost();
      await mutatePostUser();

      setContent("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Lỗi 400");
    }
    if (setOnReply) return setOnReply(false);
    setShow(false);
  };

  return (
    <form className="post-footer comment-input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Bình luận"
        value={content}
        onChange={handleOnChange}
      />

      <Icons
        setContent={setContent}
        content={content}
        show={show}
        setShow={setShow}
      />

      <button
        className="btn-post"
        type="submit"
        disabled={loading ? true : false}
      >
        Đăng
      </button>
    </form>
  );
}
