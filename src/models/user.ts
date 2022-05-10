export interface IUser {
  _id: string;
  fullname: string;
  account: string;
  password: string;
  avatar: string;
  coverImg: string;
  gender: string;
  role?: number;
  saved: string;
  followings: IFollower[];
  followers: IFollower[];
  friends: IFriend[];
  friend_requests: IFriend[];
}
export interface IFollower {
  [key: string]: any;
}

export interface IFriend {
  user: string;
  date: Date;
}
