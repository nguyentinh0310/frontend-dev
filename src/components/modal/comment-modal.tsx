import { notificationApi } from "@/api-client";
import { commentApi } from "@/api-client/comment-api";
import { useAppSelector } from "@/app";
import { useAuth, useNotify } from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { IComment, IPost } from "@/models";
import { socket } from "@/utils";
import React from "react";
import { toast } from "react-toastify";

export interface CommentModalProps {
  setOnEdit: Function;
  setShow: Function;
  comment: IComment;
  post: IPost;
}

export function CommentModal({
  setOnEdit,
  setShow,
  comment,
  post,
}: CommentModalProps) {
  const { auth } = useAuth();
  const { limit } = useAppSelector((state) => state.posts);

  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(post?._id);
  const { mutatePostUser } = usePostUser(post?.user?._id);
  const { mutateNotify } = useNotify();

  const handleEdit = () => {
    setOnEdit(true);
    setShow(false);
  };

  const handleDelete = () => {
    try {
      const deleteArr = [
        ...post?.comments.filter((cm) => cm.reply === comment._id),
        comment,
      ];
      deleteArr.forEach(async (item) => {
        await commentApi.remove(item?._id);
        await mutatePosts();
        await mutatePostsFl();
        await mutatePost();
        await mutatePostUser();
        socket.emit("delete-comment", post);

        // Remove notify
        const notify = {
          id: post?._id,
          text: "xóa bình luận.",
          recipients: [post?.user?._id, comment?.user?._id],
          url: `/posts/${post._id}`,
        };
        await notificationApi.remove(notify);
        await mutateNotify();
        socket.emit("remove-notify", notify);
      });
    } catch (error) {
      toast.error("Lỗi 404");
    }
  };

  return (
    <div className="comment-modal">
      <div className="dropdown">
        <div className="menu">
          {comment?.user?._id === auth?._id ? (
            <>
              <a className="menu-item" onClick={handleEdit}>
                <span className="icon-button">
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
                <span className="menu-item-title">Sửa</span>
              </a>
              <a className="menu-item" onClick={handleDelete}>
                <span className="icon-button">
                  <i className="fa-solid fa-trash"></i>
                </span>
                <span className="menu-item-title">Xóa</span>
              </a>
            </>
          ) : (
            <>
              <a className="menu-item" onClick={handleDelete}>
                <span className="icon-button">
                  <i className="fa-solid fa-trash"></i>
                </span>
                <span className="menu-item-title">Xóa</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
