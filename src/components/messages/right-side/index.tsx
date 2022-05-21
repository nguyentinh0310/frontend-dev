import { conversationsApi } from "@/api-client/coversation-api";
import { useAuth, useConversations, useMessages, useUser } from "@/hooks";
import { IMessage } from "@/models";
import { socket } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { MessageDisplay } from "../message-display";
import { AddMessage } from "./add-message";

export function RightSide() {
  const router = useRouter();
  const { id } = router.query;

  const [messagesList, setMessagesList] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const [media, setMedia] = useState<any>([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef<any>();

  const { auth } = useAuth();
  const { messages, mutateMessages } = useMessages(id);
  const { user } = useUser(id);
  const { mutateConv } = useConversations();

  useEffect(() => {
    if (messages) {
      setMessagesList(messages?.data);
    }
  }, [messages]);

  // get tin nhắn đến từ socket
  useEffect(() => {
    socket.on("get-message", async (data: any) => {
      setArrivalMessage({
        sender: data.sender,
        text: data.text,
        media: data.media,
      });
      await conversationsApi.isUnReadConv(auth?._id);
      data = await mutateConv();
    });
  }, [socket]);

  // xét lại mảng tin nhắn
  useEffect(() => {
    if (arrivalMessage && arrivalMessage?.sender === id) {
      setMessagesList((prev: any) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, id]);

  useEffect(() => {
    setTimeout(() => {
      refDisplay?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  }, [messagesList]);

  const handleDeleteConversation = async () => {
    try {
      // swal({
      //   title: "Xác nhận",
      //   text: "Bạn có muốn xoá cuộc hội thoại này?",
      //   icon: "warning",
      //   buttons: ["Huỷ", "Xác nhận"],
      //   dangerMode: true,
      // }).then(async (willDelete) => {
      //   if (willDelete) {
      //     await conversationsApi.remove(user?._id);
      //     await mutateMessages();
      //     await mutateConv();
      //     toast.success("Xóa cuộc hội thoại thành công!");
      //     router.push("/message");
      //   }
      // });
      console.log(user?._id)
      await conversationsApi.remove(user?._id);
      await mutateMessages();
      await mutateConv();
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  return (
    <Fragment>
      {id ? (
        <>
          <div className="message-header">
            <Link href={`/profile/${user?._id}`}>
              <div className="info">
                <span className="avatar">
                  <img src={user?.avatar} alt="" />
                </span>
                <span className="name">{user?.fullname}</span>
              </div>
            </Link>
            {user?.length !== 0 && (
              <div className="icon">
                <i className="fa-solid fa-images"></i>
                <i
                  className="fas fa-trash text-danger"
                  onClick={handleDeleteConversation}
                ></i>
              </div>
            )}
          </div>

          <div
            className="chat-container"
            style={{ height: media.length > 0 ? "calc(100% - 180px)" : "" }}
          >
            <div className="chat-display">
              {messagesList?.map((msg: IMessage, index: any) => (
                <span key={index} ref={refDisplay}>
                  {msg?.sender !== auth?._id && (
                    <div className="chat-row other-message">
                      <MessageDisplay user={user} msg={msg} key={msg?._id} />
                    </div>
                  )}
                  {msg?.sender === auth?._id && (
                    <div className="chat-row you-message">
                      <MessageDisplay user={auth} msg={msg} key={msg?._id} />
                    </div>
                  )}
                </span>
              ))}
              {loadMedia && (
                <div className="chat-row you-message">
                  <small className="spinner-border text-default"></small>
                </div>
              )}
            </div>
          </div>

          <AddMessage
            user={user}
            mutate={mutateMessages}
            setMessagesList={setMessagesList}
            messagesList={messagesList}
            media={media}
            setMedia={setMedia}
            loadMedia={loadMedia}
            setLoadMedia={setLoadMedia}
          />
        </>
      ) : (
        <div
          className="d-flex justify-content-center
  align-items-center flex-column h-100"
        >
          <i
            className="fab fa-facebook-messenger"
            style={{ fontSize: "8rem", color: "#85eb7d" }}
          />
        </div>
      )}
    </Fragment>
  );
}
