import { IUser } from "./user";

export interface IComment {
  _id: string;
  content: string;
  tag: IUser;
  reply: string;
  likes: string[];
  user: IUser;
  postId: string;
  postUserId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CommentPayload {
  content: string;
  tag?: IUser;
  reply?: string;
  postId?: string;
  postUserId?: string;
}
