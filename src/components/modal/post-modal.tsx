import { notificationApi } from "@/api-client";
import { postApi } from "@/api-client/post-api";
import { openStatusEdit, useAppDispatch, useAppSelector } from "@/app";
import { useAuth, useNotify } from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { IPost } from "@/models";
import { BASE_URL, socket } from "@/utils";
import React from "react";
import { toast } from "react-toastify";

export interface PostModalProps {
  post: IPost;
  setShow: Function;
}

export function PostModal({ post, setShow }: PostModalProps) {
  const dispacth = useAppDispatch();
  const { limit } = useAppSelector((state) => state.posts);

  const { auth } = useAuth();
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(post?._id);
  const { mutatePostUser } = usePostUser(post?.user?._id);
  const { mutateNotify } = useNotify();

  // xét modal edit post
  const handleEditPost = () => {
    dispacth(openStatusEdit(post));
    setShow(false);
  };

  // xóa pót
  const handleDeletePost = async () => {
    try {
      await postApi.remove(post?._id);
      await mutatePosts();
      await mutatePostsFl();
      await mutatePost();
      await mutatePostUser();
      socket.emit("delete-post");

      // Remove notify
      const notify = {
        id: post?._id,
        text: "xóa bài viết.",
        recipients: [post?.user?._id],
        url: `/posts/${post._id}`,
      };
      await notificationApi.remove(notify);
      await mutateNotify();
      socket.emit("remove-notify", notify);

      toast.success("Đã xóa thành công");
    } catch (error) {
      toast.error("Lỗi 400");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/posts/${post?._id}`);
    setShow(false);
    toast.success("Đã sao chép!");
  };

  return (
    <>
      {auth?._id === post?.user?._id ? (
        <div className="post-modal">
          <div className="dropdown">
            <div className="menu">
              <a className="menu-item" onClick={handleEditPost}>
                <span className="icon-button">
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span className="menu-item-title">Sửa bài viết</span>
              </a>
              <a className="menu-item" onClick={handleDeletePost}>
                <span className="icon-button">
                  <i className="fa-solid fa-trash"></i>
                </span>
                <span className="menu-item-title">Xóa bài viết</span>
              </a>
              <a className="menu-item" onClick={handleCopyLink}>
                <span className="icon-button">
                  <i className="fa-solid fa-copy"></i>
                </span>
                <span className="menu-item-title">Sao chép</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="post-modal">
          <div className="dropdown">
            <div className="menu">
              <a className="menu-item" onClick={handleCopyLink}>
                <span className="icon-button">
                  <i className="fa-solid fa-copy"></i>
                </span>
                <span className="menu-item-title">Sao chép</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
