import { notificationApi } from "@/api-client";
import { closeModal, useAppDispatch } from "@/app";
import { useNotify } from "@/hooks/use-notify";
import { INotification } from "@/models";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export function NotifyModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { notifies, isLoading, mutateNotify } = useNotify();

  console.log(notifies);

  const clickToNotify = async (notify: INotification) => {
    try {
      await notificationApi.readNotify(notify?._id);
      await mutateNotify();
      dispatch(closeModal());
      router.push(`${notify?.url}`);
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  const handleDeleteNotify = async () => {
    // Remove notify
    // await notificationApi.remove(post?._id, `/posts/${post?._id}`);
    // await mutateNotify();
  };

  const handleDeleteAllNotify = async () => {
    try {
      await notificationApi.removeAll();
      await mutateNotify();
      toast.success("Xóa thông báo thành công");
      dispatch(closeModal());
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  return (
    <div className="dropdown-notify">
      <div className="dropdown">
        <div className="dropdown-title">
          <h4>Thông báo</h4>
          {notifies?.length > 0 && (
            <a onClick={handleDeleteAllNotify}>Xóa thông báo</a>
          )}
        </div>
        <div className="menu">
          {isLoading ? (
            <span className="m-auto mt-3 spinner-border text-success"></span>
          ) : (
            <>
              {notifies?.length === 0 && (
                <h5 className="text-center mt-3">Chưa có thông báo gì chả</h5>
              )}
              {notifies?.map((notify: INotification) => (
                <a
                  className="menu-item"
                  key={notify?._id}
                  onClick={() => clickToNotify(notify)}
                  style={{ fontWeight: notify?.isRead ? "normal" : "bold" }}
                >
                  <span className="avatar">
                    <img src={notify?.user?.avatar} alt="" />
                  </span>

                  <span className="text">
                    {notify?.user?.fullname} {notify?.text}
                    <small className="d-block">
                      {moment(notify?.createdAt).fromNow()}
                    </small>
                  </span>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
