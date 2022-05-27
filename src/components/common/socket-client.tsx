import { setOffine, setOnline, useAppSelector } from "@/app";
import {
  useAuth,
  useConversations,
  useMessages,
  useNotify,
  useUser,
} from "@/hooks";
import {
  usePost,
  usePosts,
  usePostsFollow,
  usePostUser,
} from "@/hooks/use-post";
import { IMessage, INotification, IPost, IUser } from "@/models";
import { socket } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FomoNotification } from "./fomo-notification";

export function SocketClient() {
  const audioRef = useRef<any>();
  const dispatch = useDispatch();
  const { postData } = useAppSelector((state) => state.posts);
  const { limit } = useAppSelector((state) => state.posts);
  const { userId } = useAppSelector((state) => state.user);
  const { online } = useAppSelector((state) => state.online);

  const [notifyData, setNotifyData] = useState({});

  const { auth, mutateAuth } = useAuth();
  const { mutateUser } = useUser(userId);

  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { mutatePost } = usePost(postData?._id);
  const { mutatePostUser } = usePostUser(postData?.user?._id);
  const { mutateNotify } = useNotify();
  const { mutateMessages } = useMessages(userId);
  const { mutateConv } = useConversations();

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
    socket.emit("join-user", auth);
  }, [socket, auth]);

  // create-post
  useEffect(() => {
    socket.on("create-post-to-client", async (post: IPost) => {
      audioRef?.current.play();
      setMutatePostData(post);
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

  useEffect(() => {
    socket.on("like-comment-to-client", (post: IPost) => {
      setMutatePostData(post);
    });
    return () => {
      socket.off("like-comment-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("unLike-comment-to-client", (post: IPost) => {
      setMutatePostData(post);
    });
    return () => {
      socket.off("unLike-comment-to-client");
    };
  }, [socket]);

  // Follow
  useEffect(() => {
    socket.on("follow-to-client", (user: IUser) => {
      audioRef?.current.play();
      setMutateUserData(user);
    });
    return () => {
      socket.off("follow-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("unFollow-to-client", (user: IUser) => {
      audioRef?.current.play();
      setMutateUserData(user);
    });
    return () => {
      socket.off("unFollow-to-client");
    };
  }, [socket]);

  // Notification
  useEffect(() => {
    socket.on("create-notify-to-client", async (notify: INotification) => {
      setNotifyData(notify);
      audioRef?.current.play();
      notify = await mutateNotify();
    });
    return () => {
      socket.off("create-notify-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("remove-notify-to-client", async (notify: INotification) => {
      notify = await mutateNotify();
    });
    return () => {
      socket.off("remove-notify-to-client");
    };
  }, [socket]);

  // Delete message
  useEffect(() => {
    socket.on("delete-message-to-client", async (msg: IMessage) => {
      msg = await mutateMessages();
      msg = await mutateConv();
    });
    return () => {
      socket.off("delete-message-to-client");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("check-user-online", auth);
  }, [socket, auth]);

  useEffect(() => {
    socket.on("check-user-online-to-me", async (data: any) => {
      data.forEach((item: any) => {
        if (!online?.includes(item?.id)) {
          dispatch(setOnline(item?.id));
        }
      });
    });
    return () => {
      socket.off("check-user-online-to-me");
    };
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on("check-user-online-to-client", async (id: any) => {
      if (!online?.includes(id)) {
        dispatch(setOnline(id));
      }
    });
    return () => {
      socket.off("check-user-online-to-client");
    };
  }, [socket, dispatch, online]);

  // Check  Offline
  useEffect(() => {
    socket.on("check-user-offline", (id: any) => {
      dispatch(setOffine(id));
    });

    return () => {
      socket.off("check-user-offline");
    };
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" />
      </audio>
      {Object.keys(notifyData).length !== 0 && (
        <FomoNotification notify={notifyData} />
      )}
    </>
  );
}
