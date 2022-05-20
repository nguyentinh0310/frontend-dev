import { openStatus, setLimit, useAppDispatch, useAppSelector } from "@/app";
import { StatusModal } from "@/components/modal";
import { Post } from "@/components/posts";
import { useAuth } from "@/hooks";
import { usePosts } from "@/hooks/use-post";
import { IPost, ListResponse } from "@/models";
import React, { useEffect, useState } from "react";
import { PostSkeletonList } from "../skeleton/post-skeleton";

export interface ExploreProps {
  initPosts: ListResponse<IPost>;
}

export function Explore({ initPosts }: ExploreProps) {
  const dispacth = useAppDispatch();
  const { limit } = useAppSelector((state) => state.posts);

  const [postList, setPostList] = useState(initPosts);
  const [loading, setLoading] = useState(false);

  const { posts, isLoading, isError } = usePosts(limit);
  const { auth } = useAuth();

  useEffect(() => {
    if (posts) {
      setPostList(posts);
      setLoading(true);
    }
  }, [posts]);

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
      {loading && isLoading ? (
        <PostSkeletonList length={5} />
      ) : (
        postList?.data?.map((post: IPost) => (
          <Post post={post} key={post._id} />
        ))
      )}
      {posts?.totalRows === posts?.data.length ? (
        <span className="text-center mb-5">Hiển thị hết rồi</span>
      ) : (
        <span className="text-center load-more mb-5" onClick={handleShowPost}>
          Hiển thị thêm
        </span>
      )}
    </div>
  );
}
