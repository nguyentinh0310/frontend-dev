import { userApi } from "@/api-client";
import { useAuth, useProfile, useUser } from "@/hooks";
import { usePostUser } from "@/hooks/use-post";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FollowerModal, FollowingModal } from "../modal";
import { FollowBtn } from "./follow-btn";
import { ProfileIntro } from "./introduction";

export function ProfileHeader() {
  const router = useRouter();
  const { id } = router.query;

  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);

  const { auth } = useAuth();
  const { user, mutateUser, isLoading } = useUser(id);
  const { profile } = useProfile(id);
  const { postUser } = usePostUser(id);

  const onEditProfile = () => {
    router.push(`/profile/${id}/edit`);
  };

  const handleShowFollowing = () => setShowFollowing(true);
  const handleShowFollower = () => setShowFollower(true);

  return (
    <div className="profile-top">
      <div className="bg-cover-profile">
        <img src={user?.coverImg} alt="bg-cover" />
      </div>
      <div className="profile-name">
        <span className="avatar">
          <img src={user?.avatar} alt="avatar" />
        </span>
        <span className="name">{user?.fullname}</span>
        <div className="count">
          <div className="post-count">
            <span className="quantity">{postUser?.data.length}</span>
            <span className="title">Bài viết</span>
          </div>
          <div className="follower-count" onClick={handleShowFollower}>
            <span className="quantity">{user?.followers.length}</span>
            <span className="title">Người theo dõi</span>
          </div>
          <div className="following-count" onClick={handleShowFollowing}>
            <span className="quantity">{user?.followings.length}</span>
            <span className="title">Đang theo dõi</span>
          </div>

          {showFollowing && (
            <FollowingModal
              show={showFollowing}
              setShow={setShowFollowing}
              loading={isLoading}
              userFollowing={user?.followings}
            />
          )}

          {showFollower && (
            <FollowerModal
              show={showFollower}
              setShow={setShowFollower}
              loading={isLoading}
              userFollower={user?.followers}
            />
          )}
        </div>

        {auth?._id === id ? (
          <button className="btn btn-setting" onClick={onEditProfile}>
            <i className="fa-solid fa-gear"></i>&nbsp; Sửa thông tin
          </button>
        ) : (
          <div className="follow-message">
            <FollowBtn user={user} mutateUser={mutateUser} />
            <i className="fa-solid fa-envelope"></i>
          </div>
        )}
      </div>
      {profile && <ProfileIntro profile={profile} />}
    </div>
  );
}
