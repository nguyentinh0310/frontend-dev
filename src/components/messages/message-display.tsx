import { IMessage, IUser } from "@/models";
import React, { Fragment, useEffect } from "react";
import moment from "moment";
import swal from "sweetalert";
import { useAuth, useConversations, useMessages } from "@/hooks";
import { messagesApi } from "@/api-client";
import { socket } from "@/utils";
import { useRouter } from "next/router";
import Link from "next/link";

interface MessageDisplayProps {
  user: IUser;
  msg: IMessage;
}

export function MessageDisplay({ user, msg }: MessageDisplayProps) {
  const router = useRouter();
  const { id } = router.query;

  const { auth } = useAuth();
  const { mutateMessages } = useMessages(id);
  const { mutateConv } = useConversations();

  const imageShow = (src: any) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };

  const videoShow = (src: any) => {
    console.log(src);
    return <video controls src={src} className="img-thumbnail" />;
  };

  const handleDeleteMessages = () => {
    swal({
      title: "Xác nhận",
      text: "Bạn có muốn xoá dòng tin nhắn này?",
      icon: "warning",
      buttons: ["Huỷ", "Xác nhận"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await messagesApi.remove(msg?._id);
        await mutateMessages();
        socket.emit("delete-message", msg);
      }
    });
  };

  useEffect(() => {
    socket.on("delete-message-to-client", async (msg: IMessage) => {
      msg = await mutateMessages();
      msg = await mutateConv();
      console.log(msg);
    });
    return () => {
      socket.off("delete-message-to-client");
    };
  }, [socket]);

  return (
    <Fragment>
      <div className="chat-title">
        <Link href={`/profile/${user?._id}`}>
          <span className="avatar">
            <img src={user?.avatar} alt="" />
          </span>
        </Link>
      </div>

      <div className="d-flex align-items-center content-chat">
        {user?._id === auth?._id && (
          <i
            className="fas fa-trash text-danger"
            onClick={handleDeleteMessages}
          />
        )}
        <span className="chat-text">{msg?.text}</span>
      </div>

      <div>
        {msg?.media?.map((item: any, index: any) => (
          <div key={index}>
            {item?.url?.match(/video/i)
              ? videoShow(item?.url)
              : imageShow(item?.url)}
          </div>
        ))}
      </div>

      <div className="chat-time">{moment(msg?.createdAt).fromNow()}</div>
    </Fragment>
  );
}
