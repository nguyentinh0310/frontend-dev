import { IUser } from "./user";

export interface IMessage {
  _id: string;
  conversation: string;
  sender: IUser;
  recipient: IUser;
  text: string;
  media: string[];
  call: any;
  createdAt?: Date;
}

export interface MessagePayload {
  text: string;
  recipient: string;
  media?: string[];
  call?: any;
  createdAt?: Date;
}
