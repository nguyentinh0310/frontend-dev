import React, { Fragment } from "react";
import { MessageDisplay } from "../message-display";

export function RightSide() {
  return (
    <Fragment>
      {/* <div
        className="d-flex justify-content-center
    align-items-center flex-column h-100"
      >
        <i className="fab fa-facebook-messenger text-primary" />
      </div> */}
      <div className="message-header">
        <div className="info">
          <span className="avatar">
            <img
              src="https://cdn-acpnj.nitrocdn.com/SDkrhncnWeetGsYGlzwaPnbfptfOeIKk/assets/static/optimized/rev-00d8738/wp-content/uploads/2017/11/10-Patrick-I-Love-You-Gif.gif"
              alt=""
            />
          </span>
          <span className="name">Nguyen Tinh</span>
        </div>
        <div className="icon">
          <i className="fa-solid fa-phone text-primary"></i>
          <i className="fas fa-trash text-danger"></i>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-display">
          <div className="chat-row other-message">
            <MessageDisplay />
          </div>
          <div className="chat-row you-message">
            <MessageDisplay />
          </div>
        </div>
      </div>

      <form className="chat-input">
        <textarea name="content" placeholder="Nhập tin nhắn"></textarea>
        <button type="submit" className="btn-chat">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </Fragment>
  );
}
