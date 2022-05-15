import { useAuth, useMessages, useUser } from "@/hooks";
import { IMessage } from "@/models";
import { socket } from "@/utils";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { MessageDisplay } from "../message-display";
import { AddMessage } from "./add-message";

export function RightSide() {
  const router = useRouter();
  const { id } = router.query;
  const [messagesList, setMessagesList] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const [media, setMedia] = useState<any>([]);

  const refDisplay = useRef<any>();

  const { auth } = useAuth();
  const { messages, mutateMessages } = useMessages(id);
  const { user } = useUser(id);

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
      });
    });
  }, []);

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
    // const messageId = messagesList.find((msg: IMessage) => msg.conversation)
    // console.log(messageId)
  };

  return (
    <Fragment>
      {id ? (
        <>
          <div className="message-header">
            <div className="info">
              <span className="avatar">
                <img src={user?.avatar} alt="" />
              </span>
              <span className="name">{user?.fullname}</span>
            </div>
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
