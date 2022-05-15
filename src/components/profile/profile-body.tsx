import { Post } from "@/components/posts";
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
  const { postUser, isLoading } = usePostUser(id);

  const [postArr, setPostArr] = useState(initPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postUser) {
      setPostArr(postUser);
      setLoading(true);
    }
  }, [postUser]);

  return (
    <div className="profile-body">
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
