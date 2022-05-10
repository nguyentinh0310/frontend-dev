import React from "react";
import Skeleton from "react-loading-skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <div className="profile-top">
      <div className="bg-cover-profile">
        <Skeleton width="100%" height="100%" />
      </div>
      <div className="profile-name">
        <span className="avatar">
          <Skeleton width="100%" height="100%" circle />
        </span>
        <span className="name">
          <Skeleton width="20%" />
        </span>
        <span className="name">
          <Skeleton width="40%" />
        </span>
      </div>
      <div className="pofile-info pb-3">
        <Skeleton width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="100%" />
      </div>
    </div>
  );
}
