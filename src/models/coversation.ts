import { IUser } from "./user";

export interface IConversation {
  _id: string;
  recipients: IUser[];
  text: string;
  media: string[];
  call: any;
  isRead: boolean
}

