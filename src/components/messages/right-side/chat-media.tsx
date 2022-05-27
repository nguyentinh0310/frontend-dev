import { IMessage, ListResponse } from "@/models";
import React from "react";
import { Modal } from "react-bootstrap";

export interface ChatMediaProps {
  show: boolean;
  setShow: Function;
  messages: ListResponse<IMessage>;
}

export function ChatMedia({ show, setShow, messages }: ChatMediaProps) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Ảnh/video tin nhắn
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex">
        {messages?.data?.map(
          (msg: IMessage) =>
            msg?.media?.length > 0 && (
              <div className="chat-media-modal" key={msg?._id}>
                {msg?.media?.map((img: any, index: any) => (
                  <div className="media-display">
                    <span key={index} className="media-col">
                      {img?.url.match(/video/i) ? (
                        <video
                          controls
                          src={img?.url}
                          className="d-block w-100 h-100"
                        />
                      ) : (
                        <img src={img?.url} alt={img?.url} />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )
        )}
      </Modal.Body>
    </Modal>
  );
}
