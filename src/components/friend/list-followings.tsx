import { useAuth } from "@/hooks";
import { IUser } from "@/models";
import Link from "next/link";
import React from "react";
import { FollowBtn } from "../profile";

export function ListFollowings() {
  const { auth } = useAuth();
  return (
    <div className="list-friend">
      <h4>
        Đang theo dõi ({auth?.followings?.length > 0 && `${auth?.followings?.length}`})
      </h4>
      <div className="row">
        {auth?.followings?.length === 0 && (
          <h4 className="text-center">Chưa theo dõi ai</h4>
        )}
        {auth?.followings?.map((user: IUser) => (
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
      </div>
    </div>
  );
}
