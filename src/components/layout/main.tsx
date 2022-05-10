import { closeModal, useAppDispatch, useAppSelector } from "@/app";
import { LayoutProps } from "@/models";
import React from "react";
import { Auth, Header } from "../common";

export function MainLayout({ children }: LayoutProps) {
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
      <Header />
      <div className="children" onClick={onCloseModal}>
        {children}
      </div>
    </Auth>
  );
}
