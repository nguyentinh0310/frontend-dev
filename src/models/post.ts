import { IComment } from "./comment";
import { IUser } from "./user";

export interface IPost {
  _id: string;
  content: string;
  images: ImgPost[];
  likes: string[];
  comments: IComment[];
  user: IUser;
  createdAt?: Date;
}

export interface PostPayLoad {
  content: string;
  images?: string[];
}

export interface ImgPost {
  public_id: string;
  url: string;
}
