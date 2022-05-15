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

  const refDisplay = useRef<any>();
  const pageEnd = useRef<any>();

  const { auth } = useAuth();
  const { messages, mutateMessages } = useMessages(id);
  const { user } = useUser(id);

  useEffect(() => {
    if (messages) {
      setMessagesList(messages?.data);
    }
  }, [messages]);

  // get tin nhắn từ socket
  useEffect(() => {
    socket.on("get-message", (data: any) => {
      setArrivalMessage({
        sender: data.sender,
        text: data.text,
      });
    });
  }, []);

  // xet tin nhắn đến
  useEffect(() => {
    if (arrivalMessage && arrivalMessage?.sender === id) {
      setMessagesList((prev: any) => [...prev, arrivalMessage]);
    }
    return () => {
      setMessagesList([]);
    };
  }, [arrivalMessage, id]);

  useEffect(() => {
    setTimeout(() => {
      refDisplay?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  }, [messagesList]);

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
                <i className="fas fa-trash text-danger"></i>
              </div>
            )}
          </div>

          <div className="chat-container">
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
          />
        </>
      ) : (
        <div
          className="d-flex justify-content-center
  align-items-center flex-column h-100"
        >
          <i className="fab fa-facebook-messenger text-primary" />
        </div>
      )}
    </Fragment>
  );
}
