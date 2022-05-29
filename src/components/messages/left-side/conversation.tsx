import { conversationsApi } from "@/api-client";
import { useAppDispatch, useAppSelector } from "@/app";
import { useAuth, useConversations, useMessages } from "@/hooks";
import { IConversation, IUser } from "@/models";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface ConversationProps {
  conv: IConversation;
}

export function Conversation({ conv }: ConversationProps) {
  const router = useRouter();
  const { online } = useAppSelector((state) => state.online);

  const [user, setUser] = useState<any>("");
  const [check, setCheck] = useState(false);

  const { auth } = useAuth();
  const { mutateConv } = useConversations();
  const { mutateMessages } = useMessages(user?._id);

  useEffect(() => {
    const friendId = conv?.recipients.find(
      (user: IUser) => user?._id !== auth?._id
    );
    setUser(friendId);
  }, [conv?.recipients, auth?._id]);

  // check online-offline
  useEffect(() => {
    online?.find((item: any) => {
      if (item === user?._id) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    });
  }, [online, user?._id]);

  const onClickToMessage = async () => {
    await conversationsApi.isRead(user ? user?._id : auth?._id);
    await mutateConv();
    await mutateMessages();
    return router.push(`/message/${user ? user?._id : auth?._id}`);
  };

  return (
    <li onClick={onClickToMessage}>
      <a style={{ fontWeight: conv?.isRead ? "normal" : "bold" }}>
        <span className="avatar">
          <img src={user ? user?.avatar : auth?.avatar} alt="" />
        </span>
        <div className="content">
          <span className="name">{user ? user?.fullname : auth?.fullname}</span>
          <p className="text">
            {conv?.text?.length < 15
              ? conv?.text
              : conv?.text?.slice(0, 15) + "..."}
          </p>
        </div>
        <i className={"fas fa-circle " + (check ? "active" : "")}></i>
      </a>
    </li>
  );
}
