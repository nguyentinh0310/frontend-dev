import { notificationApi, userApi } from "@/api-client";
import { useAuth, useNotify, useUser } from "@/hooks";
import { IUser } from "@/models";
import { socket } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface FollowBtnProps {
  user: IUser;
}

export function FollowBtn({ user }: FollowBtnProps) {
  const router = useRouter();
  const { id } = router.query;

  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth, mutateAuth } = useAuth();
  const { mutateUser } = useUser(id);
  const { mutateNotify } = useNotify();

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
    // Socket
    socket.emit("follow", user);
    setLoading(false);

    // Notify
    const notify: any = {
      id: auth?._id,
      text: "đã theo dõi bạn.",
      recipients: [user?._id],
      url: `/profile/${auth?._id}`,
    };
    await notificationApi.create(notify);
    await mutateNotify();
    socket.emit("create-notify", notify);
  };
  const handleUnFollow = async () => {
    if (loading) return;

    setLoading(true);
    await userApi.unFollow(user?._id);
    await mutateUser();
    await mutateAuth();
    setLoading(false);
    // Socket
    socket.emit("unFollow", user);

    // Remove notify
    const notify = {
      id: auth?._id,
      text: "đã bỏ theo dõi bạn.",
      recipients: [user?._id],
      url: `/profile/${user?._id}`,
    };
    await notificationApi.remove(notify);
    await mutateNotify();
    socket.emit("remove-notify", notify);
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
