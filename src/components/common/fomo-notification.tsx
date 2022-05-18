import React from "react";

export interface FomoNotificationProps {
  notify: any;
}

export function FomoNotification({ notify }: FomoNotificationProps) {
  console.log(notify);
  return (
    <div className="noti">
      <img src={notify?.user?.avatar} alt="" className="noti-image" />
      <div className="noti-content">
        <h3 className="noti-title">{notify?.text}</h3>
        {/* <p className="noti-desc">{notify?.content.slice(0, 20)}...</p> */}
      </div>
    </div>
  );
}
