import React from "react";
import Skeleton from "react-loading-skeleton";

export interface PostSkeletonListProps {
  length: number;
}

export function PostSkeletonList({ length }: PostSkeletonListProps) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <div className="post" key={index}>
          <div className="post-top">
            <Skeleton
              circle
              height="40px"
              width="40px"
              containerClassName="avatar-skeleton"
            />
            <div className="post-info">
              <p className="name">
                <Skeleton width={100} />
              </p>
              <span className="time">
                <Skeleton width={70} />
              </span>
            </div>
            <span className="post-menu">
              <Skeleton width={30} />
            </span>
          </div>

          <div className="post-content">
            <Skeleton />
            <Skeleton />
            <Skeleton height={170} />
          </div>

          <div className="post-thumb">
            <div className="action">
              <Skeleton width={30} />
            </div>
            <div className="action">
              <Skeleton width={30} />
            </div>
            <div className="action">
              <Skeleton width={30} />
            </div>
            <div className="action">
              <Skeleton width={30} />
            </div>
          </div>
          <div className="post-count">
            <p className="like-count">
              <Skeleton width={50} />
            </p>
            <p className="comment-count">
              <Skeleton width={50} />
            </p>
          </div>
          <div style={{ width: "95%", margin: "0 auto" }}>
            <Skeleton width="100%" />
          </div>
        </div>
      ))}
    </>
  );
}
