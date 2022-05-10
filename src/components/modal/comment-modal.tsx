import { commentApi } from "@/api-client/comment-api";
import { useAppSelector } from "@/app";
import { useAuth } from "@/hooks";
import { usePost, usePosts, usePostsFollow, usePostUser } from "@/hooks/use-post";
import { IComment, IPost } from "@/models";
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
        await mutatePostsFl()
        await mutatePost();
        await mutatePostUser();
      });
    } catch (error) {
      toast.error("Lỗi 404")
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
