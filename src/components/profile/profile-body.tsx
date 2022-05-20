import { openStatus, useAppDispatch } from "@/app";
import { Post } from "@/components/posts";
import { useAuth } from "@/hooks";
import { usePostUser } from "@/hooks/use-post";
import { IPost, ListResponse } from "@/models";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StatusModal } from "../modal";
import { PostSkeletonList } from "../skeleton";

export interface ProfileBodyProps {
  initPosts: ListResponse<IPost>;
}

export function ProfileBody({ initPosts }: ProfileBodyProps) {
  const router = useRouter();
  const { id } = router.query;
  const dispacth = useAppDispatch();

  const { postUser, isLoading } = usePostUser(id);
  const { auth } = useAuth();

  const [postArr, setPostArr] = useState(initPosts);
  const [loading, setLoading] = useState(false);

  const handleShow = () => {
    dispacth(openStatus());
  };

  useEffect(() => {
    if (postUser) {
      setPostArr(postUser);
      setLoading(true);
    }
  }, [postUser]);

  return (
    <div className="profile-body">
      {auth?._id === id && (
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
      )}
      <StatusModal />
      {postArr?.data.length === 0 && (
        <h3 className="text-center mt-2">Chưa có bài viết nào</h3>
      )}
      {loading && isLoading ? (
        <PostSkeletonList length={5} />
      ) : (
        postArr?.data?.map((post: IPost) => <Post post={post} key={post._id} />)
      )}
    </div>
  );
}
