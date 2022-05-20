import { useUser } from "@/hooks";
import { usePost } from "@/hooks/use-post";
import React from "react";

export interface FomoNotificationProps {
  notify: any;
}

export function FomoNotification({ notify }: FomoNotificationProps) {
  const { user } = useUser(notify?.recipients[0]);
  const { post } = usePost(notify?.id);
  return (
    <div className="noti">
      {post?.images.length > 0 ? (
        <>
          {post?.images[0]?.url.match(/video/i) ? (
            <video controls src={post?.images[0]?.url} className="noti-image" />
          ) : (
            <img
              src={post?.images[0]?.url}
              className="noti-image"
              alt={post?.images[0]?.url}
            />
          )}
        </>
      ) : (
        <img
          src="https://res.cloudinary.com/dwgximj2j/image/upload/v1652075296/avatars/default-image_wygqce.jpg"
          alt="noti-image"
          className="noti-image"
        />
      )}

      <div className="noti-content">
        <h3 className="noti-title">
          {user?.fullname} {notify?.text}
        </h3>
      </div>
    </div>
  );
}
