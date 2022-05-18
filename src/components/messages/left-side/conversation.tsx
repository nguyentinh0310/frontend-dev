import { useAuth, useConversations } from "@/hooks";
import { IConversation, IUser } from "@/models";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface ConversationProps {
  conv: IConversation;
}

export function Conversation({ conv }: ConversationProps) {
  const router = useRouter();

  const [user, setUser] = useState<any>("");
  const { auth } = useAuth();
  const { mutateConv } = useConversations();

  useEffect(() => {
    const friendId = conv?.recipients.find(
      (user: IUser) => user?._id !== auth?._id
    );
    setUser(friendId);
  }, [conv?.recipients, auth?._id]);

  return (
    <li
      onClick={async () => {
        await mutateConv();
        return router.push(`/message/${user ? user?._id : auth?._id}`);
      }}
    >
      <a href="#">
        <span className="avatar">
          <img src={user ? user?.avatar : auth?.avatar} alt="" />
        </span>
        <div className="content">
          <span className="name">{user ? user?.fullname : auth?.fullname}</span>
          <p className="text">{conv?.text}</p>
        </div>
        <i className="fas fa-circle"></i>
      </a>
    </li>
  );
}
