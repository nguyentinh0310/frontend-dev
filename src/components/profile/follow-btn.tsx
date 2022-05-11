import { userApi } from "@/api-client";
import { useAuth } from "@/hooks";
import { IUser } from "@/models";
import React, { useEffect, useState } from "react";

export interface FollowBtnProps {
  user: IUser;
  mutateUser: any;
}

export function FollowBtn({ user, mutateUser }: FollowBtnProps) {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth, mutateAuth } = useAuth();

  // check follow tồn tại
  useEffect(() => {
    if (auth?.followings.find((item: any) => item?._id === user?._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [auth?.followings, user?._id]);

  const handleFollow = async () => {
    if (loading) return;

    setLoading(true);
    await userApi.follow(user?._id);
    await mutateUser();
    await mutateAuth();
    setLoading(false);
  };
  const handleUnFollow = async () => {
    if (loading) return;

    setLoading(true);
    await userApi.unFollow(user?._id);
    await mutateUser();
    await mutateAuth();
    setLoading(false);
  };
  return (
    <>
      {followed ? (
        <button className="btn btn-unfollow" onClick={handleUnFollow}>
          Bỏ theo dõi
        </button>
      ) : (
        <button className="btn btn-follow" onClick={handleFollow}>
          Theo dõi
        </button>
      )}
    </>
  );
}
