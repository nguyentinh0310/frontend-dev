import { IUser } from "./user";

export interface INotification {
  _id: string;
  id: string;
  recipients: IUser[];
  url: string;
  text: string;
  content: string;
  image: string;
  user: IUser;
  isRead: boolean;
  createdAt?: Date
}

export interface NotificationPayload {
  id: string;
  recipients: IUser[];
  text: string;
  url: string;
  content?: string;
  image?: string;
}
