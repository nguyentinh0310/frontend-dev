import { openStatus, setLimit, useAppDispatch, useAppSelector } from "@/app";
import { StatusModal } from "@/components/modal";
import { useAuth } from "@/hooks";
import { usePostsFollow } from "@/hooks/use-post";
import { IPost } from "@/models";
import React, { useState } from "react";
import { Post } from "../posts";
import { PostSkeleton } from "../skeleton";

export function MiddlePannel() {
  const { auth } = useAuth();
  const dispacth = useAppDispatch();
  const { limit } = useAppSelector((state) => state.posts);

  const [loading, setLoading] = useState(false);
  

  const { postsFollow, isLoading, isError } = usePostsFollow(limit);

  const handleShow = () => {
    dispacth(openStatus());
  };

  const handleShowPost = () => {
    if (isLoading) return;
    dispacth(setLimit({ limit: Number(limit) + 5 }));
  };

  return (
    <div className="middle-panel">
      <div className="status-modal">
        <div className="status-create">
          <span className="avatar">
            <img src={auth?.avatar} alt="avatar" />
          </span>
          <button className="btn-post" onClick={handleShow}>
            Bạn đang nghĩ gì?
          </button>
        </div>
      </div>
      <StatusModal />

      {postsFollow?.data.length === 0 && (
        <h3 className="text-center mt-2">Chưa có bài viết nào</h3>
      )}

      {isLoading ? (
        <PostSkeleton />
      ) : (
        postsFollow?.data?.map((post: IPost) => (
          <Post post={post} key={post._id} />
        ))
      )}
      {postsFollow?.data.length !== 0 &&
        (postsFollow?.totalRows === postsFollow?.data.length ? (
          <span className="text-center mb-5">Hiển thị hết rồi</span>
        ) : (
          <span className="text-center load-more mb-5" onClick={handleShowPost}>
            Hiển thị thêm
          </span>
        ))}
    </div>
  );
}