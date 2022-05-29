import { useAppSelector } from "@/app";
import { useAuth, useSuggestUser } from "@/hooks";
import { IUser } from "@/models";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FollowBtn } from "../profile";

export function RightPanel() {
  const router = useRouter();

  const { online } = useAppSelector((state) => state.online);

  const [user, setUser] = useState<any>("");
  const [check, setCheck] = useState(false);

  const { auth } = useAuth();
  const { userSuggest, isLoading } = useSuggestUser();

  const onClickToProfile = (user: IUser) => {
    return router.push(`/profile/${user?._id}`);
  };

  // check online-offline
  // useEffect(() => {
  //   online?.find((item: any) => {
  //     if (item === user?._id) {
  //       setCheck(true);
  //     } else {
  //       setCheck(false);
  //     }
  //   });
  // }, [online, user?._id]);

  return (
    <div className="right-panel">
      <div className="friends-section">
        <div className="suggest-user">
          <h4>Gợi ý</h4>
          {isLoading ? (
            <span>Loadding ...</span>
          ) : (
            <>
              {userSuggest?.data?.map((user: IUser) => (
                <a className="friend" key={user?._id}>
                  <span
                    className="avatar"
                    onClick={() => onClickToProfile(user)}
                  >
                    <img src={user?.avatar} alt="" />
                  </span>
                  <p className="name" onClick={() => onClickToProfile(user)}>
                    {user?.fullname}
                  </p>
                  <FollowBtn user={user} />
                </a>
              ))}
            </>
          )}
        </div>

        <div className="suggest-user mt-3">
          <h4>Gợi ý</h4>
          {isLoading ? (
            <span>Loadding ...</span>
          ) : (
            <>
              {auth?.followers?.map((user: IUser) => (
                <a className="friend" key={user?._id}>
                  <span
                    className="avatar"
                    onClick={() => onClickToProfile(user)}
                  >
                    <img src={user?.avatar} alt="" />
                  </span>
                  <p className="name" onClick={() => onClickToProfile(user)}>
                    {user?.fullname}
                  </p>
                  <i className={"fas fa-circle " + (check ? "active" : "")}></i>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
