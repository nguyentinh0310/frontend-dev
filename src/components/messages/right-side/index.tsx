import { conversationsApi } from "@/api-client/coversation-api";
import { useAuth, useConversations, useMessages, useUser } from "@/hooks";
import { IMessage } from "@/models";
import { socket } from "@/utils";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MessageDisplay } from "../message-display";
import { AddMessage } from "./add-message";
import swal from "sweetalert";
import Link from "next/link";

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
    socket.on("get-message", (data: any) => {
      setArrivalMessage({
        sender: data.sender,
        text: data.text,
        media: data.media,
      });
      data = mutateConv();
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
      swal({
        title: "Xác nhận",
        text: "Bạn có muốn xoá cuộc hội thoại này?",
        icon: "warning",
        buttons: ["Huỷ", "Xác nhận"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await conversationsApi.remove(user?._id);
          await mutateMessages();
          await mutateConv();
          toast.success("Xóa cuộc hội thoại thành công!");
        }
      });
    } catch (error) {
      toast.error("Lỗi 500");
    }
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
                <i className="fa-solid fa-phone text-primary"></i>
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
                  {loadMedia && (
                    <div className="chat_row you_message">
                      <span className="m-auto mt-2 spinner-border text-success"></span>
                    </div>
                  )}
                </span>
              ))}
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
