import { openStatus, setLimit, useAppDispatch, useAppSelector } from "@/app";
import { StatusModal } from "@/components/modal";
import { useAuth } from "@/hooks";
import { usePostsFollow } from "@/hooks/use-post";
import { IPost, ListResponse } from "@/models";
import React, { useEffect, useState } from "react";
import { Post } from "../posts";
import { PostSkeletonList } from "../skeleton";

interface MiddlePannelProps {
  posts: ListResponse<IPost>;
}

export function MiddlePannel({ posts }: MiddlePannelProps) {
  const { auth } = useAuth();
  const dispacth = useAppDispatch();
  const { limit } = useAppSelector((state) => state.posts);

  const [postList, setPostList] = useState<any>(posts);
  const [loading, setLoading] = useState(false);

  const { postsFollow, isLoading, isError } = usePostsFollow(limit);

  useEffect(() => {
    if (postsFollow) {
      setPostList(postsFollow);
      setLoading(true);
    }
  }, [postsFollow]);

  const handleShow = () => {
    dispacth(openStatus());
  };

  const handleShowPost = () => {
    setLoading(false);
    dispacth(setLimit({ limit: Number(limit) + 10 }));
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

      {loading && isLoading ? (
        <PostSkeletonList length={5} />
      ) : (
        postList?.data?.map((post: IPost) => (
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
