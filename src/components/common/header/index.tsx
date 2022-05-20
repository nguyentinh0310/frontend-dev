import {
  closeStatus,
  toggleNotify,
  toggleSetting,
  useAppDispatch,
  useAppSelector,
} from "@/app";
import { NotifyModal, SettingModal, UserModal } from "@/components/modal";
import { useAuth, useSearchUser, useUser } from "@/hooks";
import { useNotify } from "@/hooks/use-notify";
import { usePosts, usePostsFollow } from "@/hooks/use-post";
import clsx from "clsx";
import throttle from "lodash.throttle";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ROUTE_LIST } from "./routes";
import { SearchHeader } from "./search";

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.posts);
  const { openNotify, openSetting } = useAppSelector(
    (state) => state.toggleModal
  );

  const [keyword, setKeyword] = useState("");
  const [isRead, setIsRead] = useState(false);

  const { userSearch, isLoading } = useSearchUser(keyword);
  const { auth } = useAuth();
  const { mutateUser } = useUser(auth?._id);
  const { mutatePosts } = usePosts(limit);
  const { mutatePostsFl } = usePostsFollow(limit);
  const { notifies } = useNotify();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const onClickNotify = () => {
    dispatch(toggleNotify());
  };

  const onClickSetting = () => {
    dispatch(toggleSetting());
  };

  const onClickMessage = () => {
    return router.push("/message");
  };

  const onMutateProfile = async () => {
    throttle(scrollTop, 200);
    await mutateUser();
  };

  const onFilterSearch = (value: string) => {
    setKeyword(value);
  };

  const handleMutate = async () => {
    await mutatePosts();
    await mutatePostsFl();
    dispatch(closeStatus());
  };

  return (
    <nav>
      <div className="row">
        <div className="col-lg-4 col-sm-2 nav-left">
          <Link href="/">
            <span
              className="title-home"
              onDoubleClick={() => {
                window.location.href = "/";
              }}
            >
              <i className="fa-solid fa-code"></i>
            </span>
          </Link>
          <div className="search-popup">
            <SearchHeader onSubmit={onFilterSearch} setKeyword={setKeyword} />
            {userSearch && <UserModal users={userSearch} loading={isLoading} />}
          </div>

          <Link href="/search">
            <span className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </Link>
        </div>

        <div className="col-lg-4 col-sm-6 nav-middle">
          {ROUTE_LIST.map((route: any) => (
            <Link key={route.path} href={route.path} passHref>
              <a
                className={clsx({ active: router.pathname === route.path })}
                style={{ display: route.style }}
                onClick={handleMutate}
              >
                <i className={`${route.icon}`}></i>
              </a>
            </Link>
          ))}
        </div>

        <div className="col-lg-4 col-sm-4 nav-right">
          <Link href={`/profile/${auth?._id}`}>
            <span className="avatar" onClick={onMutateProfile}>
              <img src={auth?.avatar} alt="" />
            </span>
          </Link>
          <Link href={`/profile/${auth?._id}`}>
            <span className="fullname" onClick={onMutateProfile}>
              {auth?.fullname}
            </span>
          </Link>
          <a className="nav-icon nav-icon-messenger" onClick={onClickMessage}>
            <i className="fab fa-facebook-messenger"></i>
          </a>

          <a
            className={openNotify ? "nav-icon active" : "nav-icon"}
            onClick={onClickNotify}
          >
            <i className="fa fa-bell"></i>
            {notifies?.length !== 0 && (
              <span
                className="count"
                style={{ display: openNotify ? "none" : "" }}
              >
              <small>{notifies?.length}</small>
              </span>
            )}
          </a>
          <a
            className={openSetting ? "nav-icon active" : "nav-icon icon-setting"}
            onClick={onClickSetting}
          >
            <i className="fa-solid fa-caret-down"></i>
          </a>
          {openNotify && <NotifyModal />}
          {openSetting && <SettingModal />}
        </div>
      </div>
    </nav>
  );
}
