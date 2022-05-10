import { LeftSide, MainLayout, RightSide } from "@/components";
import { NextPageWithLayout } from "@/models";
import React from "react";

const MessagePage: NextPageWithLayout = () => {
  return (
    <div className="messages">
      <div className="message-left-side">
        <LeftSide />
      </div>
      <div className="message-right-side right-mess">
        <RightSide />
      </div>
    </div>
  );
};
MessagePage.Layout = MainLayout;

export default MessagePage;
