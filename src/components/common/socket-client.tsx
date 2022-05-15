import { setPostData, useAppDispatch } from "@/app";
import { useAuth } from "@/hooks";
import { IPost } from "@/models";
import { socket } from "@/utils";
import React, { useEffect, useRef } from "react";

export function SocketClient() {
  const audioRef = useRef<any>();
  const dispacth = useAppDispatch();

  const { auth } = useAuth();

  // joinUser
  useEffect(() => {
    socket.emit("join-user", auth?._id);
    socket.on("get-user", (users: any) => {
      // console.log(users);
    });
  }, [socket, auth?._id]);

  // likes
  useEffect(() => {
    socket.on("like-to-client", async (post: IPost) => {
      audioRef?.current.play();
      const data = dispacth(setPostData(post));

      console.log(data);
    });
    return () => {
      socket.off("like-to-client");
    };
  }, [socket, dispacth]);

  useEffect(() => {
    socket.on("unlike-to-client", async (post: IPost) => {
      audioRef?.current.play();
      dispacth(setPostData(post));
    });
    return () => {
      socket.off("unlike-to-client");
    };
  }, [socket, dispacth]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" />
      </audio>
    </>
  );
}
