import { useAuth, useUser } from "@/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export function Menu() {
  const router = useRouter();
  const { auth } = useAuth();
  const { mutateUser } = useUser(auth?._id);

  const ROUTE_LIST = [
    {
      label: "Khám phá",
      icon: "fa fa-solid fa-compass",
      path: "/explore",
    },
    {
      label: "Bạn bè",
      icon: "fa fa-user-friends",
      path: "/friend",
    },
    {
      label: "Đã lưu",
      icon: "fa fa-bookmark",
      path: `/profile/${auth?._id}/saved`,
    },
    {
      label: "Tin nhắn",
      icon: "fab fa-facebook-messenger",
      path: "/message",
    },
    {
      label: "Cài đặt",
      icon: "fa-solid fa-gear",
      path: "/setting",
    },
    {
      label: "Đăng xuất",
      icon: "fa-solid fa-right-from-bracket",
      path: "#",
    },
  ];

  const onClickProfile = async() => {
    await mutateUser()
    router.push(`/profile/${auth?._id}`);
  };

  return (
    <div className="menu-page">
      <ul>
        <li onClick={onClickProfile}>
          <span className="avatar">
            <img
              src="https://cdn-acpnj.nitrocdn.com/SDkrhncnWeetGsYGlzwaPnbfptfOeIKk/assets/static/optimized/rev-00d8738/wp-content/uploads/2017/11/10-Patrick-I-Love-You-Gif.gif"
              alt=""
            />
          </span>
          <span className="name">Aashish Panthi</span>
        </li>
        {ROUTE_LIST.map((route: any) => (
          <Link key={route.path} href={route.path} passHref>
            <li className="row">
              <i className={`col-1 ${route.icon}`}></i>
              <p className="col-11 label">{route.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
