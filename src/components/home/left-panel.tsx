import { useAuth } from "@/hooks";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Skeleton from "react-loading-skeleton";

export function LeftPanel() {
  const router = useRouter();
  const { auth, firstLoading } = useAuth();

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
  ];

  const onClickProfile = () => {
    router.push("/profile");
  };
  return (
    <div className="left-panel">
      {firstLoading ? (
        <ul>
          <li className="row">
            <span className="col-2">
              <Skeleton
                circle
                width="35px"
                height="35px"
                containerClassName="avatar-skeleton "
              />
            </span>
            <p className="col-7">
              <Skeleton width={100} className="skeleton-name" />
            </p>
          </li>
          {ROUTE_LIST.map(() => (
            <li>
              <Skeleton width={100} className="skeleton-link" />
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <li className="row" onClick={onClickProfile}>
            <span className="col-lg-2 avatar">
              <img src={auth?.avatar} alt="" />
            </span>
            <span className="col-lg-7 name">{auth?.fullname}</span>
          </li>
          {ROUTE_LIST.map((route: any) => (
            <Link key={route.path} href={route.path} passHref>
              <li className={clsx({ active: router.pathname === route.path })}>
                <i className={`col-2 ${route.icon}`}></i>
                <p className="col-10 label">{route.label}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
