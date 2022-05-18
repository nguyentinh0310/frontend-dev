import { INotification, NotificationPayload } from "@/models";
import axiosClient from "./axios-client";

export const notificationApi = {
  getAll(): Promise<INotification> {
    const url = "/notification";
    return axiosClient.get(url);
  },
  create(payload: NotificationPayload): Promise<INotification> {
    const url = "/notification";
    return axiosClient.post(url, payload);
  },
  remove(notify: any): Promise<any> {
    const url = `/notification/${notify.id}?url=${notify.url}`;
    return axiosClient.delete(url);
  },
  removeAll(): Promise<any> {
    const url = `/notification/deleteAllNotify`;
    return axiosClient.delete(url);
  },
  readNotify(id: string): Promise<any> {
    const url = `/notification/isReadNotify/${id}`;
    return axiosClient.put(url);
  },
};
