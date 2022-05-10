import { IUser } from "@/models";
import React from "react";

export interface UserModalProps {
  users: IUser[] | undefined;
  loading: boolean;
}

export function UserModal({ users, loading }: UserModalProps) {
  return (
    <div
      className="dropdown-user"
      style={{ opacity: users?.length === 0 ? 0 : 1, transition: "all .4s" }}
    >
      <div className="dropdown">
        <div className="menu">
          {loading ? (
            <span>loadding...</span>
          ) : (
            users?.map((user: IUser) => (
              <a
                className="menu-item"
                key={user._id}
                href={`/profile/${user._id}`}
              >
                <span className="avatar">
                  <img src={user.avatar} alt="" />
                </span>

                <span className="fullname">{user.fullname}</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
