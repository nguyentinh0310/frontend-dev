import { useAuth } from "@/hooks";
import { IUser } from "@/models";
import Link from "next/link";
import React from "react";
import { FollowBtn } from "../profile";

export function ListFollowers() {
  const { auth } = useAuth();
  return (
    <div className="list-friend">
      <h4>
        Người theo dõi ({auth?.followers?.length > 0 && `${auth?.followers?.length}`})
      </h4>
      <div className="row">
        {auth?.followers?.length === 0 && (
          <h4 className="text-center">Chưa có người theo dõi</h4>
        )}
        {auth?.followers?.map((user: IUser) => (
          <div className="col-lg-4 col-sm-6 friend-col" key={user?._id}>
            <div className="friend-box">
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
