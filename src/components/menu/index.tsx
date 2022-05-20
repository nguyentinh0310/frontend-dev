import { useAuth, useUser } from "@/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export function Menu() {
  const router = useRouter();
  const { auth, logout } = useAuth();
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
  ];

  const onClickProfile = async () => {
    await mutateUser();
    return router.push(`/profile/${auth?._id}`);
  };
  const handleLogout = async () => {
    await logout();

    toast.success("Đã đăng xuất");
    return router.push("/login");
  };

  return (
    <div className="menu-page">
      <ul>
        <li onClick={onClickProfile}>
          <span className="avatar">
            <img src={auth?.avatar} alt="" />
          </span>
          <span className="name">{auth?.fullname}</span>
        </li>
        {ROUTE_LIST.map((route: any) => (
          <Link key={route.path} href={route.path} passHref>
            <li className="row">
              <i className={`col-1 ${route.icon}`}></i>
              <p className="col-11 label">{route.label}</p>
            </li>
          </Link>
        ))}

        <li className="row" onClick={handleLogout}>
          <i className="col-1 fa-solid fa-right-from-bracket"></i>
          <p className="col-11 label">Đăng xuất</p>
        </li>
      </ul>
    </div>
  );
}
