import { closeModal, useAppDispatch, useAppSelector } from "@/app";
import { LayoutProps } from "@/models";
import React from "react";
import { Auth, Header } from "../common";
import { ProfileHeader, ProfileMenu } from "../profile";

export function ProfileLayout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const { openNotify, openSetting } = useAppSelector(
    (state) => state.toggleModal
  );
  const onCloseModal = () => {
    if (openNotify || openSetting) {
      dispatch(closeModal());
    }
  };
  return (
    <Auth>
      <div className="main">
        <Header />
        <div className="profile-page" onClick={onCloseModal}>
          <ProfileHeader />
          <ProfileMenu />
          {children}
        </div>
      </div>
    </Auth>
  );
}
