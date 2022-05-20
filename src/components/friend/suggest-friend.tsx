import { useSuggestUser } from "@/hooks";
import { IUser } from "@/models";
import Link from "next/link";
import React from "react";
import { FollowBtn } from "../profile";

export function SuggestFiend() {
  const { userSuggest, isLoading } = useSuggestUser();

  return (
    <div className="list-friend">
      <h3>Gợi ý bạn bè</h3>
      <div className="row">
        {isLoading ? (
          <span>Loadding ...</span>
        ) : (
          <>
            {userSuggest?.data?.map((user: IUser) => (
              <div className="col-lg-4 col-sm-6 friend-col">
                <div className="friend-box" key={user?._id}>
                  <Link href={`/profile/${user?._id}`}>
                    <span className="avatar">
                      <img src={user?.avatar} alt="" />
                    </span>
                  </Link>
                  <Link href={`/profile/${user?._id}`}>
                  <span className="name">{user?.fullname}</span>
                </Link>
                  <FollowBtn user={user} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
