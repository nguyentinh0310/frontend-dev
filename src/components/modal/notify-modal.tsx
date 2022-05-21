import { notificationApi } from "@/api-client";
import { closeModal, useAppDispatch } from "@/app";
import { useNotify } from "@/hooks/use-notify";
import { INotification } from "@/models";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";

interface NotifyModalProps {}

export function NotifyModal(props: NotifyModalProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { notifies, isLoading, mutateNotify } = useNotify();

  const clickToNotify = async (notify: INotification) => {
    router.push(`${notify?.url}`);
    try {
      await notificationApi.readNotify(notify?._id);
      await mutateNotify();
      dispatch(closeModal());
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  const handleReadAllNotify = async () => {
    notifies?.data?.forEach(async (notify: INotification) => {
      await notificationApi.readNotify(notify._id);
      await mutateNotify();
    });
  };

  const handleDeleteAllNotify = async () => {
    try {
      swal({
        title: "Xác nhận",
        text: "Bạn có muốn tất cả thông báo?",
        icon: "warning",
        buttons: ["Huỷ", "Xác nhận"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await notificationApi.removeAll();
          await mutateNotify();
          toast.success("Xóa thông báo thành công");
          dispatch(closeModal());
        }
      });
    } catch (error) {
      toast.error("Lỗi 500");
    }
  };

  return (
    <div className="dropdown-notify">
      <div className="dropdown">
        <div className="dropdown-title">
          <h4>
            Thông báo
            {notifies?.data?.length > 0 ? `(${notifies?.data?.length})` : ""}
          </h4>
          {notifies?.data?.length > 0 && (
            <span className="operate-notify">
              <a onClick={handleReadAllNotify}>Đánh dấu đã đọc</a>
              <a onClick={handleDeleteAllNotify}>Xóa thông báo</a>
            </span>
          )}
        </div>
        <div className="menu">
          {isLoading ? (
            <span className="m-auto mt-3 spinner-border text-success"></span>
          ) : (
            <>
              {notifies?.data?.length === 0 && (
                <h5 className="text-center mt-3">Chưa có thông báo gì chả</h5>
              )}
              {notifies?.data?.map((notify: INotification) => (
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
