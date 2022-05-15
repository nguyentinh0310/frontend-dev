import { LeftSide, MainLayout, RightSide } from "@/components";
import { NextPageWithLayout } from "@/models";
import React from "react";

const Coversation: NextPageWithLayout = () => {
  return (
    <div className="messages">
      <div className="message-left-side left-mess">
        <LeftSide />
      </div>
      <div className="message-right-side">
        <RightSide />
      </div>
    </div>
  );
};
Coversation.Layout = MainLayout;

export default Coversation;
