import { MainLayout, SuggestFiend } from "@/components";
import { NextPageWithLayout } from "@/models";
import React from "react";

const FriendPage: NextPageWithLayout = () => {
  return (
    <section className="friend-page">
      <SuggestFiend />
    </section>
  );
};
FriendPage.Layout = MainLayout;

export default FriendPage;