import { closeModal, useAppDispatch, useAppSelector } from "@/app";
import { useAuth, useUser } from "@/hooks";
import { usePosts, usePostsFollow } from "@/hooks/use-post";
import { socket } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export function SettingModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logout, auth } = useAuth();
  const { limit } = useAppSelector((state) => state.posts);

  const { mutateUser } = useUser(auth?._id);
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);

  const onClickToProfile = async () => {
    await mutateUser();
    router.push(`/profile/${auth?._id}`);
    dispatch(closeModal());
  };

  const onClickLogout = async () => {
    await logout();
    toast.success("Đã đăng xuất");

    await mutatePosts();
    await mutatePostsFl();

    dispatch(closeModal());
  };
  return (
    <div className="dropdown-setting">
      <div className="dropdown">
        <div className="menu">
          <a onClick={onClickToProfile} className="menu-item">
            <span className="menu-item-title">Trang cá nhân</span>
          </a>
          <Link href="/setting">
            <a
              className="menu-item"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              <span className="icon-button">
                <i className="fa-solid fa-gear"></i>
              </span>
              <span className="menu-item-title">Cài đặt</span>
            </a>
          </Link>

          <hr />

          <a className="menu-item" onClick={onClickLogout}>
            <span className="icon-button">
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className="menu-item-title">Đăng xuất</span>

            <span className="icon-right"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
