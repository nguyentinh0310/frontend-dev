import { messagesApi } from "@/api-client/message-api";
import { useAuth } from "@/hooks";
import { IUser } from "@/models";
import { socket } from "@/utils";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export interface AddMessageProps {
  user: IUser;
  mutate: any;
  setMessagesList: Function;
  messagesList: any;
}

export function AddMessage({
  user,
  mutate,
  setMessagesList,
  messagesList,
}: AddMessageProps) {
  const [text, setText] = useState("");

  const { auth } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    try {
      const newMessage = {
        sender: auth?._id,
        recipient: user?._id,
        text,
      };
      socket.emit("send-message", newMessage);

      const data = await messagesApi.create(newMessage);
      setMessagesList([...messagesList, data]);
      await mutate();
      setText("");
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        name="content"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-chat">
        <i className="fa-regular fa-paper-plane"></i>
      </button>
    </form>
  );
}
