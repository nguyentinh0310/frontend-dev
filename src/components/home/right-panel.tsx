import { useSuggestUser } from "@/hooks";
import { IUser } from "@/models";
import { useRouter } from "next/router";
import React from "react";
import { FollowBtn } from "../profile";

export function RightPanel() {
  const router = useRouter();

  const { userSuggest, isLoading } = useSuggestUser();

  const onClickToProfile = (user: IUser) => {
    return router.push(`/profile/${user?._id}`);
  };

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
      </div>
    </div>
  );
}
