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
import { toast } from "react-toastify";

export interface SavePostProps {
  post: IPost;
}

export function SavePost({ post }: SavePostProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const { limit } = useAppSelector((state) => state.posts);

  const { auth, mutateAuth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(post?._id);
  const { mutatePostUser } = usePostUser(post?.user?._id);

  // Saved post
  useEffect(() => {
    if (auth?.saved.find((save: any) => save?._id === post?._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth?.saved, post?._id]);

  const handleSavePost = async () => {
    try {
      if (loading) return;

      setLoading(true);
      await postApi.savePost(post?._id);
      await mutatePosts();
      await mutatePost();
      await mutatePostUser();
      await mutatePostsFl();
      await mutateAuth();
      setLoading(false);
      toast.success("Lưu bài viết thành công!")
    } catch (error) {
      toast.error("Lỗi 500")
    }
  };

  const handleUnSavePost = async () => {
    try {
      if (loading) return;

      setLoading(true);
      await postApi.unSavePost(post?._id);
      await mutatePosts();
      await mutatePost();
      await mutatePostUser();
      await mutatePostsFl();
      await mutateAuth();
      setLoading(false);
      toast.warn("Đã bỏ lưu bài viết!")
    } catch (error) {
      toast.error("Lỗi 500")
    }
  };

  return (
    <>
      {saved ? (
        <i className="fas fa-bookmark text-info" onClick={handleUnSavePost} />
      ) : (
        <i className="far fa-bookmark" onClick={handleSavePost} />
      )}
    </>
  );
}
