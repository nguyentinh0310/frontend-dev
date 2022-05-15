import { IMessage, IUser } from "@/models";
import React, { Fragment } from "react";
import moment from "moment";

interface MessageDisplayProps {
  user: IUser;
  msg: IMessage;
}

export function MessageDisplay({ user, msg }: MessageDisplayProps) {
  return (
    <Fragment>
      <div className="chat-title">
        <span className="avatar">
          <img src={user?.avatar} alt="" />
        </span>
      </div>

      <div className="chat-text">{msg?.text}</div>
      <div className="chat-time">{moment(msg?.createdAt).fromNow()}</div>
    </Fragment>
  );
}
