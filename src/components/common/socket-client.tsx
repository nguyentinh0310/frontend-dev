import { useAppSelector } from "@/app";
import { useAuth, useNotify, useUser } from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { INotification, IPost, IUser } from "@/models";
import { socket } from "@/utils";
import React, { useEffect, useRef } from "react";

export function SocketClient() {
  const audioRef = useRef<any>();
  const { postData } = useAppSelector((state) => state.posts);
  const { limit } = useAppSelector((state) => state.posts);
  const { userData } = useAppSelector((state) => state.user);
  // console.log(userData);

  const { auth, mutateAuth } = useAuth();
  const { mutateUser } = useUser(userData?._id);

  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(postData?._id);
  const { mutatePostUser } = usePostUser(postData?.user?._id);
  const { mutateNotify } = useNotify();

  const setMutatePostData = async (data: IPost) => {
    data = await mutatePosts();
    data = await mutatePostsFl();
    data = await mutatePostUser();
    data = await mutatePost();
    return data;
  };

  const setMutateUserData = async (data: IUser) => {
    data = await mutateAuth();
    data = await mutateUser();
    return data;
  };
  // joinUser
  useEffect(() => {
    socket.emit("join-user", auth?._id);
    socket.on("get-user", (users: any) => {
      // console.log(users);
    });
  }, [socket, auth?._id]);

  // create-post
  useEffect(() => {
    socket.on("create-post-to-client", async (post: IPost) => {
      audioRef?.current.play();
      setMutatePostData(post);
      console.log(post);
    });
    return () => {
      socket.off("create-post-to-client");
    };
  }, [socket]);

  // update post
  useEffect(() => {
    socket.on("update-post-to-client", async (post: IPost) => {
      audioRef?.current.play();
      setMutatePostData(post);
      console.log(post);
    });
    return () => {
      socket.off("update-post-to-client");
    };
  }, [socket]);

  // delete post
  useEffect(() => {
    socket.on("delete-post-to-client", async (post: IPost) => {
      audioRef?.current.play();
      setMutatePostData(post);
      console.log(post);
    });
    return () => {
      socket.off("delete-post-to-client");
    };
  }, [socket]);

  // likes
  useEffect(() => {
    socket.on("like-to-client", async (post: IPost) => {
      audioRef?.current.play();
      setMutatePostData(post);
    });
    return () => {
      socket.off("like-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("unlike-to-client", (post: IPost) => {
      audioRef?.current.play();
      setMutatePostData(post);
    });
    return () => {
      socket.off("unlike-to-client");
    };
  }, [socket]);

  // Comment
  useEffect(() => {
    socket.on("create-comment-to-client", (post: IPost) => {
      setMutatePostData(post);
    });
    return () => {
      socket.off("create-comment-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("update-comment-to-client", (post: IPost) => {
      setMutatePostData(post);
    });
    return () => {
      socket.off("update-comment-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("delete-comment-to-client", (post: IPost) => {
      setMutatePostData(post);
    });
    return () => {
      socket.off("delete-comment-to-client");
    };
  }, [socket]);

  // Follow
  useEffect(() => {
    socket.on("follow-to-client", async (user: IUser) => {
      audioRef?.current.play();
      // setMutateUserData(user);
      user = await mutateAuth();
      user = await mutateUser();
      console.log(user);
    });
    return () => {
      socket.off("follow-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("unFollow-to-client", async (user: IUser) => {
      audioRef?.current.play();
      // setMutateUserData(user);
      user = await mutateAuth();
      user = await mutateUser();
      console.log(user);
    });
    return () => {
      socket.off("unFollow-to-client");
    };
  }, [socket]);

  // Notification
  useEffect(() => {
    socket.on("create-notify-to-client", async (notify: INotification) => {
      audioRef?.current.play();
      console.log(notify);
      notify = await mutateNotify();
    });
    return () => {
      socket.off("create-notify-to-client");
    };
  }, [socket]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" />
      </audio>
    </>
  );
}
