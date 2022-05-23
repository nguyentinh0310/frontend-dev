import { conversationsApi } from "@/api-client";
import { messagesApi } from "@/api-client/message-api";
import { Icons } from "@/components/common";
import { useAuth, useConversations } from "@/hooks";
import { IUser } from "@/models";
import { imageUpload, socket } from "@/utils";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export interface AddMessageProps {
  user: IUser;
  mutate: any;
  setMessagesList: Function;
  messagesList: any;
  media: any;
  setMedia: Function;
  loadMedia: boolean;
  setLoadMedia: Function;
  refDisplay: any;
}

export function AddMessage({
  user,
  mutate,
  setMessagesList,
  messagesList,
  media,
  setMedia,
  loadMedia,
  setLoadMedia,
  refDisplay,
}: AddMessageProps) {
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);

  const { auth } = useAuth();
  const { mutateConv } = useConversations();

  const handleChangeImages = (e: any) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia: any = [];

    files.forEach((file: any) => {
      if (!file) return (err = "File không tồn tại");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "Kích thước hình ảnh/video lớn nhất là 1mb.");
      }
      return newMedia.push(file);
    });
    if (err) toast.error(err);
    setMedia([...media, ...newMedia]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    setContent("");
    setShow(false);
    setMedia([]);
    setLoadMedia(true);
    refDisplay?.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    try {
      let newArr = [];
      if (media.length > 0) newArr = await imageUpload(media);

      const newMessage = {
        sender: auth?._id,
        recipient: user?._id,
        text: content,
        media: newArr,
      };
      // socket
      socket.emit("send-message", newMessage);
      const data = await messagesApi.create(newMessage);
      setMessagesList([...messagesList, data]);
      await mutate();
      await mutateConv();
      setLoadMedia(false);
    } catch (error) {
      setLoadMedia(false);
      toast.error("Lỗi 500");
    }
  };

  const handleDeleteMedia = (item: any) => {
    URL.revokeObjectURL(item);
    const newArr = [...media];
    newArr.splice(item, 1);
    setMedia(newArr);
  };

  const imageShow = (src: any) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };

  const videoShow = (src: any) => {
    return <video controls src={src} className="img-thumbnail" />;
  };
  return (
    <>
      <div
        className="show-media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item: any, index: any) => (
          <div key={index} className="file-media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          name="content"
          placeholder="Nhập tin nhắn..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={() => setShow(false)}
        />
        <Icons
          setContent={setContent}
          content={content}
          show={show}
          setShow={setShow}
        />
        <div className="file-upload" onChange={handleChangeImages}>
          <i className="fas fa-image" />
          <input
            type="file"
            name="images"
            id="file"
            multiple
            accept="image/*,video/*"
          />
        </div>
        <button
          type="submit"
          className="btn-chat"
          disabled={loadMedia ? true : false}
        >
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </>
  );
}
